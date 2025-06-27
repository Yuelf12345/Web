<template>
  <PermissionView :auth="['admin']"> 
    <div>admin</div>
    <el-button v-permission="['admin']">user</el-button>
    <el-button v-permission="['admin']">admin</el-button>
  </PermissionView>
</template>
  
<script setup lang='ts'>
import PermissionView from '@/components/PermissionView.vue'
</script>
  
<style>
  
</style>