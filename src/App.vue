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
          <div class="avatar-wrapper">
            <img
              v-if="user.userInfo?.avatar"
              class="avatar"
              :src="user.userInfo?.avatar"
              alt="avatar"
            />
          </div>

          <span>{{ user.userInfo.username }}</span>
        </template>
        <el-menu-item index="/mygames">My Games</el-menu-item>
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
import store from "@/utils/store";
import { useUserStore } from "@/stores";
import { ElNotification } from "element-plus";
import userService from "@/services/userService";

onBeforeMount(() => {
  getUserInfo();
});

const user = useUserStore();
const activeIndex = ref(router.currentRoute.value.path);

const getUserInfo = async () => {
  // 检查pinia中是否存在userInfo
  if (!user.userInfo._id) {
    //pinia中userInfo不存在则需重新获取
    try {
      const userInfo = await userService.getUserInfo();
      //判断userInfo是否获取成功
      if (userInfo.code === 200 && userInfo.data) {
        //登录成功
        user.setUserInfo(userInfo.data);
        user.setLoginStatus(true);
      } else {
        //登录态失效
        userService.logout();
      }
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "Get User Info Faild",
        type: "error",
      });
    }
  } else {
    //pinia中userInfo存在则视为成功登录
    user.setLoginStatus(true);
  }
};
</script>

<style scoped>
.avatar-wrapper {
  height: var(--el-menu-item-height);
  display: flex;
}
.avatar {
  margin: calc(0.25em + 1px) 0.5em 0.25em 0.25em;
  border-radius: 50%;
}
</style>

<style>
body {
  background-color: var(--el-bg-color);
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
  --el-menu-item-height: 48px;
}
.el-checkbox {
  --el-checkbox-checked-bg-color: var(--el-checkbox-bg-color);
  --el-checkbox-checked-icon-color: #ffffff;
}
.el-message-box {
  border: none;
}
.el-message-box {
  background-color: #424242;
}
.el-message-box__btns .upload-box-btn {
  --el-button-hover-text-color: #ffffff;
  --el-button-hover-bg-color: rgb(104, 104, 104);
  --el-button-hover-border-color: rgb(104, 104, 104);
  --el-button-active-bg-color: rgb(59, 59, 59);
  --el-button-active-border-color: rgb(59, 59, 59);
}
</style>
