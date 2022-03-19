import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useUserStore } from "@/stores";
import "video.js/dist/video-js.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

router.beforeEach((to, from, next) => {
  const user = useUserStore();

  if (user.isLogin) {
    //用户已登录不能进入登录和注册页
    if (to.name === "login" || to.name === "register") {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    //用户未登录不能进入需要登录的页面
    if (to.meta.isLogin) {
      next({ name: "login" });
    } else {
      next();
    }
  }
});

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
