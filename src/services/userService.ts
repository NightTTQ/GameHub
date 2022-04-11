import { v1 as uuidv1 } from "uuid";
import request from "@/services/axios/request";
import store from "@/utils/store";

export default {
  /**
   * @desc 向服务器发起登录，登录成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async login(username: string, password: string): Promise<any> {
    if (!store.getSession()) store.setSession(uuidv1());
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const params = {
      username: username,
      password: password,
    };
    const { data } = await request.post("/userLogin", params, config);
    return data;
  },
  /**
   * @desc 向服务器申请注册，注册成功后可使用localSession获取用户信息
   * @param username 账号
   * @param password 密码
   */
  async register(username: string, password: string): Promise<any> {
    if (!store.getSession()) store.setSession(uuidv1());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const params = {
      username: username,
      password: password,
    };
    const { data } = await request.post("/userRegister", params, config);
    return data;
  },
  /**
   * @desc 向服务器声明注销，注销成功后需手动清空localSession与登录态
   */
  async logout() {
    if (!store.getSession()) return { error: "No user login." };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const params = {};
    const { data } = await request.post("/userLogout", params, config);
    return data;
  },
  /**
   * @desc 使用localSession向服务器获取用户信息
   */
  async getUserInfo() {
    if (!store.getSession()) return null;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const params = {};
    // return params;
    const { data } = await request.post("/getUserInfo", params, config);
    return data;
  },
  /**
   * @desc 使用localRefreshToken获取新Token
   */
  async refreshToken() {
    if (!store.getSession()) return null;
    const config = {
      headers: {
        "Content-Type": "application/json",
        RefreshToken: store.getRefreshToken()!,
      },
    };
    const params = {};
    const { data } = await request
      .post("/refreshToken", params, config)
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
      });
    return data;
  },
};
