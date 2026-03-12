<!--
 * @title: 人车定位模块
 * @Autor: li yu mo
 * @Date: 2025-04-11 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 15:13:21
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\humanAndVehicle\index.vue
-->

<template>
  <div class="humanAndVehicle">
    <!-- 人员车辆 -->
    <personnelVehicle />
    <!-- 人车列表 -->
    <mancar />
  </div>
</template>
  
<script setup>
import personnelVehicle from './personnelVehicle/index.vue' //人员车辆
import mancar from './mancar/index.vue' //人车列表
</script>
  
<style lang="scss" scoped>
.humanAndVehicle {
  color: #fff;
  margin-left: 10px;
  width: 441px;
  font-size: 14px;
  pointer-events: all;
}
</style>
  