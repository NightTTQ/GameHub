<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import userService from "@/services/userService";

onMounted(() => {
  doLogout();
  router.push({ name: "login" });
});

const doLogout = async () => {
  await userService.logout();
};
</script>
