<script>
import { ref, onMounted } from "vue";

export default {
  async setup() {
    const count = ref(0);
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(42);
        }, 2000);
      });
    };
    
    count.value = await fetchData();
    console.log(count.value); // 42

    // onMounted(async () => {
    //   count.value = await fetchData();
    //   console.log(count.value); // 42
    // });

    return { count }; // 当你在函数前加上 async 关键字时，该函数会自动返回一个 Promise。 所以这里实际返回 Promise 而非对象
  },
};
</script>

<template>
  <div>
    <button @click="count++">{{ count }}</button>
  </div>
</template>
