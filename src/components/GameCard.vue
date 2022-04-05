<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="onClick">
    <div class="cover-div" :style="coverURL"></div>

    <div style="padding: 12px">
      <div class="bottom">
        <div class="name-div">
          <h4 style="margin: 0">{{ data?.name }}</h4>
        </div>
        <div class="author-div">
          <el-link :href="data?.author?.url" type="primary" target="_blank">
            {{ data?.author?.name }}
          </el-link>
        </div>
        <div class="class-div">
          <span>{{ data?.class }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import router from "@/router";

interface data {
  _id: string;
  id: number;
  name: string;
  platform?: Array<string>;
  author?: Author;
  class?: string;
  cover?: string;
}

interface Author {
  name: string;
  type: number;
  url: string;
}

const props = defineProps<{
  data?: data;
}>();
const coverURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props.data?.cover + ")"
);

const onClick = (event: any) => {
  router.push({ name: "app", params: { id: props.data?.id } });
};
</script>

<style scoped>
.el-card {
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid #121212;
  display: inline-block;
  cursor: pointer;
}
.el-card:hover {
  transform: scale(1.01);
}
.el-checkbox {
  --el-checkbox-bg-color: none;
  --el-checkbox-checked-bg-color: none;
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
.author-div {
  width: 50%;
  text-align: left;
  line-height: 1.2;
  opacity: 0.8;
}
.class-div {
  width: 50%;
  text-align: right;
  line-height: 1.2;
  font-size: 0.8em;
  opacity: 0.8;
}
</style>
