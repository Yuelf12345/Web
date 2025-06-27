<template>
  <div>
    Worker
    <div class="ball"></div>
  </div>
</template>
<script setup>

// let count = 0;
// for (let i = 0; i < 4000000000; i++) {
//   count++;
// }
//  console.log("长任务结束");

const worker = new Worker(new URL("./worker.js", import.meta.url));
worker.postMessage(4000000000);
worker.onmessage = (e) => {
  console.log("收到worker的消息", e.data);
};


</script>
<style>
@keyframes ball-animation {
  0% {
    top: 200px;
  }
  50% {
    top: 100px;
  }
  100% {
    top: 200px;
  }
}
.ball {
  width: 100px;
  height: 100px;
  top: 200px;
  left: 200px;
  background-color: red;
  position: absolute;
  border-radius: 50%;
  animation: ball-animation infinite 1s;
}
</style>
