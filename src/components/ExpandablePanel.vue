<template>
  <div class="container">
    <div class="collapse-content" :style="expandStyle">
      <span class="text">
        <div v-html="compiledMarkdown" ref="MDdiv" class="text-content"></div>
      </span>
    </div>
    <div class="collapse-expand" v-if="needExpand">
      <button class="expand-btn" v-if="!status" @click="handle">
        <span>More</span>
        <el-icon :size="12" style="width: 20px; height: 20px">
          <arrow-down-bold />
        </el-icon>
      </button>
      <button class="expand-btn" v-if="status" @click="handle">
        <span>Less</span>
        <el-icon :size="12" style="width: 20px; height: 20px">
          <arrow-up-bold />
        </el-icon>
      </button>
      <div :class="status ? '' : 'mask'"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, type ComputedRef, type Ref } from "vue";
import { ArrowDownBold, ArrowUpBold } from "@element-plus/icons-vue";
import { marked } from "marked";

const props = defineProps<{
  about?: string;
}>();

const status: Ref<Boolean> = ref(false);
const MDdiv = ref();
const needExpand = ref(true);

//控制展开样式
const expandStyle = computed(() => (status.value ? "" : "max-height: 400px"));

//响应按钮事件
const handle = () => (status.value = !status.value);
//输出编译后的Markdown文档
const compiledMarkdown: ComputedRef<string | undefined> = computed(() => {
  if (props.about) return marked.parse(props.about, {});
});
const checkHeight = () => {
  if (MDdiv.value) {
    needExpand.value = MDdiv.value.offsetHeight > 400;
    console.log(MDdiv.value.offsetHeight);
  }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.collapse-content {
  overflow: hidden;
}
.text {
  transition: color 125ms ease-in-out;
  color: rgb(245, 245, 245);
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
}
.text-content {
  color: rgb(245, 245, 245);
}
.text-content:deep(img) {
  width: 100%;
}
.collapse-expand {
  position: relative;
  background: rgb(28, 28, 28);
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: 1;
}
.expand-btn {
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  border-radius: 4px;
  color: rgb(245, 245, 245);
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 15px;
  padding: 0 20px;
  height: 50px;
  display: flex;
  width: 100%;
  min-width: auto;
  background-color: rgba(255, 255, 255, 0.2);
}
.expand-btn::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 4px;

  transition: opacity 200ms ease;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  opacity: 0;
}
.expand-btn:hover::after {
  opacity: 0.16;
  overflow: hidden;
}
.mask {
  position: absolute;
  background: linear-gradient(rgba(28, 28, 28, 0), rgb(28, 28, 28));
  top: -100px;
  height: 100px;
  width: 100%;
}
@media (min-width: 1600px) {
  .text {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
  }
  .expand-btn {
    font-size: 14px;
    letter-spacing: 1px;
  }
}
</style>
