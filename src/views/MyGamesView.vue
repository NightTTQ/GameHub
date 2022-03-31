<template>
  <div class="view-page">
    <div class="view-page-content">
      <el-card body-style="display: flex;">
        <template #header>
          <div class="card-header">
            <span class="title">My Games</span>
          </div>
        </template>
        <div class="games-wrapper"></div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import store from "@/utils/store";
import userService from "@/services/userService";
import userGameService from "@/services/getUserGameService";
const getGames = async () => {
  // 尝试获取可编辑的游戏
  userGameService.getGame().then((res) => {
    // token过期
    if (res.code == 1002) {
      // 使用RefreshToken刷新token
      userService.refreshToken().then((token) => {
        // 重发请求
        userGameService.getGame().then((res) => {
          if (res.code) {
            console.log(res);
          } else {
            console.log(res);
          }
        });
        // store.setToken(token);
        // res = userGameService.getGame();
      });
    }
    return res;
  });
};
const games = await getGames();

onMounted(() => {
  console.log(games);
});
</script>
<style scoped>
.view-page {
  width: 75%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}
.view-page-content {
  padding-top: 5%;
  padding-bottom: 90px;
}
.el-card {
  color: white;
  width: 100%;
  background-color: rgb(42, 42, 42);
}
.item {
  width: 100%;
}
.card-header {
  display: flex;
}
.title {
  font-size: large;
}
.games-wrapper {
  display: grid;
}
.form-body {
  width: 100%;
}
</style>
