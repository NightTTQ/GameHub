import { v1 as uuidv1 } from "uuid";
import axios from "axios";

const apiLink = "https://qcnnig.api.cloudendpoint.cn/userLogin";

export default {
  /**
   * @desc 向服务器发起登录，登录成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async login(username: string, password: string): Promise<any> {
    const localSessionKey = `light:GameHub:local-session`;
    if (!localStorage.getItem(localSessionKey))
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
