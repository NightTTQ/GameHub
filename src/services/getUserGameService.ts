import axios from "axios";
import store from "@/utils/store";
const apiLink = "https://qcnnig.api.cloudendpoint.cn/getMyGame";

export default {
  async getGame() {
    const apiConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-tt-session-v2": store.getSession()!,
        TOKEN: store.getToken()!,
      },
    };
    const params = {};
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
