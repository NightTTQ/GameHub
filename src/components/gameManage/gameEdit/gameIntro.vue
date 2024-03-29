<template>
    <el-form>
        <el-row>
            <el-col :span="24" style="text-align: left">
                <el-form-item label="Short Intro">
                    <MdEditor
                        v-model="data.description"
                        theme="dark"
                        editor-id="dec"
                        :toolbars="decToolbar"
                        noMermaid
                        :preview="false"
                        style="height: 200px"
                    />
                </el-form-item>
                <el-form-item label="Detail Intro">
                    <MdEditor
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
import { MdEditor } from "md-editor-v3";
import type { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { updateGame } from "@/services/userGameService";

const emit = defineEmits<{
    (event: "updated", res: any): void;
}>();

const decToolbar: ToolbarNames[] = ["revoke", "next"];
const aboutToolbar: ToolbarNames[] = ["save", "htmlPreview", "catalog", "github", "mermaid"];

const uploadImg = async (files: File[], callback: (urls: string[]) => void) => {
    await Promise.all(
        Array.from(files).map((file) => {
            return uploadService.upload(file);
        })
    )
        .then((res) => callback(res.map((url) => url)))
        .catch((err) => console.log(err));
};

const isLoading = ref(false);
let hasInit = false;
const submit = async () => {
    isLoading.value = true;
    const res = await updateGame(props.gameId, data.value);
    emit("updated", res);
    isLoading.value = false;
};

onMounted(() => {});

interface dataType {
    description?: string;
    about?: string;
}
const props = defineProps<{
    gameId: number;
    src?: dataType;
}>();

const data = ref<dataType>({
    description: undefined,
    about: undefined,
});
watch(props, () => {
    if (!hasInit) {
        data.value.description = props.src?.description;
        data.value.about = props.src?.about;
        hasInit = true;
    }
});
</script>
<style scoped></style>
