import axios from "axios";
import store from "@/utils/store";
const apiLink = "https://qcnnig.api.cloudendpoint.cn/getMyGame";

export default {
  /**
   * @dec 获取属于用户或用户可编辑的游戏
   * @param id 获取的具体游戏id
   */
  async getGame(id?: number) {
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
        TOKEN: store.getToken()!,
      },
    };
    const params = { id };
    const { data } = await axios
      .post(apiLink, params, apiConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
