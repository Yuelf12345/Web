<template>
  <div>
    <div>minix</div>
    <el-button @click="trigger">trigger</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const minix = {
  created() {
    console.log("minix created");
  },
  methods: {
    trigger() {
      console.log("minix trigger");
    },
  },
};

export default defineComponent({
  mixins: [minix],
  created() {
    console.log("组件 created");
  },
  methods: {
    trigger() {
      console.log("组件 trigger");
    },
  },
});
</script>

<style></style>
