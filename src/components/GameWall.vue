<template>
  <el-container>
    <el-aside>
      <h4>筛选</h4>
      <el-collapse>
        <el-checkbox-group @change="handleCheckAllChange" v-model="groups">
          <el-collapse-item v-for="(items, key) in gameClass">
            <template #title>
              <el-checkbox :label="key">
                {{ key }}
              </el-checkbox>
            </template>
            <el-checkbox-group @change="handleCheckedTagsChange" v-model="tags">
              <el-checkbox v-for="item in items" :label="item">
                {{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </el-collapse-item>
        </el-checkbox-group>
      </el-collapse>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gameClass from "@/assets/gameClass.json";

const tags = ref();
const groups = ref();

const handleCheckedTagsChange = (value: string[]) => {
  console.log(value);
};
const handleCheckAllChange = (value: string[]) => {
  console.log(value);
  //checkedCities.value = value ? cities : []
  //isIndeterminate.value = false
};
const test = (msg: string) => {
  console.log(msg);
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
}
.el-checkbox-group {
  line-height: 1;
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
}
</style>
