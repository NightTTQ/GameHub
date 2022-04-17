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
              <basic-info
                :src="{ name: form.name, author: form.author }"
                :game-id="Number(props.id)"
                @updated="update"
              />
            </el-collapse-item>
            <el-collapse-item title="Additional Info" name="2">
              <additional-info
                :src="{
                  class: form.class,
                  platform: form.platform,
                  releaseDate: form.releaseDate,
                }"
                :game-id="Number(props.id)"
                @updated="update"
              />
            </el-collapse-item>
            <el-collapse-item title="Game Intro" name="3">
              <GameIntro
                :src="{ description: form.description, about: form.about }"
                :game-id="Number(props.id)"
                @updated="update"
              />
            </el-collapse-item>
            <el-collapse-item title="Game Intro Images" name="4">
              <game-intro-images
                :src="{ cover: form.cover }"
                :game-id="Number(props.id)"
                @updated="update"
              />
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
import { ElNotification } from "element-plus";
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
  const res = await getUserGame(Number(props.id));
  if (res.error) {
    ElNotification({
      type: "error",
      message: res.error,
      title: "Error",
    });
    router.push({ name: "mygames" });
  } else form.value = res;
});
// 游戏更新后根据返回信息刷新
const update = (res: any) => {
  if (res.error) {
    ElNotification({
      type: "error",
      message: res.error,
      title: "Error",
    });
  } else {
    ElNotification({
      type: "success",
      message: "Save success",
      title: "Success",
    });
    form.value = res;
  }
};

interface Author {
  name: string;
  type: number;
  url: string;
}
interface gameData {
  // 1 Basic Info
  name?: string;
  author?: Author;
  // 2 Additional Info
  class?: string;
  platform?: Array<string>;
  releaseDate?: Date;
  // 3 Game Intro
  description?: string;
  about?: string;
  // 4 Game Intro Images
  cover?: string;
}
const form = ref<gameData>({
  // 1 Basic Info
  name: undefined,
  author: { name: "", type: 0, url: "" },
  // 2 Additional Info
  class: undefined,
  platform: undefined,
  releaseDate: undefined,
  // 3 Game Intro
  description: undefined,
  about: undefined,
  // 4 Game Intro Images
  cover: undefined,
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
