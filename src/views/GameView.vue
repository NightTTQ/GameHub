<template>
  <div class="view-page">
    <div class="view-page-content">
      <div class="detail-row">
        <div class="detail-col">
          <h1 class="name">{{ data?.name }}</h1>
        </div>

        <div class="detail-col reactive">
          <div class="detail">
            <Carousel :data="carouselData" />
            <div class="description-layout">
              <div class="description-section">
                <div class="description-container">
                  <div class="description-short-intro">
                    <span class="short-intro">
                      <div class="short-intro-wrapper">
                        <div class="short-intro-content">
                          {{ data?.description }}
                        </div>
                      </div>
                    </span>
                  </div>
                  <div class="description-about">
                    <Metadata
                      :gameclass="data?.type"
                      :platform="data?.platform"
                    />
                  </div>
                  <div class="description-about">
                    <ExpandablePanel :about="data?.about" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Aside
            :cover="data?.cover"
            :links="data?.links"
            :author="data?.author"
            :release-date="data?.releaseDate"
            :updated-at="data?.updatedAt"
          />
        </div>
        <div class="detail-col">
          <div class="more-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getInfoService from "@/services/getInfoService";
import { ref, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import Carousel from "@/components/Carousel.vue";
import Metadata from "@/components/Metadata.vue";
import ExpandablePanel from "@/components/ExpandablePanel.vue";
import Aside from "@/components/ViewAside.vue";

interface dataType {
  _id?: string;
  id?: number;
  name?: string;
  platform?: string[];
  type?: string;
  description?: string;
  links?: Link[];
  author?: Author;
  cover?: string;
  images?: Image[];
  about?: string;
  releaseDate?: String;
  videos?: Video[];
  createdAt?: String;
  updatedAt?: String;
}
interface Link {
  name: string;
  url: string;
}
interface Author {
  name: string;
  type: number;
  url: string;
}
interface Image {
  type: string;
  data: string;
}
interface Video {
  type: string;
  data: string;
}

const data = ref<dataType>({
  _id: undefined,
  id: undefined,
  name: undefined,
  platform: undefined,
  type: undefined,
  description: undefined,
  links: undefined,
  author: undefined,
  cover: undefined,
  images: undefined,
  about: undefined,
  releaseDate: undefined,
  videos: undefined,
  createdAt: undefined,
  updatedAt: undefined,
});

const props = defineProps<{
  id: number | string;
}>();

const carouselData = computed(() => {
  return [
    ...(Array.isArray(data.value.videos) ? data.value.videos : []),
    ...(Array.isArray(data.value.images) ? data.value.images : []),
  ];
});

const getData = async () => {
  const res = await getInfoService.getGame({
    id: Number(props.id),
  });

  data.value = res.data;
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
.view-page {
  width: 75%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}
.view-page-content {
  padding-bottom: 90px;
}
.name {
  color: rgb(245, 245, 245);
  text-align: left;
}
.detail-row {
  display: flex;
  flex-direction: column;
}
.detail-col {
  display: flex;
  flex-direction: row;
}
.description-layout {
  width: 100%;
  margin-top: 20px;
  text-align: left;
}
.description-section {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
.description-container {
  display: flex;
  flex-direction: column;
}
.description-short-intro {
  flex-basis: 100%;
  margin-bottom: 40px;
}
.short-intro-wrapper {
  display: grid;
}
.short-intro-content {
  overflow: hidden;
  word-break: break-word;
}
.short-intro {
  transition: color 125ms ease-in-out;
  color: rgb(245, 245, 245);
  font-size: 18px;
  line-height: 25px;
  letter-spacing: -0.2px;
}
.description-about {
  margin-bottom: 20px;
}
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
@media (min-width: 1280px) {
  .detail {
    width: calc(100% - 384px);
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .detail {
    min-width: calc(100% - 280px);
    width: 100%;
  }
}
@media (max-width: 767px) {
  .detail {
    width: 100%;
    order: 2;
  }
  .reactive {
    flex-direction: column;
  }
}
@media (min-width: 1024px) {
  .short-intro {
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.2px;
  }
}
@media (min-width: 1440px) {
  .short-intro {
    font-size: 18px;
    line-height: 25px;
    letter-spacing: -0.2px;
  }
}
@media (min-width: 1600px) {
  .short-intro {
    font-size: 22px;
    line-height: 30px;
    letter-spacing: -0.4px;
  }
}
</style>
