<template>
  <el-container>
    <el-aside>
      <h4>筛选</h4>
      <el-tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        :props="props"
        :expand-on-click-node="false"
        @check-change="handleCheckedTagsChange"
      />
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gameClass from "@/assets/gameClass.json";
import type { ElTree } from "element-plus";

onMounted(() => handleTreeData());

const treeData = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const tags = ref();

const props = {
  label: "class",
  children: "children",
};

const handleTreeData = () => {
  let _data = [];
  for (const item in gameClass) {
    let tmp = {
      class: "",
      children: [{}],
    };
    tmp.children.pop();
    tmp.class = gameClass[item]["class"];
    for (const _item in gameClass[item]["children"]) {
      tmp.children.push({ class: gameClass[item]["children"][_item] });
    }
    _data.push(tmp);
  }
  treeData.value = _data;
};
const handleCheckedTagsChange = (event: any, status: boolean) => {
  const selected = treeRef.value?.getCheckedNodes();
  let tmp = [];
  for (const item in selected) {
    if (!selected[Number(item)].children) {
      tmp.push(selected[Number(item)].class);
    }
  }
  tags.value = tmp;
};
</script>

<style scoped>
.el-aside {
  padding: 0px 20px 0px 20px;
  min-width: 200px;
  background-color: #ffffff;
  text-align: left;
}
h4 {
  font-size: 18px;
  padding-left: 8px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eff1f1;
}

.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}
</style>
