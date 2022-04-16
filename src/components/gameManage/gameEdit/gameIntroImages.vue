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

const coverEl = ref();

const isLoading = ref(false);
const submit = () => {
  console.log(data.value);
};

interface dataType {
  cover?: string;
}
const props = defineProps<{
  src?: dataType;
}>();

const data = ref<dataType>({
  cover: undefined,
});
watch(props, () => {
  data.value.cover = props.src?.cover;
});
</script>
<style scoped></style>
