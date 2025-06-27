<template>
  <div>
    当前登录用户为：{{ user }}-{{ permissionList }}
    <el-button @click="login('user')">user</el-button>
    <el-button @click="login('admin')">admin</el-button>
    <el-button @click="logout">logout</el-button>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import {useAuthStore} from "@/store/auth";
const authStore = useAuthStore();
const { user, permissionList } = storeToRefs(authStore);
console.log(user);
const login = (user: "user" | "admin") => {
  authStore.login(user);
};
const logout = () => {
  authStore.logout();
};
</script>
