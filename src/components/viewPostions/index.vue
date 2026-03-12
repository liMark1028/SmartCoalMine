<!--
 * @Author: wangshiwei
 * @Date: 2025-04-11 13:39:00
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 14:04:03
 * @FilePath: \ahla-tkxt-web\src\components\viewPostions\index.vue
 * @Description: 视角定位
 * 
 *  
-->

<template>
  <div class="gis-view">
    <div class="view-header">
      <div class="view-title">视角定位</div>
    </div>
    <div class="view-content">
      <div v-for="item in list" :key="item.id" class="item">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
const list = ref([
  { id: 1, label: '矿区办公楼' },
  { id: 2, label: '主井提升处' },
  { id: 3, label: '1号主井' },
  { id: 5, label: '550中段' },
  { id: 4, label: '500中段' },
  { id: 7, label: '450中段' },
  { id: 6, label: '400中段' },
  { id: 8, label: '350中段' },
])
</script>

<style lang="scss" scoped>
.gis-view {
  width: $tk-contnetsjbox-width;
  height: $tk-contnetsjbox-height;
  background: rgba(12, 51, 88, 0.8);
  background-size: 100% 100%;
  //   头部
  .view-header {
    width: $tk-contnetsjbox-width;
    height: $tk-contnettcbox-sj-height;
    //   background: $tk-contnet-bt;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .view-title {
      font-size: 16px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(
      to bottom,
      #f5f8fb,
      #c5d9ec,
      #6a99c3,
      #1a609d,
      #1a609d,
    );
    -webkit-background-clip: text;
    color: transparent;
    }
  }
  //   内容
  .view-content {
    width: $tk-contnetsjbox-width;
    height: $tk-contnettcbox-sj-text-height;
    background: rgba(2, 169, 240, 0.2);
    background-size: 100% 100%;
    padding: 8px 12px;
    box-sizing: border-box;
    .item {
      color: #fff;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      padding: 0 10px;
      box-sizing: border-box;
      &:hover{
        background: url('@/assets/image/videoMonitoring/monitorList/packUp.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
