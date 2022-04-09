import axios from "axios";
import store from "@/utils/store";
const apiLink = "https://qcnnig.api.cloudendpoint.cn/createGame";

export default {
  /**
   * @desc 向服务器请求创建新游戏
   * @param info 新游戏信息
   */
  async createGame(info: any) {
    const apiConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-tt-session-v2": store.getSession()!,
        TOKEN: store.getToken()!,
      },
    };

    // return params;
    const { data } = await axios
      .post(apiLink, info, apiConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
