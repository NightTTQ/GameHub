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

const form = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  console.log(form.value);
};
</script>
<style scoped>
.wrapper {
  max-width: 450px;
  top: calc(50% - 182.5px);
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
