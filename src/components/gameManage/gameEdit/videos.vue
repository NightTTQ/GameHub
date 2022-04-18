<template>
  <el-form>
    <el-row :gutter="20" justify="center">
      <el-col :sm="24" :lg="24">
        <el-scrollbar>
          <el-form-item label="Game Video" class="game-pic-wrapper">
            <div style="display: flex"></div>
          </el-form-item>
        </el-scrollbar>
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

const submit = async () => {
  isLoading.value = true;
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};

interface dataType {
  class?: string;
  platform?: Array<string>;
  releaseDate?: Date;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  class: undefined,
  platform: undefined,
  releaseDate: undefined,
});
watch(props, () => {
  data.value.class = props.src?.class;
  data.value.platform = props.src?.platform;
  data.value.releaseDate = props.src?.releaseDate;
});
</script>
<style scoped>
.item {
  width: 100%;
}
</style>
