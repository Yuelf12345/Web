<template>
    <div>
        <el-menu router class="menu">
            <template v-for="route in constantRoutes" :key="route.path">
                <AsideItem :route="route" :base-path="route.path" />
            </template>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import { constantRoutes } from '@/router'
import AsideItem from './asideItem.vue';
</script>
<style lang="scss" scoped>
.menu{
    height: 100%;
}
</style>