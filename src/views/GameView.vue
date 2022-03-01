<template>
  <el-row>
    <el-col :offset="1" :span="24">
      <h1 class="name">{{ data?.name }}</h1>
    </el-col>
    <el-col :offset="1" :span="16">
      <div style="background-color: aqua; height: 400px"></div>
    </el-col>
    <el-col :offset="1" :span="5">
      <div class="cover-div" :style="coverURL"></div>
    </el-col>
  </el-row>
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
.title-bg {
  width: 100%;
  height: 100%;
}
.name {
  text-align: left;
}
.author {
  font-style: oblique;
}
.game-wrapper {
  display: flex;
  flex: auto;
  flex-direction: column;
}
.cover-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
}
</style>
