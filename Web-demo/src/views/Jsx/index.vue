<template>
  <Com :val="100" :a="1" ref="ComRef">
    <div>插槽</div>
    <template #slot1>
      <div>插槽1</div>
    </template>
  </Com>
</template>

<script setup lang="ts">
import Com from "./Com.tsx";
import { ref, onMounted } from "vue";
const ComRef = ref<InstanceType<typeof Com>>();
onMounted(() => {
  console.log(ComRef.value!);
});
</script>
