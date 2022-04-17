<template>
  <el-form>
    <el-row :gutter="20" justify="space-between">
      <el-col :sm="24" :lg="12">
        <el-form-item label="Game Type">
          <el-select v-model="data.class" class="item">
            <el-option-group
              v-for="group in gameClass"
              :key="group.class"
              :label="group.class"
            >
              <el-option
                v-for="item in group.children"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="Platform">
          <el-select v-model="data.platform" multiple class="item">
            <el-option v-for="item in Platforms" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="space-between">
      <el-col :sm="24" :lg="12">
        <el-form-item label="Release Date">
          <el-radio v-model="haveDate" :label="false">TBD</el-radio>
          <el-radio v-model="haveDate" :label="true">Pick a date</el-radio>
          <el-date-picker
            :disabled="!haveDate"
            v-model="data.releaseDate"
            type="date"
            popper-class="date-popper"
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
import { ref, watch } from "vue";
import gameClass from "@/assets/gameClass.json";
import { updateGame } from "@/services/userGameService";

const emit = defineEmits<{
  (event: "updated", res: any): void;
}>();

const isLoading = ref(false);

const submit = async () => {
  if (!haveDate.value) data.value.releaseDate = null;
  isLoading.value = true;
  const res = await updateGame(props.gameId, data.value);
  emit("updated", res);
  isLoading.value = false;
};

const Platforms = ["Windows", "Linux", "MacOS", "Android", "iOS"];
const haveDate = ref(false);
interface dataType {
  class?: string;
  platform?: Array<string>;
  releaseDate?: Date | null;
}
const props = defineProps<{
  gameId: number;
  src?: dataType;
}>();

const data = ref<dataType>({
  class: undefined,
  platform: undefined,
  releaseDate: undefined,
});
watch(props, () => {
  data.value.class = props.src?.class;
  data.value.platform = props.src?.platform;
  data.value.releaseDate = props.src?.releaseDate;
  if (data.value.releaseDate) haveDate.value = true;
});
</script>
<style scoped>
.item {
  width: 100%;
}
</style>
