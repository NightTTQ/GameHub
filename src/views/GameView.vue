<template>
  <div class="view-page">
    <div class="view-page-content">
      <div class="detail-row">
        <div class="detail-col">
          <h1 class="name">{{ data?.name }}</h1>
        </div>

        <div class="detail-col">
          <div class="detail">
            <div class=""></div>
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
  image?: Array<string>;
}
interface Author {
  name: string;
  type: number;
  url: string;
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
