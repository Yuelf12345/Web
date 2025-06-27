<template>
  <div>
    <el-switch
      v-model="value"
      :active-value="2"
      :inactive-value="1"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="handleChange"
    >
    </el-switch>
    <img :src="imgSrc" alt="" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// import a   from "../assets/1.jpg";
// console.log("a", a);

const value = ref(1);
const imgSrc = ref("");
const handleChange = async (val: any) => {
  console.log(val);

  // const src = new URL(`../assets/${val}.jpg`, import.meta.url);
  // console.log("src", src);
  // imgSrc.value = src.href;

  // import("../assets/" + val + ".jpg").then((res) => {
  //   console.log("res", res);
  //   imgSrc.value = res.default;
  // });

  const srcs = import.meta.glob("../assets/*.jpg", { as: "url" });
  console.log("srcs", srcs);
  // 构建对应的路径 key（注意文件名匹配要完全一致）
  const pathKey = `../assets/${val}.jpg`;
  try {
    const url = await srcs[pathKey]();
    imgSrc.value = url;
  } catch {
    imgSrc.value = ""; // 加载默认图
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 1200px;
  height: 600px;
}
</style>
