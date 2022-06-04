<template>
  <el-form>
    <el-row :gutter="20" justify="center">
      <el-col :sm="24" :lg="24">
        <el-scrollbar>
          <el-form-item label="Download Links">
            <el-row v-for="(item, key) in data.links" style="width: 100%">
              <el-col :span="4">
                <el-input v-model="item.name" :placeholder="`Name or Password`">
                </el-input>
              </el-col>
              <el-col :span="20">
                <el-input v-model="item.url" :placeholder="`URL`">
                  <template #append>
                    <el-button :icon="Delete" @click="del(key)"></el-button>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-scrollbar>
      </el-col>
    </el-row>

    <el-row justify="end">
      <el-col>
        <el-form-item style="margin: 0">
          <el-button @click="add">Add</el-button>
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
import { Delete } from "@element-plus/icons-vue";

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
  links?: Array<any>;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  links: [],
});
watch(props, () => {
  if (!hasInit) {
    data.value.links = props.src?.links;
    hasInit = true;
  }
});
const add = () => {
  if (Array.isArray(data.value.links))
    data.value.links.push({ name: "", data: "" });
  else data.value.links = [{ name: "", data: "" }];
  console.log(data.value.links);
};
const del = (key: number) => {
  data.value.links?.splice(key, 1);
};
</script>
<style scoped></style>
