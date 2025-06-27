<template>
    <el-container class="container">
        <el-aside width="200px" class="aside">
            <Aside />
        </el-aside>
        <el-main class="main">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import Aside from './aside.vue';
</script>

<style lang="scss" scoped>
.container{
    height: 100%;
    .aside{
        height: 100%;
    }
}
</style>