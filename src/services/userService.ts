import { v1 as uuidv1 } from "uuid";
import axios from "axios";
import store from "@/utils/store";

export default {
  /**
   * @desc 向服务器发起登录，登录成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async login(username: string, password: string): Promise<any> {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/userLogin";
    if (!store.getSession()) store.setSession(uuidv1());
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
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
    if (!store.getSession()) store.setSession(uuidv1());

    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
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
    if (!store.getSession()) return { error: "No user login." };
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
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
    if (!store.getSession()) return null;
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
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
   * @desc 使用localRefreshToken获取新Token
   */
  async refreshToken() {
    const apiLink = "https://qcnnig.api.cloudendpoint.cn/refreshToken";
    if (!store.getSession()) return null;
    const apiConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-tt-session-v2": store.getSession()!,
        RefreshToken: store.getRefreshToken()!,
      },
    };
    const params = {};
    // return params;
    const { data } = await axios
      .post(apiLink, params, apiConfig)
      .then((response) => {
        if (response.data.code) {
          // 返回含错误码，登录态失效
        } else {
          if (response.data.token) {
            store.setToken(response.data.token);
          }
          //当服务器返回RefreshToken时说明RefreshToken也进行了刷新
          if (response.data.RefreshToken) {
            store.setRefreshToken(response.data.RefreshToken);
          }
        }

        return response;
      })
      .catch((error) => {
        return error;
      });
    return data;
  },
};
