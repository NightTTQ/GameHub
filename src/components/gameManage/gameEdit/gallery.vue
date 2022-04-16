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
          <el-input maxlength="30" v-model="data.author.name"></el-input>
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

const isLoading = ref(false);
const submit = () => {
  console.log(data.value);
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
  src?: dataType;
}>();

const data = ref<dataType>({
  name: undefined,
  author: { name: "", type: 0, url: "" },
});
watch(props, () => {
  data.value.name = props.src?.name;
  data.value.author = props.src?.author;
});
</script>
<style scoped></style>
