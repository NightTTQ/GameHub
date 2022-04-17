<template>
  <el-form>
    <el-row>
      <el-col :span="24" style="text-align: left">
        <el-form-item label="Short Intro">
          <Editor
            v-model="data.description"
            theme="dark"
            editor-id="dec"
            :toolbars="decToolbar"
            noMermaid
          />
        </el-form-item>
        <el-form-item label="Detail Intro">
          <Editor
            v-model="data.about"
            theme="dark"
            editor-id="about"
            :toolbars-exclude="aboutToolbar"
            :on-upload-img="uploadImg"
            noMermaid
            style="height: fit-content"
          />
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
import { ref, watch, onMounted } from "vue";
import uploadService from "@/services/uploadService";
import Editor from "md-editor-v3";
import type { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const decToolbar: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "-",
  "strikeThrough",
  "title",
  "sub",
  "sup",
];
const aboutToolbar: ToolbarNames[] = [
  "save",
  "htmlPreview",
  "catalog",
  "github",
  "mermaid",
];

const uploadImg = async (
  files: FileList,
  callback: (urls: string[]) => void
) => {
  const res = await Promise.all(
    Array.from(files).map((file) => {
      return uploadService.upload(file);
    })
  );
  callback(res.map((url) => url));
};

const isLoading = ref(false);
const submit = () => {
  console.log(data.value);
};

onMounted(() => {});

interface dataType {
  description?: string;
  about?: string;
}
const props = defineProps<{
  src?: dataType;
}>();

const data = ref<dataType>({
  description: undefined,
  about: undefined,
});
watch(props, () => {
  if (!data.value.description) data.value.description = props.src?.description;
  if (!data.value.about) data.value.about = props.src?.about;
});
</script>
<style scoped></style>
