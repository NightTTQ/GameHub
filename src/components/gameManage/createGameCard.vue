<template>
  <el-card class="sub-card" :body-style="{ padding: '0px', height: '100%' }">
    <div class="content-wrapper">
      <div class="btn-div">
        <el-button
          color="#222222"
          :icon="Plus"
          @click="goCreate"
          circle
        ></el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import { Plus } from "@element-plus/icons-vue";
import router from "@/router";

const props = defineProps<{
  type: number;
}>();

const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props + ")"
);

const goCreate = () => {
  router.push({ name: "createGame" });
};
</script>
<style scoped>
.sub-card {
  background-color: #303030;
  color: white;
  border: none;
  display: inline-block;
}
.content-wrapper {
  height: 100%;
  width: 100%;
}
.btn-div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-button {
  --el-button-hover-text-color: white;
}
</style>
