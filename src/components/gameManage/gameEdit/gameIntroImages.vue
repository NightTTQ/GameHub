<template>
  <el-form>
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-form-item label="Game Cover">
          <image-select ref="coverEl" :old-image="data.cover" />
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
import ImageSelect from "@/components/ImageSelect.vue";
import uploadService from "@/services/uploadService";
import { updateGame } from "@/services/userGameService";

const emit = defineEmits<{
  (event: "updated", res: any): void;
}>();

const coverEl = ref();

const isLoading = ref(false);
let hasInit = false;
const submit = async () => {
  isLoading.value = true;
  if (coverEl.value.file)
    data.value.cover = await uploadService.upload(coverEl.value.file);
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};

interface dataType {
  cover?: string;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  cover: undefined,
});
watch(props, () => {
  if (!hasInit) {
    data.value.cover = props.src?.cover;
    hasInit = true;
  }
});
</script>
<style scoped></style>
