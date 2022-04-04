<template>
  <div class="wrapper">
    <el-card>
      <el-form label-position="top">
        <el-row>
          <el-col>
            <h1>GameHub</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="Username">
              <el-input :maxlength="30" v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="Password">
              <el-input
                :maxlength="30"
                v-model="form.password"
                type="password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="Check Password">
              <el-input
                :maxlength="30"
                v-model="form.check"
                type="password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              @click="handleRegister"
              color="#424242"
              style="width: 100%"
              :loading="isLoading"
            >
              <span style="color: white">Register</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { ElNotification } from "element-plus";
import userService from "@/services/userService";
import { useUserStore } from "@/stores";
import store from "@/utils/store";

const user = useUserStore();
const isLoading = ref(false);

const form = ref({
  username: "",
  password: "",
  check: "",
});

const handleRegister = async () => {
  //表单验证
  if (!form.value.username) {
    ElNotification({
      title: "Error",
      message: "Please input your username",
      type: "error",
    });
    return;
  }
  if (!form.value.password) {
    ElNotification({
      title: "Error",
      message: "Please input your password",
      type: "error",
    });
    return;
  }
  if (form.value.check != form.value.password) {
    ElNotification({
      title: "Error",
      message: "Passwords entered do not match",
      type: "error",
    });
    return;
  }

  isLoading.value = true;
  //进行注册
  const res = await userService.register(
    form.value.username,
    form.value.password
  );
  if (res.success) {
    //注册成功自动登录并跳转至首页
    store.setRefreshToken(res.RefreshToken);
    store.setToken(res.TOKEN);
    user.setUserInfo(res.userInfo.userInfo);
    user.setLoginStatus(true);
    ElNotification({
      title: "Success",
      message: "Register success",
      type: "success",
    });
    isLoading.value = false;
    router.push({ name: "home" });
  } else {
    //注册失败弹出失败详细信息并删除localSession
    ElNotification({
      title: "Error",
      message: res.message,
      type: "error",
    });
    store.removeSession();
    isLoading.value = false;
  }
};
</script>
<style scoped>
.wrapper {
  max-width: 450px;
  top: calc(50% - 225px);
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
}
.el-card {
  width: 100%;
  background-color: rgba(42, 42, 42, 0);
  border: none;
}
a {
  color: inherit;
  opacity: 0.6;
  text-decoration: none;
  transition: 0.2s;
}
a:hover {
  opacity: 1;
}
a:visited {
  color: inherit;
}
* {
  --el-border-color-lighter: none;
}
</style>
