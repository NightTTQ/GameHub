<template>
  <el-container>
    <el-aside>
      <h4>Select</h4>
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
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import gameClass from "@/assets/gameClass.json";
import type { ElTree } from "element-plus";
import { ElNotification } from "element-plus";
import getInfoService from "@/services/getInfoService";
import { debounce } from "lodash";
import GameCard from "@/components/GameCard.vue";

onMounted(() => {
  handleTreeData();
  handleCheckedTagsChange();
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
const handleCheckedTagsChange = debounce(async function () {
  const selected = treeRef.value?.getCheckedNodes();
  let tmp = [];
  if (selected)
    for (const item of selected) {
      if (!item.children) {
        tmp.push(item.class);
      }
    }
  tags.value = tmp;
  try {
    const { data } = await getInfoService.getList({
      where: { type: tmp },
    });
    gameData.value = data;
  } catch (error) {
    console.log(error);

    ElNotification({
      title: "Error",
      message: "Get Games Fail",
      type: "error",
    });
  }
}, 100);
const loadMore = async () => {
  console.log("loadMore");
  gameData.value.push(
    await getInfoService.getList({ skip: gameData.value.length })
  );
};
</script>

<style scoped>
.el-aside {
  display: block;
  position: relative;
  overflow-y: auto;
  padding: 0px 20px 0px 20px;
  min-width: 200px;
  color: white;
  font-size: 2rem;
  text-align: left;
  min-height: calc(100vh - 50px);
  background-color: var(--el-bg-color);
  z-index: 1;
}
.el-tree {
  background-color: rgba(255, 255, 255, 0);
  --el-tree-node-hover-bg-color: rgba(255, 255, 255, 0.1);
  --el-tree-text-color: white;
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
  grid-template-rows: max-content;
  grid-gap: 10px;
  margin-left: 5px;
  margin-right: 15px;
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  line-height: 160px;
}
@media screen and (max-width: 1023px) {
  .el-aside {
    position: absolute;
    left: -100%;
  }
}
@media screen and (max-width: 768px) {
  .el-main {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
