<template>
  <div>
    <div id="lottie" @click="play"></div>
  </div>
</template>

<script setup lang="ts">
import lottie from "lottie-web";
import animationJsonData from "../../public/spirit.json"; // json 文件
import { ref, onMounted } from "vue";

const lot = ref();
onMounted(() => {
  const lottieContainer = document.getElementById("lottie");
  if (lottieContainer) {
    lot.value = lottie.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: animationJsonData,
    });
  }
})

const play = () => {
  lot.value.play()
  setTimeout(() => {
    lot.value.stop()
  }, 3200);
}
</script>

<style>
#lottie {
  width: 300px;
  height: 300px;
}
</style>
