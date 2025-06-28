<template>
  <div>
    <h3>Watch</h3>
    <p>{{ count }}</p>
    <el-tag>{{ msg }}</el-tag>
    <el-button @click="watchAdd">+</el-button>
    <div>
      {{ data }}
    </div>
    <el-button @click="watchCreate">create创建</el-button>
    <el-button @click="watchStop">stop销毁</el-button>
    <el-button @click="watchPause">pause暂停</el-button>
    <el-button @click="watchResume">resume恢复</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const doAsyncWork = (num) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch(
    `https://jsonplaceholder.typicode.com/todos/${num}`,
    signal
  ).then((response) => response.json());
  return {
    response: promise,
    cancel: () => {
      console.log('执行取消请求');
      controller.abort()
    },
  };
};

const count = ref(0);
const data = ref();
const msg = ref("监听...");
const watchAdd = () => {
  console.log("watchAdd");
  count.value++;
};
let stopHandle: () => void;
let pauseHandle: () => void;
let resumeHandle: () => void;
const setupWatch = () => {
  const { stop, pause, resume } = watch(
    count,
    async (newValue, oldValue, onCleanup) => {
      const { response, cancel } = doAsyncWork(newValue);
      console.log("res", response, cancel);
      // cancel()
      onCleanup(cancel);
      data.value = await response;
      console.log("watch:", newValue, oldValue, onCleanup);
    }
  );
  stopHandle = stop;
  pauseHandle = pause;
  resumeHandle = resume;
};
setupWatch(); // 初始化
const watchCreate = () => {
  msg.value = "监听...";
  setupWatch();
};
const watchStop = () => {
  console.log("watchStop");
  msg.value = "销毁";
  stopHandle();
};
const watchPause = () => {
  console.log("watchPause");
  msg.value = "暂停";
  pauseHandle();
};
const watchResume = () => {
  console.log("watchResume");
  msg.value = "恢复";
  resumeHandle();
};
</script>

<style></style>
