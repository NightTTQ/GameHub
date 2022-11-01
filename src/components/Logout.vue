<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import { ElNotification } from "element-plus";
import router from "@/router";
import userService from "@/services/userService";

onMounted(() => {
  doLogout();
  router.push({ name: "login" });
});

const doLogout = async () => {
  const result = await userService.logout();
  if (result) {
    ElNotification({
      title: "Success",
      message: "Logout success",
      type: "success",
    });
  } else {
    ElNotification({
      title: "Error",
      message: "Logout failed",
      type: "error",
    });
  }
};
</script>
