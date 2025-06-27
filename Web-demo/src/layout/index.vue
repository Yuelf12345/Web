<template>
    <div>
        <el-container class="layout">
            <el-header>
                <Header></Header>
            </el-header>
            <el-main class="main">
                <AppMain></AppMain>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Footer from './components/footer.vue'
// @ts-ignore
import AppMain from './components/appmain.vue'

</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;
    width: 100vw;
}
</style>