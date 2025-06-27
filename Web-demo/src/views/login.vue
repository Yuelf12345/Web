<template>
  <div>
    <el-button @click="handleLogin">登录</el-button>
    <el-button @click="handleRequest">请求</el-button>
    <h1>ChatGPT SSE Demo</h1>
    <input v-model="prompt" placeholder="请输入问题..." />
    <button @click="startStream">开始流式回答</button>
    <pre>{{ output }}</pre>
  </div>
</template>
<script lang="ts" setup>
import { login, apiTest } from "@/api";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const prompt = ref("");
const output = ref("");
const eventSource = ref();
const startStream = () => {
  if (!prompt.value) {
    ElMessage({
      message: "请输入问题",
      type: "warning",
    });
    return;
  }
  output.value = "";
  if (eventSource.value) {
    eventSource.value.close();
  }
  eventSource.value = new EventSource(
    `http://localhost:3000/chat?prompt=${prompt.value}`
  );
  eventSource.value.onmessage = (event: MessageEvent) => {
    output.value = event.data;
  };
  eventSource.value.onerror = (event: Event) => {
    console.log(event);
    eventSource.value.close();
  };
};
const handleLogin = async () => {
  const res = await login();
  localStorage.setItem("y_t", res.data.token);
  localStorage.setItem("y_r_t", res.data.refresh_token);
  ElMessage({
    message: res.msg,
    type: "success",
  });
};
const handleRequest = async () => {
  const res = await apiTest();
  console.log(res);
  ElMessage({
    message: res.msg,
  });
};
</script>
