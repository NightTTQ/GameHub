<template>
  <el-scrollbar>
    <el-backtop target=".el-scrollbar .el-scrollbar__wrap"></el-backtop>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      background-color="#424242"
      text-color="#fff"
      active-text-color="#ffd04b"
      :ellipsis="Boolean(false)"
      router
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <div class="nav-space"></div>
      <div class="nav-right">
        <el-button type="primary">Create</el-button>
      </div>
    </el-menu>

    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeIndex = ref("/");
</script>

<style>
body {
  background-color: rgb(28, 28, 28);
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  outline: none;
  user-select: none;
  appearance: none;
  background: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
}
.nav-space{
  flex: 1;
}
.nav-right {
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-menu {
  border: none;
  height: 48px;
}
</style>
