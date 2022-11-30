<template>
  <el-form>
    <el-row>
      <el-form-item>
        <el-upload
          :auto-upload="false"
          accept="image"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-remove="toRemove"
          v-model:file-list="fileList"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img :src="dialogImageUrl" alt="Preview Image" class="img" />
        </el-dialog>
      </el-form-item>
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
import { Plus } from "@element-plus/icons-vue";
import { updateGame } from "@/services/userGameService";
import uploadService from "@/services/uploadService";

import type { UploadProps, UploadUserFile } from "element-plus";

const emit = defineEmits<{
  (event: "updated", res: any): void;
}>();
const isLoading = ref(false);
let hasInit = false;
const submit = async () => {
  isLoading.value = true;
  data.value.gallery?.splice(0);
  // 检索fileList
  await Promise.all(
    fileList.value.map((item, key, array) =>
      (async () => {
        if (item.raw) {
          // 上传未上传的图片
          array[key].status = "uploading";
          const url = await uploadService.upload(
            item.raw,
            (percent: number) => {
              array[key].percentage = percent;
              console.log(key + ":" + array[key].percentage);
            }
          );
          array[key].status = "success";
          data.value.gallery?.push({ type: item.raw.type, data: url });
          delete array[key].raw;
        } else {
          // 将已上传的图片url存入data
          data.value.gallery?.push({ type: item.name, data: item.url });
        }
      })()
    )
  );
  // 将data提交至后端
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};
interface dataType {
  gallery?: Array<any>;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  gallery: [],
});
watch(props, () => {
  // 将服务器上已存在的图片存入fileList
  if (!hasInit) {
    props.src?.gallery?.forEach((item) => {
      fileList.value.push({ name: item.type, url: item.data });
    });
    hasInit = true;
  }
});

const fileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const toRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  if (uploadFile.status === "uploading") return false;
  return true;
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>
<style scoped>
.img {
  width: 100%;
}
</style>
