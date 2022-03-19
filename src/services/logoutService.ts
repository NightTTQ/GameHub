import axios from "axios";

const apiLink = "https://qcnnig.api.cloudendpoint.cn/userLogout";

export default {
  async logout() {
    const localSessionKey = `light:GameHub:local-session`;
    if (!localStorage.getItem(localSessionKey))
      return { error: "No user login." };
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": localStorage.getItem(localSessionKey)!,
      },
    };

    const params = {};

    // return params;
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
