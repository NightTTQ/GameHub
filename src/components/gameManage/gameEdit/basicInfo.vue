<template>
  <el-form>
    <el-row :gutter="20" justify="space-between">
      <el-col :sm="24" :lg="12">
        <el-form-item label="Game Name">
          <el-input :maxlength="30" v-model="data.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="Author">
          <el-input maxlength="30" v-model="author.name"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row justify="end">
      <el-col>
        <el-form-item style="margin: 0">
          <el-button color="#424242" @click="submit" :loading="isLoading">
            <span style="color: white">Submit</span>
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { updateGame } from "@/services/userGameService";

const emit = defineEmits<{
  (event: "updated", res: any): void;
}>();

const isLoading = ref(false);
let hasInit = false;
const submit = async () => {
  isLoading.value = true;
  data.value.author = author;
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};

interface Author {
  name: string;
  type: number;
  url: string;
}
interface dataType {
  name?: string;
  author?: Author;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const author = ref<any>({ name: "", type: 0, url: "" });
const data = ref<dataType>({
  name: undefined,
  author: { name: "", type: 0, url: "" },
});
watch(props, () => {
  if (!hasInit) {
    data.value.name = props.src?.name;
    author.value = props.src?.author;
    hasInit = true;
  }
});
</script>
<style scoped></style>
