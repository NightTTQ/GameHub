<template>
  <div class="view-page">
    <div class="view-page-content">
      <div class="detail-row">
        <div class="detail-col">
          <h1 class="name">{{ data?.name }}</h1>
        </div>

        <div class="detail-col">
          <div class="detail">
            <Carousel :data="data?.image" />
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
                </div>
              </div>
            </div>
          </div>

          <aside class="aside">
            <div class="aside-content">
              <div class="cover-div" :style="coverURL"></div>
              <div></div>
            </div>
          </aside>
        </div>
        <div class="detail-col">
          <div class="more-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getInfoService from "@/services/getInfoService.js";
import { ref, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";
import Carousel from "@/components/Carousel.vue";

interface data {
  _id: string;
  id: number;
  name: string;
  platform?: Array<string>;
  author?: Author;
  class?: string;
  description?: string;
  cover?: string;
  image?: Array<Image>;
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

const props = defineProps<{
  id: string;
}>();

const data = ref<data>();

const getData = async () => {
  data.value = await getInfoService.getInfo({
    id: props.id,
  });
  console.log(data.value);
};

const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + data.value?.cover + ")"
);

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
  text-align: left;
}
.cover-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
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
  background-color: gray;
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
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
@media (min-width: 1280px) {
  .detail {
    width: calc(100% - 384px);
  }
  .aside {
    background-color: brown;
    margin-left: 64px;
    width: 320px;
  }
}
@media (min-width: 768px) {
  .aside-content {
    position: sticky;
    top: 90px;
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
