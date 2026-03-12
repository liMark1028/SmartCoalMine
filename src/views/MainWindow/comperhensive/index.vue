<!--
 * @title: 综合态势
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-29 11:18:24
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\comperhensive\index.vue
-->
<template>
  <div class="comperhensive">
    <div class="comperhensive_l">
      <!-- 矿区概况 -->
      <overview />
      <!-- 智能变电站 -->
      <belt />
      <!-- 设备统计 -->
      <equipment />
    </div>
    <div class="comperhensive_r">
      <!-- 人员车辆 -->
      <personnel />
      <!-- 重点区域视频 -->
      <highVideo style="margin: 10px 0" />
      <!-- 告警趋势 -->
      <report />
    </div>
  </div>
</template>

<script setup>
import overview from '../production/overview/index.vue'
import belt from './belt/index.vue'
import equipment from './equipment/index.vue'
import personnel from '../humanAndVehicle/personnelVehicle/index.vue'
import highVideo from '../videoMonitoring/highVideo/index.vue'
import report from './report/index.vue'
</script>

<style lang="scss" scoped>
.comperhensive {
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  .comperhensive_l,
  .comperhensive_r {
    width: 441px;
    pointer-events: all;
    font-size: 14px;
  }
}
</style>
