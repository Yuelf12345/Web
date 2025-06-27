<template>
  <div>
    <div>ChildComponent</div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!-- 绑定多个 v-model可以这样实现 -->
    <!-- <input :value="title" @input="$emit('update:title', $event.target.value)" />
    <textarea v-model="content" /> -->
  </div>
</template>
<script setup lang="ts">
import { useAttrs } from "vue";
defineProps({
  modelValue: String, // v-model的值

  title: String,
});
// defineEmits(["update:modelValue"]);

const content = defineModel("content");
</script>
