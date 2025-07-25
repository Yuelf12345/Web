<template>
    <div>
      {{arr}}
      <el-button @click="set">修改length</el-button>
       <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <div v-for="i in arr" :key="i" v-if="i">{{i}}</div>
    </div>
</template>
  
<script setup lang='ts'>
import {ref} from 'vue'
const arr = ref<Number[]>([1,2,3])
const set = () => {
  arr.value.length = 0
  console.log(arr.value);
}
</script>
  
<style>
  
</style>