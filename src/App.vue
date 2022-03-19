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

      <el-sub-menu
        index="user-menu"
        v-if="user.isLogin"
        style="color: white"
        class="nav-right"
      >
        <template #title>
          <img
            v-if="user.userInfo?.avatar"
            :src="user.userInfo?.avatar"
            alt="avatar"
          />
          <span>{{ user.userInfo.username }}</span>
        </template>
        <el-menu-item index="/create">Create</el-menu-item>
        <el-menu-item index="/logout">Logout</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else index="/login">Login</el-menu-item>
    </el-menu>

    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores";
import getUserInfoService from "@/services/getUserInfoService";

onBeforeMount(() => {
  getUserInfo();
});

const user = useUserStore();
const activeIndex = ref(router.currentRoute.value.path);

const getUserInfo = async () => {
  const localSessionKey = `light:GameHub:local-session`;
  //查询localSession是否存在
  if (localStorage.getItem(localSessionKey)) {
    //存在时查询pinia中的userInfo是否存在
    if (!user.userInfo._id) {
      //pinia中userInfo不存在则需重新获取
      const userInfo = await getUserInfoService.getUserInfo();
      //判断userInfo是否获取成功
      if (userInfo.success && userInfo.user) {
        //登录成功
        user.setUserInfo(userInfo.user);
        user.setLoginStatus(true);
      } else {
        //登录态失效并清除localSession
        user.setUserInfo({});
        user.setLoginStatus(false);
        localStorage.removeItem(localSessionKey);
      }
    } else {
      //pinia中userInfo存在则视为成功登录
      user.setLoginStatus(true);
    }
  } else {
    //不存在则认为是未登录态
    user.setUserInfo({});
    user.setLoginStatus(false);
  }
};
const goLogin = () => {
  router.push({ name: "login" });
};
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
.nav-space {
  flex: 1;
}
.nav-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-menu {
  border: none;
  --el-menu-item-height: 48px;
}
.el-backtop {
  --el-backtop-bg-color: rgb(24, 24, 24);
  --el-backtop-text-color: var(--el-color-primary);
  --el-backtop-hover-bg-color: rgb(42, 42, 42);
}
:root {
  color: #ffffff;
  --el-color-black: #ffffff;
  --el-color-white: #424242;
  --el-text-color-primary: #f2f6fc;

  --el-card-border-color: rgba(255, 255, 255, 0.12);
  --el-text-color-regular: none;
  --el-bg-color: #282828;
  --el-input-bg-color: #424242;
  --el-input-border: none;
  --el-border-base: none;
  --el-box-shadow-light: none;
  --el-border-color-light: #363636;
}
.el-checkbox {
  --el-checkbox-checked-bg-color: var(--el-checkbox-bg-color);
  --el-checkbox-checked-icon-color: #ffffff;
}
.el-select .el-select__tags .el-tag--info {
  background-color: #323232;
}
.el-notification {
  --el-border-color-lighter: none;
}
</style>
