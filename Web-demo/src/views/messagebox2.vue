<template>
  <div>
    <button @click="showModal">弹窗</button>
  </div>
</template>
<script setup lang="ts">
import useModal from '@/hooks/useModal.ts'
const showModal = () => {
  useModal('弹窗标题')
}
</script>