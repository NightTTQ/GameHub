import axios from "axios";
import store from "@/utils/store";

// Axios实例
const instance = axios.create({
  baseURL: "https://qcnnig.api.cloudendpoint.cn",
  timeout: 300000,
  headers: {},
});

// 请求拦截器
instance.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

function getLocalToken() {
  return store.getToken();
}

export default instance;
