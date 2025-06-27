<template>
  <div>test</div>
  <Button type="info" @click="clickHandler">打开弹窗</Button>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue';
import showMsg from '@/components/showMsg';
const clickHandler = () => {
  showMsg({
    title: '我是标题',
  }).then(() => {
    alert('点击了确定');
  }).catch(() => {
    alert('点击了取消');
  });
};
</script>