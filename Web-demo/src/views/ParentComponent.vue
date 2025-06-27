<template>
  <div>
    <!-- 绑定一个 -->
     name: {{ name }}
    <ChildComponent v-model="name" />
    <!-- 绑定多个 -->
    <!-- <p>title：{{ title }}</p>
    <p>content{{ content }}</p>
    <ChildComponent
      v-model:title="title"
      v-model:content="content"
    /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";
const name = ref("张三");
const title = ref("title");
const content = ref("content");
</script>
