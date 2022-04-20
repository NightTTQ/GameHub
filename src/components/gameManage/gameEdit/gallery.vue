<template>
  <el-form>
    <el-row :gutter="20" justify="space-between">
      <el-col :sm="24" :lg="12">
        <el-form-item label="Game Name"> </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="Author"> </el-form-item>
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

const isLoading = ref(false);
const submit = () => {
  console.log(data.value);
};
interface dataType {}
const props = defineProps<{
  src?: dataType;
}>();

const data = ref<dataType>({});
watch(props, () => {});
</script>
<style scoped></style>
