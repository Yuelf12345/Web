<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group> -->
        <div class="drop">
          <el-dropdown>
            <el-button type="primary">
              Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Aside from './components/index.vue'
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;

  .drop {
    display: flex;
    align-content: center;
    gap: 10px;
  }

  img {
    height: 40px;
    width: 40px;
  }
}

.sideBar {
  width: auto !important;
  height: 88vh !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 100%;
}
</style>