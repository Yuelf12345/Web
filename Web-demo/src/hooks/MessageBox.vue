<template>
  <div class="modal">
    <div class="box">
      <div class="text">{{ msg }}</div>
      <div class="actions">
        <button @click="emit('close')">确定</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

defineProps({
  msg: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss">
.modal {
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);

  .box {
    display: inline-block;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 4px;
    padding: 16px;

    .actions {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  }
}
</style>
