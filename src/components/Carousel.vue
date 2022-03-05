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
    <ul class="detail-slider"></ul>
  </div>
  <div class="carousel-swiper">
    <ul class="carousel-swiper-wrapper">
      <li v-for="(item, index) in data" class="carousel-swiper-item">
        <button class="carousel-swiper-item-btn" @click="switchTo(index)">
          <div class="carousel-swiper-item-btn-wrapper">
            <div class="carousel-swiper-item-btn-container">
              <div class="carousel-swiper-item-btn-content">
                <div class="carousel-swiper-item-btn-content-ele">
                  <div class="carousel-swiper-item-btn-content-ele-pic">
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
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
const props = defineProps<{
  data?: Array<Image>;
}>();
interface Image {
  type: string;
  data: string;
}

const current = ref(0);

const doSwitch = (dir: number) => {
  console.log(dir);
};
const switchTo = (index: number) => {
  console.log(index);
};
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
  background-color: black;
  position: relative;
  overflow: hidden;
  padding-top: calc(9 / 16 * 100%);
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
</style>
