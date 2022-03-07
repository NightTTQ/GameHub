<template>
  <div class="carousel-detail">
    <div class="hover-container">
      <div class="switch left">
        <button class="switch-btn" @click="doSwitch(-1)">
          <el-icon :size="20" color="#FFFFFF"><arrow-left-bold /></el-icon>
        </button>
      </div>
      <div class="switch right">
        <button class="switch-btn" @click="doSwitch(1)">
          <el-icon :size="20" color="#FFFFFF"><arrow-right-bold /></el-icon>
        </button>
      </div>
    </div>
    <ul class="detail-slider" :style="switchStyle">
      <li v-for="(item, index) in data" class="slider-item">
        <div class="slider-item-wrapper">
          <div class="slider-item-content">
            <div class="slider-item-content-ele">
              <div class="slider-item-content-ele-pic">
                <img v-if="item.type === 'img'" class="img" :src="item.data" />
                <video
                  v-if="item.type === 'video'"
                  class="img"
                  controls
                  :src="item.data"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="carousel-swiper">
    <ul class="carousel-swiper-wrapper">
      <li v-for="(item, index) in data" class="carousel-swiper-item">
        <button class="carousel-swiper-item-btn" @click="switchTo(index)">
          <div
            class="carousel-swiper-item-btn-wrapper"
            :class="{ select: index === current }"
          >
            <div class="carousel-swiper-item-btn-container">
              <div class="carousel-swiper-item-btn-content">
                <div
                  class="carousel-swiper-item-btn-content-ele"
                  :class="{ select: index === current }"
                >
                  <div class="carousel-swiper-item-btn-content-ele-pic">
                    <img
                      v-if="item.type === 'img'"
                      class="img"
                      :src="item.data"
                    />
                    <div v-if="item.type === 'video'" class="img">
                      <el-icon :size="20" color="#FFF"><video-play /></el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import {
  ArrowLeftBold,
  ArrowRightBold,
  VideoPlay,
} from "@element-plus/icons-vue";
const props = defineProps<{
  data?: Array<Image>;
}>();
interface Image {
  type: string;
  data: string;
}

const current = ref(0);

const doSwitch = (dir: number) => {
  if (props.data) {
    if (current.value + dir < 0) current.value = props.data.length - 1;
    else current.value = (current.value + dir) % props.data.length;
  }
};
const switchTo = (index: number) => {
  current.value = index;
};
watch(current, () => {
  const videos = document.getElementsByTagName("video");
  for (const item of videos) item.pause();
});
const switchStyle = computed(
  () => "transform: translateX(calc(-" + 100 * current.value + "%));"
);
onMounted(() => {
  console.log(props.data);
});
</script>

<style scoped>
.switch {
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: transform 0.35s cubic-bezier(1, 0.09, 0.03, 0.93),
    opacity 0.35s ease;
}
.left {
  background: linear-gradient(
    270deg,
    rgba(11, 11, 11, 0) 0%,
    rgba(11, 11, 11, 0.4) 100%
  );
  transform: translateX(-100%);
}
.right {
  background: linear-gradient(
    90deg,
    rgba(11, 11, 11, 0) 0%,
    rgba(11, 11, 11, 0.4) 100%
  );
  transform: translateX(100%);
}
@media (min-width: 1440px) {
  .switch {
    width: 60px;
  }
}
.carousel-detail {
  position: relative;
  overflow: hidden;
}
.hover-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 1;
}
.carousel-detail:hover .switch {
  transform: translateX(0);
  opacity: 1;
}
.switch-btn {
  border: none;
  padding: 10px;
  pointer-events: auto;
  position: relative;
}
.detail-slider {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  transition: all 250ms ease-in-out;
  display: flex;
  flex-direction: row;
  position: relative;
}
.slider-item {
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  flex-basis: 100%;
  flex-shrink: 0;
}
.slider-item-wrapper {
  border-radius: 4px;
  background: rgb(38, 38, 38);
}
.slider-item-content {
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
}
.slider-item-content-ele {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.slider-item-content-ele-pic {
  width: 100%;
  height: 100%;
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
  gap: 10px;
  width: 100%;
  overflow: auto;
  align-items: center;
  justify-content: center;
}
.carousel-swiper-item {
  position: relative;
  flex-shrink: 0;
  flex-basis: calc((100% - 40px) / 5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-swiper-item-btn {
  width: 100%;
  cursor: pointer;
  border: none;
  overflow: hidden;
  background: none;
}
div.select {
  border-color: white;
  opacity: 1;
}
.carousel-swiper-item-btn-wrapper {
  box-sizing: content-box;
  border: 1px solid transparent;
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
.carousel-swiper-item-btn-content-ele:hover {
  opacity: 1;
}
.carousel-swiper-item-btn-content-ele {
  width: 100%;
  height: 100%;
  transition: opacity 200ms ease-in-out;
  opacity: 0.5;
}
.carousel-swiper-item-btn-content-ele-pic {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  opacity: 1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
