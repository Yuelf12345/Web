<template>
  <PermissionView :auth="['admin','user']"> 
    <div>user</div>
    <el-button v-permission="['admin','user']">user</el-button>
    <el-button v-permission="['admin']">admin</el-button>
  </PermissionView>
</template>
  
<script setup lang='ts'>
import PermissionView from '@/components/PermissionView.vue'
</script>
  
<style>
  
</style>