<template>
  <div class="view-page">
    <div class="view-page-content">
      <el-card body-style="display: flex;">
        <template #header>
          <div class="card-header">
            <span class="title">Create new game</span>
          </div>
        </template>

        <el-form :model="form" label-position="top" class="form-body">
          <el-collapse v-model="activeTab" accordion>
            <el-collapse-item title="Basic Info" name="1">
              <basic-info :src="{ name: form.name, author: form.author }" />
            </el-collapse-item>
            <el-collapse-item title="Additional Info" name="2">
              <additional-info
                :src="{
                  class: form.class,
                  platform: form.platform,
                  releaseDate: form.releaseDate,
                }"
              />
            </el-collapse-item>
            <el-collapse-item title="Game Intro" name="3"> </el-collapse-item>
            <el-collapse-item title="Game Intro Images" name="4">
              <game-intro-images :src="{ cover: form.cover }" />
            </el-collapse-item>
            <el-collapse-item title="Videos" name="5">
              <videos />
            </el-collapse-item>
            <el-collapse-item title="Gallery" name="6"> </el-collapse-item>
            <el-collapse-item title="Downloads" name="7"> </el-collapse-item>
          </el-collapse>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserGame } from "@/services/userGameService";
import router from "@/router";
import BasicInfo from "@/components/gameManage/gameEdit/basicInfo.vue";
import AdditionalInfo from "@/components/gameManage/gameEdit/additionalInfo.vue";
import GameIntro from "@/components/gameManage/gameEdit/gameIntro.vue";
import GameIntroImages from "@/components/gameManage/gameEdit/gameIntroImages.vue";
import Videos from "@/components/gameManage/gameEdit/videos.vue";
import Downloads from "@/components/gameManage/gameEdit/downloads.vue";

const props = defineProps<{
  id: number | string;
}>();
// 获取游戏信息
onMounted(async () => {
  form.value = await getUserGame(Number(props.id));
});

interface Author {
  name: string;
  type: number;
  url: string;
}
interface gameData {
  name?: string;
  platform?: Array<string>;
  class?: string;
  author?: Author;
  cover?: string;
  releaseDate?: Date;
}
const form = ref<gameData>({
  name: undefined,
  platform: undefined,
  class: undefined,
  author: { name: "", type: 0, url: "" },
  cover: undefined,
  releaseDate: undefined,
});

const activeTab = ref("1");
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
.card-header {
  display: flex;
}
.el-collapse {
  --el-collapse-border-color: var(--el-bg-color);
  --el-collapse-header-bg-color: none;
  --el-collapse-content-bg-color: none;
}
.title {
  font-size: large;
}
.form-body {
  width: 100%;
}
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
</style>
