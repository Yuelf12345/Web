<template>
  <div>directive</div>
  <p v-highlight:[colorStyle]="'blue'">This sentence is important!</p>
  <button
    @click="colorStyle = colorStyle === 'color' ? 'backgroundColor' : 'color'"
  >
    {{ colorStyle }}
  </button>
</template>
<script setup lang="ts">
import { ref } from "vue";
const colorStyle = ref("color");
const vHighlight = {
  mounted: (el, binding, vnode) => {
    console.log("mounted", el);
    console.log("binding", binding);
    console.log("vnode", vnode);
    console.log("实例", binding.instance);
    el.style[binding.arg] = binding.value || "red";
  },
  updated: (el, binding) => {
    console.log("updated", el);
    console.log("binding", binding);
    el.style[binding.arg] = binding.value || "red";
  },
};
</script>
