<template>
  <div class="carousel-detail"></div>
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
const props = defineProps<{
  data?: Array<Image>;
}>();
interface Image {
  type: string;
  data: string;
}

const current = ref(0);

const toLeft = () => {
  console.log("go Left!");
};
const switchTo = (index: number) => {
  console.log(index);
};
onMounted(() => {
  console.log(props.data);
});
</script>

<style scoped>
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
</style>
