<!--
 * @Author: wangshiwei
 * @Date: 2025-04-11 11:15:45
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-14 16:43:03
 * @FilePath: \ahla-tkxt-web\src\components\dataStatistics\index.vue
 * @Description: 全局数据统计
 * 
 *  
-->

<template>
  <div class="statistice">
    <div class="data-list">
      <div class="item_box">
        <div class="item_l">当日产量</div>
        <div class="item_r"><span class="num">96</span> 吨</div>
      </div>
      <div class="item_box">
        <div class="item_l">当日告警</div>
        <div class="item_r"><span class="num">3</span> 次</div>
      </div>
      <div class="item_box">
        <div class="item_l">井下人数</div>
        <div class="item_r"><span class="num">126</span> 人</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.statistice {
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  .data-list {
    width: 745px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    margin: 19px auto;
    .item_box {
      width: 197px;
      height: 36px;
      background: url('@/assets/image/global/center_bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      box-sizing: border-box;
      .item_l,
      .item_r {
        color: #fff;
        font-size: 16px;
        width: 90px;
        
        
      }
      .item_r {
        flex: 1;
        font-size: 14px;
        .num{
          font-size: 24px;
          font-family: "digital7";
        }
      }
    }
  }
}
</style>
