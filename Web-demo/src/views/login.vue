<template>
  <div>
    <el-button @click="handleLogin">登录</el-button>
    <el-button @click="handleRequest">请求</el-button>
    <h1>ChatGPT SSE Demo</h1>
    <input v-model="prompt" placeholder="请输入问题..." />
    <button @click="startStream">开始流式回答</button>
    <p ref="textRef" class="typewriter-text">{{ output }}</p>
    <span class="typewriter-cursor"></span>
  </div>
</template>
<script lang="ts" setup>
import { login, apiTest } from "@/api";
import { ElMessage } from "element-plus";
import { ref,onMounted } from "vue";
const prompt = ref("");
const output = ref("");
const eventSource = ref();
const isEnd =  localStorage.getItem('end') || '1'
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
    `http://localhost:3000/chat?sessionId=${123}`
  );
  eventSource.value.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    output.value = data.content;
    console.log(data.done)
    if(data.done){
      eventSource.value.close();
      localStorage.setItem('end','0')
    }else{
      localStorage.setItem('end','1');
    }
  };
  eventSource.value.onerror = (event: Event) => {
    console.log(event);
    localStorage.setItem('end','1')
    eventSource.value.close();
  };
};
// 页面刷新后自动调用startStream方法
onMounted(()=>{
  if(isEnd=='0') return
  startStream();
})

const handleLogin = async () => {
  const res = await login();
  localStorage.setItem("y_t", res.data.token);
  localStorage.setItem("y_r_t", res.data.refresh_token);
  ElMessage({
    message: res.data.msg,
    type: "success",
  });
};
const handleRequest = async () => {
  const res = await apiTest();
  console.log(res);
  ElMessage({
    message: res.data.msg,
  });
};
</script>
<style>
.typewriter-text {
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  display: inline;
}

.typewriter-cursor {
  display: inline-block;
  width: 10px;
  height: 20px;
  background-color: #333;
  margin-left: 2px;
  animation: blink 0.7s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
