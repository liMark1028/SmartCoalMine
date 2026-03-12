<!--
 * @title: 人员车辆定位
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 15:13:09
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\humanAndVehicle\personnelVehicle\index.vue
-->
<template>
  <div class="personnelVehicle">
    <div class="header"></div>
    <div class="content">
      <div class="header_content">
        <span>总人数：<span style="color: #33c7f8; font-size: 18px">100</span> 人</span>
        <span>井下车辆：<span style="color: #ecc733; font-size: 18px">67</span>辆</span>
        <span>值班领导：<span style="color: greenyellow; font-size: 18px">刘志德</span></span>
      </div>
      <div class="header_list">
        <span>中段数</span>
        <span>人员数量</span>
        <span>车辆数量</span>
      </div>
      <div v-for="(item, index) in list" :key="index" class="list">
        <span style="margin-left: -15px">{{ item.mesomere }}</span>
        <span style="margin-left: -15px">{{ item.staff }}</span>
        <span>{{ item.car }}</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
// 模拟数据
const list = [
  { mesomere: '-230段', staff: '32人', car: '6辆' },
  { mesomere: '-290段', staff: '6人', car: '8辆' },
  { mesomere: '-350段', staff: '12人', car: '16辆' },
  { mesomere: '-410段', staff: '15人', car: '18辆' },
  { mesomere: '-470段', staff: '14人', car: '12辆' },
  { mesomere: '-530段', staff: '21人', car: '7辆' },
]
</script>
  
<style lang="scss" scoped>
.personnelVehicle {
  .header {
    height: 39px;
    background-image: url('@/assets/image/humanAndVehicle/personnelVehicle/subheading.png');
  }
  .content {
    height: 244px;
    background-image: url('@/assets/image/humanAndVehicle/personnelVehicle/bcakground-content.png');
    .header_content {
      height: 30px;
      font-family: AlibabaPuHuiTi_2_55_Regular;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .header_list {
      width: 408px;
      height: 31px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-image: url('@/assets/image/humanAndVehicle/personnelVehicle/header.png');
      margin-left: 16px;
    }
    .list {
      width: 407px;
      height: 24px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-image: url('@/assets/image/humanAndVehicle/personnelVehicle/list.png');
      margin-left: 16px;
      margin-top: 5px;
    }
  }
}
</style>
  