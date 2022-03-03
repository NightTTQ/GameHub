<template>
  <div class="view-page">
    <div class="view-page-content">
      <div class="detail-row">
        <div class="detail-col">
          <h1 class="name">{{ data?.name }}</h1>
        </div>

        <div class="detail-col">
          <div class="detail">
            <div class="carousel">
              <div class="carousel-detail"></div>
              <div class="carousel-swiper">
                <ul class="carousel-swiper-wrapper">
                  <li v-for="item in data?.image" class="carousel-swiper-item">
                    <button class="carousel-swiper-item-btn">
                      <div class="carousel-swiper-item-btn-wrapper">
                        <div class="carousel-swiper-item-btn-container">
                          <div class="carousel-swiper-item-btn-content">
                            <div class="carousel-swiper-item-btn-content-ele">
                              <div
                                class="carousel-swiper-item-btn-content-ele-pic"
                              >
                                <img class="img" :src="item.data" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getInfoService from "@/services/getInfoService.js";
import { ref, computed, onMounted } from "vue";
import type { ComputedRef } from "vue";

interface data {
  _id: string;
  id: number;
  name: string;
  platform?: Array<string>;
  author?: Author;
  class?: string;
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
.carousel-detail {
  background-color: black;
  padding-top: calc(9 / 16 * 100%);
}
.carousel-swiper {
  width: 100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
.carousel-swiper-wrapper {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: flex;
  width: 100%;
  overflow: auto;
}
.carousel-swiper-item {
  position: relative;
  flex-shrink: 0;
  flex-basis: calc((100% - 90px) / 6);
}
.carousel-swiper-item-btn {
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  overflow: hidden;
  background: none;
}
.carousel-swiper-item-btn-wrapper {
  border-radius: 4px;
  background: rgb(38, 38, 38);
}
.carousel-swiper-item-btn-container {
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
}
.carousel-swiper-item-btn-content {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.carousel-swiper-item-btn-content-ele {
  width: 100%;
  height: 100%;
  opacity: 1;
}
.carousel-swiper-item-btn-content-ele-pic {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  opacity: 1;
}
.detail-row {
  display: flex;
  flex-direction: column;
}
.detail-col {
  display: flex;
  flex-direction: row;
}
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
@media (min-width: 1280px) {
  .detail {
    background-color: aqua;
    height: 3000px;
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
</style>
