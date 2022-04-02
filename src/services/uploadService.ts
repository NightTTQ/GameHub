import axios from "axios";
import store from "@/utils/store";
const apiLink = "https://qcnnig.api.cloudendpoint.cn/uploadFile";

export default {
  async upload(file: File) {
    const apiConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-tt-session-v2": store.getSession()!,
        TOKEN: store.getToken()!,
      },
    };
    // 构建 FormData 对象
    const _FormData = new FormData();
    // 添加文件
    _FormData.append("file", file);

    // return params;
    const { data } = await axios
      .post(apiLink, _FormData, apiConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
