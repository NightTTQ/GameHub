<template>
  <div class="view-page">
    <div class="view-page-content">
      <el-card class="card" body-style="display: flex;">
        <template #header>
          <div class="card-header">
            <span class="title">My Games</span>
          </div>
        </template>
        <div class="games-div">
          <span class="sub-title">OWN</span>
          <div class="games-wrapper">
            <EditGameCard
              class="card"
              v-for="item in games?.own"
              :data="item"
              :type="0"
            />
            <CreateGameCard :type="0" />
          </div>
          <span class="sub-title">EDITOR</span>
          <div class="games-wrapper">
            <EditGameCard
              v-for="item in games?.editor"
              :data="item"
              :type="1"
            />
            <CreateGameCard :type="1" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import userService from "@/services/userService";
import userGameService from "@/services/getUserGameService";
import router from "@/router";
import EditGameCard from "@/components/gameManage/editGameCard.vue";
import CreateGameCard from "@/components/gameManage/createGameCard.vue";
import { ElNotification } from "element-plus";

interface data {
  own: Array<object>;
  editor: Array<object>;
}

const games = ref<data>();

onMounted(async () => {
  games.value = await getGames();
});

const getGames = async () => {
  let data;
  // 尝试获取可编辑的游戏
  await userGameService.getGame().then(async (res) => {
    // token无效
    if (res.code) {
      // 使用RefreshToken刷新token
      await userService.refreshToken().then(async (token) => {
        // RefreshToken过期自动登出
        if (token.code) {
          ElNotification({
            title: "Error",
            message: "Please login again\n" + token.code,
            type: "error",
          });
          router.push({ name: "logout" });
        }
        // 刷新成功重发请求
        else {
          await userGameService.getGame().then((res) => {
            // 刷新Token后仍发生错误
            if (res.code) {
              ElNotification({
                title: "Error",
                message: "Please login again",
                type: "error",
              });
              router.push({ name: "logout" });
            } else {
              // 成功
              data = res;
            }
          });
        }
      });
    }
    // 成功
    else data = res;
  });
  console.log(data);
  return data;
};
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
.card {
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
.sub-title {
  height: 2em;
  line-height: 2em;
  padding-left: 1em;
  text-align: center;
  margin-bottom: 1em;
  background: linear-gradient(
    to right,
    rgba(22, 22, 22, 1),
    rgba(22, 22, 22, 0)
  );
}
.games-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.games-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  grid-template-rows: max-content;
  grid-gap: 20px;
  margin-bottom: 30px;
  width: 100%;
}
.form-body {
  width: 100%;
}
</style>
