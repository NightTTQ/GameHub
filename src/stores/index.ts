import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      isLogin: false,
      userInfo: {
        agent: null,
        avatar: null,
        createAt: null,
        createdAt: null,
        email: null,
        firstProvider: null,
        intro: null,
        lastIp: null,
        lastLogin: null,
        loginCount: null,
        nickname: null,
        phoneNumber: null,
        status: null,
        updatedAt: null,
        username: null,
        _id: null,
      },
    };
  },
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setLoginStatus(state: boolean) {
      this.isLogin = state;
    },
  },
  persist: {
    key: "store",
    storage: window.sessionStorage,
    paths: [],
  },
});
