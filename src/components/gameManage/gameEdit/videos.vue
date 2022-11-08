<template>
  <el-form>
    <el-row :gutter="20" justify="center">
      <el-col :sm="24" :lg="24">
        <el-scrollbar>
          <el-form-item label="Game Video">
            <el-row v-for="(item, key) in data.videos" style="width: 100%">
              <el-input v-model="item.data">
                <template #prepend>
                  <el-select v-model="item.type">
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Delete" @click="del(key)"></el-button>
                </template>
              </el-input>
            </el-row>
          </el-form-item>
        </el-scrollbar>
      </el-col>
    </el-row>

    <el-row justify="end">
      <el-col>
        <el-form-item style="margin: 0">
          <el-button @click="add">Add</el-button>
          <el-button color="#424242" @click="submit" :loading="isLoading">
            Submit
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { updateGame } from "@/services/userGameService";
import { Delete } from "@element-plus/icons-vue";

const emit = defineEmits<{
  (event: "updated", res: any): void;
}>();
const isLoading = ref(false);
let hasInit = false;
const submit = async () => {
  isLoading.value = true;
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};

interface dataType {
  videos?: Array<any>;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  videos: [],
});
watch(props, () => {
  if (!hasInit) {
    data.value.videos = props.src?.videos;
    hasInit = true;
  }
});
const types = [
  {
    value: "video",
    label: "file",
  },
  {
    value: "bili",
    label: "bilibili",
  },
];
const add = () => {
  if (Array.isArray(data.value.videos))
    data.value.videos.push({ type: "", data: "" });
  else data.value.videos = [{ type: "", data: "" }];
  console.log(data.value.videos);
};
const del = (key: number) => {
  data.value.videos?.splice(key, 1);
};
</script>
<style scoped></style>
