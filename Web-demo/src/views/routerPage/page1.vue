<template>
    <div>
      page1
       <p>姓名: {{ name }}</p>
    </div>
</template>
  
<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
console.log(route.params)
const name = ref(route.params.name)
</script>
  
<style>
  
</style>