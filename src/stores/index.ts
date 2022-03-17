import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: {},
    token: "",
  }),
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    setUserInfo(userInfo: object) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
});
