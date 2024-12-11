<template>
    <div>
        <el-menu router :default-active="onRoutes" class="el-menu-vertical-demo">
            <SideBarItem v-for="(router, i) in routers" :key=i :router=router :index="router.path">
            </SideBarItem>
        </el-menu>
    </div>
</template>
<script setup lang="ts">
import SideBarItem from "./SideBarItem.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
})

const routers = [{
    path: '/home',
    name: 'home',
    meta: { title: '首页' }
},
{
    path: '/about',
    name: 'about',
    meta: { title: '关于' }
},
{
    path: '/test',
    name: 'test',
    meta: { title: '测试' }
},
{
        path: '/pages',
        name: 'pages',
        meta: { title: '页面' },
        children: [
          {
            path: '/pages/page1',
            name: 'page1',
            meta: { title: '页面1' }
          },
          {
            path: '/pages/page2',
            name: 'page2',
            meta: { title: '页面2' }
          }
        ]
      }]
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 100%;
}
</style>