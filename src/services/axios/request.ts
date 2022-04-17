import axios from "axios";
import store from "@/utils/store";
import router from "@/router/index";
import { refreshToken } from "@/services/userService";
import { ElNotification } from "element-plus";

// 控制变量
let isRefreshing = false;
let queue: Array<Function> = [];

// Axios实例
const instance = axios.create({
  baseURL: "https://qcnnig.api.cloudendpoint.cn",
  timeout: 300000,
  headers: {},
});

// 请求拦截器
instance.interceptors.request.use(
  (req) => {
    req.headers!["x-tt-session-v2"] = store.getSession()!;
    req.headers!["token"] = store.getToken()!;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // refreshToken方法不拦截
    if (res.config.url!.indexOf("/refreshToken") >= 0) {
      return res;
    }
    // 返回数据提示token过期，刷新token
    if (res.data.code == 1002) {
      const config = res.config;
      // token过期需要刷新
      console.log("token is expired");
      if (!isRefreshing) {
        // 当前未在刷新，开始刷新
        return refreshToken()
          .then((token) => {
            // 刷新token成功
            if (token.token) {
              // 刷新配置
              config.headers!["token"] = store.getToken()!;
              // 刷新完成开始对队列中请求进行重试
              queue.forEach((rq) => rq());
              queue = [];
              return instance(config);
            } else {
              // 刷新token失败，丢弃队列
              isRefreshing = false;
              queue = [];
              router.push({ name: "logout" });
              ElNotification({
                title: "Error",
                message: "Please login again",
                type: "error",
              });
              return res;
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (isRefreshing = false));
      } else {
        // 当前正在刷新，请求加入队列
        return new Promise((resolve) => {
          queue.push(() => {
            // 刷新配置
            config.headers!["token"] = store.getToken()!;
            resolve(instance(config));
          });
        });
      }
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
