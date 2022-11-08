import request from "@/services/axios/request";
import { ElMessageBox } from "element-plus";
import uploadProcess from "@/components/utils/uploadProcess.vue";
import { ref, h } from "vue";

const api = { getConfig: "/file/token" };

export default {
  /**
   * @dec 向服务器上传单个文件
   * @param file 需要上传的文件
   * @param callback 获取上传进度的回调函数
   * @returns 文件的url
   */
  async upload(file: File, callback?: Function) {
    const uploadConfig = await this.getConfig();
    const process = ref(0);
    const controller = new AbortController();
    request.defaults.signal = controller.signal;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e: any) => {
        process.value = Number(((e.loaded / e.total) * 100).toFixed(1));
        if (callback) callback(process.value);
        if (e.loaded === e.total) {
          setTimeout(() => ElMessageBox.close(), 300);
        }
      },
    };
    if (!callback)
      ElMessageBox({
        title: "Uploading",
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonClass: "upload-box-btn",
        message: h(uploadProcess, { fileName: file.name, process: process }),
        beforeClose: (action, instance, done) => {
          if (process.value < 100) {
            controller.abort();
          }
          request.defaults.signal = undefined;
          done();
        },
      });
    // 构建 FormData 对象
    const _FormData = new FormData();
    // 添加文件
    _FormData.append("file", file);
    _FormData.append("token", uploadConfig.token);

    const { data } = await request.post(uploadConfig.url, _FormData, config);

    return `${uploadConfig.domain}/${data.key}`;
  },
  async getConfig() {
    const { data } = await request.get(api.getConfig);
    return data.data;
  },
};
