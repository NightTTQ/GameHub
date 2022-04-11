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
          <el-row :gutter="20" justify="space-between">
            <el-col :sm="24" :lg="12">
              <el-form-item label="Game Name">
                <el-input :maxlength="30" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="12">
              <el-form-item label="Author">
                <el-input maxlength="30" v-model="form.author.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" justify="space-between">
            <el-col :sm="24" :lg="12">
              <el-form-item label="Game Type">
                <el-select v-model="form.class" class="item">
                  <el-option-group
                    v-for="group in gameClass"
                    :key="group.class"
                    :label="group.class"
                  >
                    <el-option
                      v-for="item in group.children"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="12">
              <el-form-item label="Platform">
                <el-select v-model="form.platform" multiple class="item">
                  <el-option
                    v-for="item in Platforms"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :sm="24" :lg="12">
              <el-form-item label="Release Date">
                <el-radio v-model="haveDate" :label="false">TBD</el-radio>
                <el-radio v-model="haveDate" :label="true"
                  >Pick a date</el-radio
                >
                <el-date-picker
                  v-if="haveDate"
                  v-model="form.releaseDate"
                  type="date"
                  popper-class="date-popper"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" justify="space-between">
            <el-col :sm="24" :lg="12">
              <el-form-item label="Game Cover">
                <image-select ref="coverEl" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :lg="12">
              <el-form-item label="Tips">
                <div class="tip">
                  <p>After clicking Submit, a new game will be created.</p>
                  <p>
                    Please edit other details on the corresponding game details
                    page.
                  </p>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="end">
            <el-col>
              <el-button color="#424242" @click="submit" :loading="isLoading">
                <span style="color: white">Submit</span>
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import gameClass from "@/assets/gameClass.json";
import ImageSelect from "@/components/ImageSelect.vue";
import { ElNotification } from "element-plus";
import userGameService from "@/services/getUserGameService";
import gameManageService from "@/services/gameManageService";
import uploadService from "@/services/uploadService";
import router from "@/router";

const props = defineProps<{
  id: number | string;
}>();
// 获取游戏信息
onMounted(async () => {
  form.value = await userGameService.getGame(Number(props.id));
  if (form.value.releaseDate) haveDate.value = true;
});

const Platforms = ["Windows", "Linux", "MacOS", "Android", "iOS"];
interface Author {
  name: string;
  type: number;
  url: string;
}
interface gameData {
  name: string | undefined;
  platform: Array<string> | undefined;
  class: string | undefined;
  author: Author;
  cover: string | undefined;
  releaseDate: Date | undefined;
}
const form = ref<gameData>({
  name: undefined,
  platform: undefined,
  class: undefined,
  author: { name: "", type: 0, url: "" },
  cover: undefined,
  releaseDate: undefined,
});

const coverEl = ref();
const haveDate = ref(false);
const isLoading = ref(false);

const submit = async () => {
  console.log(form.value);
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
.form-body {
  width: 100%;
}
.tip {
  text-align: left;
  line-height: 1em;
}
@media (max-width: 1023px) {
  .view-page {
    width: 90%;
  }
}
</style>
