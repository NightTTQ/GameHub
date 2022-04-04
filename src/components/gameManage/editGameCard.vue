<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <div class="cover-div" :style="coverURL"></div>

    <div style="padding: 12px">
      <div class="bottom">
        <div class="name-div">
          <h4 style="margin: 0">{{ data?.name }}</h4>
        </div>
        <div class="btn-div">
          <div class="edit-div">
            <el-button color="#222222" :icon="Edit" round @click="goEdit"
              >Edit</el-button
            >
          </div>
          <div class="view-div">
            <el-button color="#222222" :icon="Link" round @click="goView"
              >View</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import { Edit, Link } from "@element-plus/icons-vue";
import router from "@/router";

const props = defineProps<{
  data: any;
  type: number;
}>();

const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props.data?.cover + ")"
);

const goEdit = () => {
  router.push({ name: "editGame", params: { id: props.data?.id } });
};
const goView = () => {
  window.open(
    router.resolve({ name: "app", params: { id: props.data?.id } }).href,
    "_blank"
  );
};
</script>
<style scoped>
.el-card {
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid rgba(28, 28, 28, 1);
  display: inline-block;
}

.bottom {
  line-height: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.cover-div {
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 0%;
  padding-top: calc(9 / 16 * 100%);
}
.name-div {
  width: 100%;
  text-align: left;
  line-height: 1.2;
}
.btn-div {
  width: 100%;
  display: flex;
  margin-top: 12px;
}
.edit-div {
  width: 50%;
  text-align: center;
  line-height: 1.2;
  font-size: 0.8em;
  opacity: 0.8;
}
.view-div {
  width: 50%;
  text-align: center;
  line-height: 1.2;
  font-size: 0.8em;
  opacity: 0.8;
}
.el-button {
  --el-button-hover-text-color: white;
}
</style>
