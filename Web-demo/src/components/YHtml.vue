<template>
  <div ref="htmlContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

// 定义一个 prop 来接收 HTML 字符串
const props = defineProps<{
  content: string;
}>();

// 获取对 DOM 元素的引用
const htmlContainer = ref<HTMLElement | null>(null);

// 使用 DOMParser 解析 HTML 字符串并插入到容器中
const renderHtml = () => {
  if (htmlContainer.value) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(props.content, "text/html");
    const body = doc.body;

    // 清空容器
    htmlContainer.value.innerHTML = "";

    // 将解析后的 HTML 内容插入到容器中
    Array.from(body.childNodes).forEach((node) => {
      htmlContainer.value?.appendChild(node);
    });
  }
};

// 在组件挂载时渲染 HTML
onMounted(() => {
  renderHtml();
});

// 监听 content 的变化，重新渲染 HTML
watch(() => props.content, renderHtml);
</script>

<style scoped>
/* 添加样式 */
</style>
