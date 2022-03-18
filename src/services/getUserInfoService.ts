import axios from "axios";

const apiLink = "https://qcnnig.api.cloudendpoint.cn/getUserInfo";

export default {
  async getUserInfo() {
    const localSessionKey = `light:GameHub:local-session`;
    if (!localStorage.getItem(localSessionKey)) return null;
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": localStorage.getItem(localSessionKey)!,
      },
    };
    // return params;
    const { data } = await axios
      .get(apiLink, apiConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
