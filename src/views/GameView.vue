<template>
  <div>
    <span>{{ data }}</span>
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
  author?: Array<Author>;
  class?: string;
  image?: string;
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

const imageURL: ComputedRef<string> = computed(
  () => "background-image: url(" + data.value?.image + ")"
);

onMounted(() => {
  getData();
});
</script>

<style scoped>
.game-wrapper {
  display: flex;
  flex: auto;
  flex-direction: column;
}
.main-image {
  width: 300px;
}
.image-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
}
</style>
