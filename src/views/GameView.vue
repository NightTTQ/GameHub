<template>
  <div>
    <span>{{ data }}</span>
  </div>
</template>

<script setup lang="ts">
import getInfoService from "@/services/getInfoService.js";
import { ref, defineProps, onMounted } from "vue";

const props = defineProps<{
  id: string;
}>();

const data = ref();

const getData = async () => {
  data.value = await getInfoService.getInfo({
    id: props.id,
  });
  console.log(data.value);
};

onMounted(() => {
  getData();
});
</script>
