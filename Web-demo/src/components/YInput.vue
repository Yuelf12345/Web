<template>
  <el-input
    type="text"
    v-model="model"
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  modelValue: String,
});
const model = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);
</script>

<style></style>