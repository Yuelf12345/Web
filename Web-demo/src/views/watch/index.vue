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
import { ref, watch, onWatcherCleanup  } from "vue";

const doAsyncWork = (num) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch(`https://jsonplaceholder.typicode.com/todos/${num}`, {
    signal,
  }).then((response) => response.json());
  return {
    response: promise,
    cancel: () => {
      console.log("执行取消请求");
      controller.abort();
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
      // cancel() 这里立即调用cancel()导致请求被立即中止
      // onCleanup(cancel);
      onWatcherCleanup(cancel) // 3.5+
      data.value = await response;
      console.log("watch:", newValue, oldValue, onCleanup);
    },{
      // immediate: true, // 立即执行
      deep: true, // 监听对象内部属性变化
      /**
       * 刷新时机 默认值: pre
       * pre: 在下一次DOM更新前执行
       * post: 在下一个DOM更新后执行
       * sync: 同步执行
       */
      flush: 'pre' | 'post' | 'sync',
      onTrack: (changes) => { 
        console.log("track: 依赖被追踪", changes);
      },
      onTrigger: (changes, onCleanup) => { 
        console.log("trigger: 依赖触发变化", changes);
        // debugger
      }
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
