<template>
  <div class="wrapper">
    <el-card shadow="never">
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
            <el-button
              @click="handleLogin"
              color="#424242"
              style="width: 100%"
              :loading="isLoading"
              native-type="submit"
            >
              <span style="color: white">Login</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-top: 16px" justify="center">
        <el-col :span="4">
          <router-link :to="{ name: 'register' }"> Register </router-link>
        </el-col>
        <el-col :span="2">
          <el-divider direction="vertical" />
        </el-col>
        <el-col :span="4">
          <router-link :to="{ name: 'forgot' }">Forgot</router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import userService from "@/services/userService";
import store from "@/utils/store";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores";

const form = ref({
  username: "",
  password: "",
});

const user = useUserStore();
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  //清除登录信息
  user.setUserInfo({});
  user.setLoginStatus(false);
  //进行登录
  try {
    const res = await userService.login(
      form.value.username,
      form.value.password
    );
    if (res.code === 200) {
      // 服务器返回成功保存refreshToken、token和user
      store.setRefreshToken(res.data.refreshToken);
      store.setToken(res.data.token);
      user.setLoginStatus(true);
      user.setUserInfo(res.data.user);
      ElNotification({
        title: "Success",
        message: "Login success",
        type: "success",
      });
      isLoading.value = false;
      router.push({ name: "home" });
    } else {
      // 登录失败
      user.setUserInfo({});
      user.setLoginStatus(false);
      ElNotification({
        title: "Error",
        message: "Login Fail",
        type: "error",
      });
      isLoading.value = false;
    }
  } catch (error: any) {
    ElNotification({
      title: "Error",
      message: error.response.data.error.message,
      type: "error",
    });
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
  color: white;
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
</style>
