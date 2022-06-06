<template>
  <el-form>
    <el-row :gutter="20" justify="center">
      <el-col :sm="24" :lg="24">
        <el-scrollbar>
          <el-form-item label="Visible">
            <el-row style="width: 100%">
              <el-switch v-model="data.visible" />
            </el-row>
          </el-form-item>
        </el-scrollbar>
      </el-col>
    </el-row>

    <el-row justify="end">
      <el-col>
        <el-form-item style="margin: 0">
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
  visible?: Boolean;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  visible: false,
});
watch(props, () => {
  if (!hasInit) {
    hasInit = true;
    data.value.visible = props.src?.visible;
  }
});
</script>
<style scoped></style>
