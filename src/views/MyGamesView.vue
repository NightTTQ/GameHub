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
            <CreateGameCard :type="0" class="card" />
          </div>
          <span class="sub-title">EDITOR</span>
          <div class="games-wrapper">
            <EditGameCard
              class="card"
              v-for="item in games?.editor"
              :data="item"
              :type="1"
            />
            <CreateGameCard :type="1" class="card" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import userService from "@/services/userService";
import { getUserGame } from "@/services/userGameService";
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
  const res = await getGames();
  if (res.error)
    ElNotification({
      title: "Error",
      message: res.error.message,
      type: "error",
    });
  else games.value = res.data;
});

const getGames = async () => {
  // 尝试获取可编辑的游戏
  return await getUserGame();
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
  min-height: 250px;
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
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
@media screen and (max-width: 768px) {
  .games-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
