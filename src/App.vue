<template>
    <router-view></router-view>
</template>

<script setup>
import { initDynamicRoutes } from '@/router'
 // 解决页面刷新动态路由丢失问题 
 initDynamicRoutes()
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  padding: 0;
}
html,body,#app,.app {
  
  height: 100%;
}
</style>