import { v1 as uuidv1 } from "uuid";
import axios from "axios";

const apiLink = "https://qcnnig.api.cloudendpoint.cn/userRegister";

export default {
  async register(username: string, password: string) {
    const localSessionKey = `light:GameHub:local-session`;
    localStorage.setItem(localSessionKey, uuidv1());
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": localStorage.getItem(localSessionKey)!,
      },
    };

    const params = {
      username: username,
      password: password,
    };

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
