<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="test">Test</el-button>
  </div>
</template>
<script setup lang="ts">
import { ElNotification } from "element-plus";
import Dialog from "@/utils/dialog";

const test = () => {
  ElNotification({
    title: "test",
    message: "testtesttest",
    duration: 0,
  });
};
</script>
<style lang="scss" scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
