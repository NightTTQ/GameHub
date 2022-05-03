<template>
  <p>{{ props.fileName }}</p>
  <el-progress :percentage="props.process.value" />
</template>
<script setup lang="ts">
import type { Ref } from "vue";

const props = defineProps<{
  fileName: string;
  process: Ref;
}>();
</script>
<style lang="scss" scoped></style>
