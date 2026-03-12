<!--
 * @title: 视频监控模块
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-15 16:52:39
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\videoMonitoring\index.vue
-->
<template>
  <div class="videoMonitoring">
    <!-- 重点视频 -->
    <highVideo />
    <!-- 监控列表 -->
    <monitorList />
  </div>
</template>
  
<script setup>
import highVideo from './highVideo/index.vue' //重点视频
import monitorList from './monitorList/index.vue' //监控列表
</script>
  
<style lang="scss" scoped>
.videoMonitoring {
  width: 441px;
  color: #fff;
  margin-left: 10px;
  pointer-events: all;
  font-size: 14px;
}
</style>
  