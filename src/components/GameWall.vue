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
    <el-main>
      <GameCard v-for="item of gameData" :data="item"></GameCard>
      <GameCard
        v-for="item in 20"
        :data="{ _id: String(item), id: item, name: String(item) }"
      ></GameCard>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gameClass from "@/assets/gameClass.json";
import type { ElTree } from "element-plus";
import getInfoService from "@/services/getInfoService.js";
import { debounce } from "@/utils/common.js";
import GameCard from "@/components/GameCard.vue";

onMounted(() => {
  handleTreeData();
  // handleCheckedTagsChange();
});

interface List {
  class: string;
}

const treeData = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const tags = ref();
const gameData = ref();

const props = {
  label: "class",
  children: "children",
};

const handleTreeData = () => {
  let _data = [];
  for (const item of gameClass) {
    let tmp = {
      class: "",
      children: [] as Array<List>,
    };
    tmp.class = item["class"];
    for (const _item of item["children"]) {
      tmp.children.push({ class: _item });
    }
    _data.push(tmp);
  }
  treeData.value = _data;
};
const handleCheckedTagsChange = debounce(async function (
  event: any,
  status: boolean
) {
  const selected = treeRef.value?.getCheckedNodes();
  let tmp = [];
  if (selected)
    for (const item of selected) {
      if (!item.children) {
        tmp.push(item.class);
      }
    }
  tags.value = tmp;
  gameData.value = await getInfoService.getInfo({
    where: { class: tmp },
  });
},
100);
</script>

<style scoped>
.el-aside {
  display: block;
  position: relative;
  overflow-y: auto;
  padding: 0px 20px 0px 20px;
  min-width: 200px;
  background-color: #ffffff;
  font-size: 2rem;
  text-align: left;
}
h4 {
  font-size: 18px;
  padding-left: 8px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eff1f1;
}

.el-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  grid-gap: 20px;
  margin-left: 5px;
  margin-right: 15px;
  margin-bottom: 30px;
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}
</style>
