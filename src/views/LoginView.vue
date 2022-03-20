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
            <el-button @click="handleLogin" color="#424242" style="width: 100%">
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
import { useUserStore } from "@/stores";

const form = ref({
  username: "",
  password: "",
});

const user = useUserStore();

const handleLogin = async () => {
  //清除登录信息
  user.setUserInfo({});
  user.setLoginStatus(false);
  //进行登录
  const loginRes = await userService.login(
    form.value.username,
    form.value.password
  );
  if (loginRes.success) {
    //服务器返回成功
    const localSessionKey = `light:GameHub:local-session`;
    //查询localSession是否存在
    if (localStorage.getItem(localSessionKey)) {
      //获取userInfo
      const userInfo = await userService.getUserInfo();
      //判断userInfo是否获取成功
      if (userInfo.success && userInfo.user) {
        //登录成功
        user.setUserInfo(userInfo.user);
        user.setLoginStatus(true);
        router.push({ name: "home" });
      } else {
        //登录态失效并清除localSession
        user.setUserInfo({});
        user.setLoginStatus(false);
        localStorage.removeItem(localSessionKey);
      }
    } else {
      //不存在则认为是未登录态
      user.setUserInfo({});
      user.setLoginStatus(false);
      console.log("No Session");
    }
  } else {
    console.log("login fail");
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
