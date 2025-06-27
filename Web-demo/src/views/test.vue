<template>
  <div>
    父: {{name}}
    <YInput v-model="name" />
  </div>
</template>
<script setup lang="ts">
import YInput from '@/components/YInput.vue'
import { ref } from 'vue'
const name = ref('张三')
</script>