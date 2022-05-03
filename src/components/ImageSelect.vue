<template>
  <input
    type="file"
    accept=".jpg, .jpeg, .png"
    @change="handleFile"
    ref="selectFileEl"
    class="select-file"
  />
  <div class="cover-uploader">
    <button @click="selectFile" type="button" class="uploader-wrapper">
      <img v-if="coverImage" :src="coverImage" class="cover" />
      <el-icon v-else class="uploader-icon">
        <Plus />
      </el-icon>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const selectFileEl = ref();
const coverImage = ref();
const file = ref();
const props = defineProps<{
  oldImage?: string;
}>();
defineExpose({ coverImage, file });
watch(props, () => {
  coverImage.value = props.oldImage;
});

const selectFile = () => {
  selectFileEl.value.click();
};

const handleFile = (event: any) => {
  if (!event.target.files[0]) return;
  if (event.target.files[0].size > 2 * 1024 * 1024) {
    ElMessage.error("The file should be less than 2MB.");
  } else {
    ElMessage.info(
      (event.target.files[0].size / (1024 * 1024)).toFixed(2) + "MB"
    );
    file.value = event.target.files[0];
    coverImage.value = URL.createObjectURL(event.target.files[0]);
  }
};
</script>
<style scoped>
.select-file {
  display: none;
}
.cover-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}
.cover-uploader:hover {
  border: 1px dashed #409eff;
}
.uploader-wrapper {
  width: 100%;
  height: 100%;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.cover {
  max-width: 100%;
}
.el-icon.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
