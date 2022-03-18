import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      userInfo: {},
    };
  },
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    setUserInfo(userInfo: object) {
      this.userInfo = userInfo;
    },
  },
  persist: {
    key: "userInfo",
    storage: window.sessionStorage,
    paths: ["userInfo"],
  },
});
