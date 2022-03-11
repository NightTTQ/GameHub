<template>
  <aside class="aside">
    <div class="aside-content">
      <div class="cover-div" :style="coverURL"></div>
      <div></div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue";

const props = defineProps<{
  links?: Array<Link>;
  cover?: string;
  author?: Author;
  createdAt?: Date;
  updatedAt?: Date;
}>();
interface Link {
  name: string;
  url: string;
}
interface Author {
  name: string;
  type: number;
  url: string;
}

const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props.cover + ")"
);
</script>

<style scoped>
.cover-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
}
@media (min-width: 1280px) {
  .aside {
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
