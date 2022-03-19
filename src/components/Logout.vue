<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores";

onMounted(() => {
  doLogout();
  router.push({ name: "login" });
});

const user = useUserStore();

const doLogout = () => {
  user.setLoginStatus(false);
  user.setUserInfo({});
};
</script>
