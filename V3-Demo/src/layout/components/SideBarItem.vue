<template>
    <div :class="{ 'simple-mode': isCollapse }">
      <el-sub-menu
        :index="userRouter.path"
        v-if="userRouter?.children?.length"
      >
        <template #title>
          <el-icon v-if="userRouter?.meta?.icon">
            <component :is="userRouter?.meta?.icon"></component>
          </el-icon>
          <span>{{ userRouter?.meta?.title }}</span>
        </template>
        <SideBarItem
          v-for="(item, index) in userRouter?.children"
          :key="index"
          :router="item"
        ></SideBarItem>
      </el-sub-menu>
      <el-menu-item v-else :index="userRouter?.path">
          <el-icon v-if="userRouter?.meta?.icon">
            <component :is="userRouter?.meta?.icon"></component>
          </el-icon>
          <template #title>
          <span>{{ userRouter?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </div>
  </template>
     
  <script setup lang="ts">
  import { reactive, computed } from "vue";
  const props = defineProps({
    router: Object,
    isCollapse: Boolean,
  });
  let router = reactive<any>(props);
  let userRouter = reactive<any>({});
  userRouter = computed(() => {
    if (router.router?.path.length !== 0) {
      return router.router;
    }
  });
  </script>
  <style lang="less" scoped>
  // 解决isCollapse文字隐藏问题
  .simple-mode {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
  </style>