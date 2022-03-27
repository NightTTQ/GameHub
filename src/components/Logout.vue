<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import store from "@/utils/store";
import { useUserStore } from "@/stores";
import userService from "@/services/userService";

onMounted(() => {
  doLogout();
  router.push({ name: "login" });
});

const user = useUserStore();

const doLogout = async () => {
  await userService.logout();
  store.removeRefreshToken();
  store.removeToken();
  user.setLoginStatus(false);
  user.setUserInfo({});
};
</script>
