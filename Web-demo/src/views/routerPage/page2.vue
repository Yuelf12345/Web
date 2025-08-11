<template>
  <div>
    page2
    <p>姓名: {{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
console.log(route.query);
const name = ref(route.query.name);
</script>

<style></style>
