import { v1 as uuidv1 } from "uuid";
import request from "@/services/axios/request";
import store from "@/utils/store";
import { useUserStore } from "@/stores";

const api = {
  getUserInfo: "/user/info",
  login: "/user/login",
  register: "/user/register",
  logout: "/user/logout",
  refreshToken: "/user/refreshToken",
};

/**
 * @desc 向服务器发起登录，登录成功后可使用localSession获取用户信息
 * @param username 账号
 * @param password 密码
 */
async function login(username: string, password: string): Promise<any> {
  // if (!store.getSession()) store.setSession(uuidv1());
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const params = {
    username: username,
    password: password,
  };
  const { data } = await request.post(api.login, params, config);
  return data;
}
/**
 * @desc 向服务器申请注册
 * @param username 账号
 * @param password 密码
 */
async function register(username: string, password: string): Promise<any> {
  // if (!store.getSession()) store.setSession(uuidv1());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const params = {
    username: username,
    password: password,
  };
  const { data } = await request.post(api.register, params, config);
  return data;
}
/**
 * @desc 用户注销，会自动清空token、refreshToken与登录态
 */
async function logout() {
  const user = useUserStore();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await request.get(api.logout, config);
  if (data.code === 200) {
    user.setLoginStatus(false);
    user.setUserInfo({});
    return true;
  } else return false;
}
/**
 * @desc 从服务器获取当前用户信息（需要token）
 */
async function getUserInfo() {
  const { data } = await request.get(api.getUserInfo);
  return data;
}
/**
 * @desc 使用localRefreshToken获取新Token
 */
async function refreshToken() {
  if (!store.getRefreshToken()) return null;
  const config = {
    headers: {
      "Content-Type": "application/json",
      RefreshToken: store.getRefreshToken()!,
    },
  };
  const params = {};
  const { data } = await request
    .post(api.refreshToken, params, config)
    .then((response) => {
      if (response.data.code) {
        // 返回含错误码，登录态失效
        console.log("refresh token error");
      } else {
        // 更新本地token
        if (response.data.token) {
          store.setToken(response.data.token);
        }
        // 当服务器返回RefreshToken时说明RefreshToken也进行了刷新
        if (response.data.RefreshToken) {
          store.setRefreshToken(response.data.RefreshToken);
        }
      }
      return response;
    });
  return data;
}

export { login, register, logout, getUserInfo, refreshToken };
export default { login, register, logout, getUserInfo, refreshToken };
