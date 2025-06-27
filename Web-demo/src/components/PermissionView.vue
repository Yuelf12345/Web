<template>
  <div>
    <slot v-if="hasPermission" />
    <div v-else class="permission-denied">无权限访问该页面</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
const props = defineProps<{
  auth: string[];
}>();
const authStore = useAuthStore();
const hasPermission = computed(() => {
  if (!authStore.user) return false;
  return props.auth?.includes(authStore.user);
});
</script>

<style></style>
