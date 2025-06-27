<template>
  <Suspense>
    <AsyncSetup />
    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>
<script lang="ts">
import { defineAsyncComponent } from "vue";
const AsyncSetup = defineAsyncComponent(() => import("./asyncSetup.vue"));
export default {
  components: {
    AsyncSetup,
  },
};
</script>
