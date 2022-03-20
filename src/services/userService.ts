import { v1 as uuidv1 } from "uuid";
import axios from "axios";

export default {
  /**
   * @desc 向服务器发起登录，登录成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async login(username: string, password: string): Promise<any> {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/userLogin";
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
  /**
   * @desc 向服务器申请注册，注册成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async register(username: string, password: string): Promise<any> {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/userRegister";
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
  /**
   * @desc 向服务器声明注销，注销成功后需手动清空localSession与登录态
   */
  async logout() {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/userLogout";
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
  /**
   * @desc 使用localSession向服务器获取用户信息
   */
  async getUserInfo() {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/getUserInfo";
    const localSessionKey = `light:GameHub:local-session`;
    if (!localStorage.getItem(localSessionKey)) return null;
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
