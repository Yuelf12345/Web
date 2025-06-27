<template>
  <div>
    <el-button @click="start">start</el-button>
    <div v-for="item in list" :key="item">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref<number[]>([])
const datas = new Array(500000).fill(0).map((_, i) => i)
let index = 0

const start = () => {
  index = 0
  list.value = []
  performChunk()
  // for(; index < datas.length; index++){
  //   list.value.push(datas[index++])
  // }
}

const performChunk = () => {
  const _run = () => {
    requestIdleCallback((deadline: IdleDeadline) => {
      while (deadline.timeRemaining() > 0 && index < datas.length) {
        list.value.push(datas[index++])
      }
      if (index < datas.length) {
        _run()
      }
    })
  }
  _run()
}
</script>