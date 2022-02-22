<template>
  <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="onClick">
    <div class="image-div" :style="imageURL"></div>

    <div style="padding: 12px">
      <div class="bottom">
        <div class="name-div">
          <h4 style="margin: 0">{{ data?.name }}</h4>
        </div>
        <div class="author-div">
          <el-link
            v-for="item of data?.author"
            type="primary"
            :href="item.url"
            target="_blank"
          >
            {{ item.name }}
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
  data?: data;
}>();
const imageURL: ComputedRef<string> = computed(
  () => "background-image: url(" + props.data?.image + ")"
);

const onClick = (event: any) => {
  console.log(props.data?._id);
};
</script>

<style>
.el-card {
  display: inline-block;
  cursor: pointer;
}

.bottom {
  line-height: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.image-div {
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
