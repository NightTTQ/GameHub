import request from "@/services/axios/request";
import { controller } from "@/services/axios/request";
import { ElMessageBox } from "element-plus";
import uploadProcess from "@/components/utils/uploadProcess.vue";
import { ref, h } from "vue";

export default {
  /**
   * @dec 向服务器上传单个文件
   * @param file 需要上传的文件
   * @param callback 获取上传进度的回调函数
   * @returns 文件的url
   */
  async upload(file: File, callback?: Function) {
    const process = ref(0);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e: any) => {
        if (callback) callback(((e.loaded / e.total) * 100) | 0);
        process.value = Number(((e.loaded / e.total) * 100).toFixed(1));
      },
      AbortSignal: controller.signal,
    };
    ElMessageBox({
      title: "Uploading",
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      confirmButtonText: "Cancel",
      message: h(uploadProcess, { fileName: file.name, process: process }),
      beforeClose: (action, instance, done) => {
        if (process.value < 100) {
          controller.abort();
        }
        done();
      },
    });
    // 构建 FormData 对象
    const _FormData = new FormData();
    // 添加文件
    _FormData.append("file", file);

    // return params;
    const { data } = await request.post("/uploadFile", _FormData, config);
    return data;
  },
};
