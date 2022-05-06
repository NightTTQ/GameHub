<template>
  <el-card
    class="sub-card"
    :body-style="{ padding: '0px', height: '100%' }"
    @click="goCreate"
  >
    <div class="content-wrapper">
      <el-icon :size="20" class="plus-div"><Plus /></el-icon>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import router from "@/router";

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
  cursor: pointer;
}
.sub-card:hover {
  background-color: #222222;
}
.sub-card:active {
  background-color: #303030;
}
.content-wrapper {
  height: 100%;
  width: 100%;
}
.plus-div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
