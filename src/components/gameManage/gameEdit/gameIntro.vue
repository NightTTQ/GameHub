<template>
  <el-form>
    <el-row>
      <el-col :span="24">
        <el-form-item label="Short Intro">
          <Editor v-model="data.description" theme="dark" />
        </el-form-item>
        <el-form-item label="Detail Intro">
          <Editor v-model="data.about" theme="dark" />
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
import { ref, watch, computed, onMounted } from "vue";
import Editor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

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
  data.value.description = props.src?.description;
  data.value.about = props.src?.about;
});
</script>
<style scoped></style>
