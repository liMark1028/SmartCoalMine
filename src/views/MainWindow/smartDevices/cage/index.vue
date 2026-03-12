<!--
 * @Author: li yu mo
 * @Date: 2025-04-11 15:31:18
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 17:01:43
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\smartDevices\cage\index.vue
 * @Description: 智能罐笼
 * 
 *  
-->

<template>
  <div class="cage">
    <div class="header"></div>
    <div class="content">
      <div class="cotent_l">
        <div><span></span><span>上层罐笼视频画面</span></div>
        <img src="@/assets/image/smartDevices/cage/monitoringOne.png" />
        <div style="margin-top: 15px"><span></span><span>下层罐笼视频画面</span></div>
        <img src="@/assets/image/smartDevices/cage/monitoringTwo.png" />
      </div>
      <div class="cotent_r">
        <div class="highLight bt">升到位</div>
        <div class="content_t">
          <span>名称：2号副井罐笼</span>
          <span>位置：-129米</span>
          <span>速度：4m/s</span>
          <span
            >状态：<span style="color: #29dc7d">上升中</span>
            <img src="@/assets/image/smartDevices/cage/goUp.png"
          /></span>
          <span>时间：2025-03-22 14:52:11</span>
          <span>负荷：550kg</span>
          <span>上层罐笼人数：8人</span>
          <span>下层罐笼人数：4人</span>
        </div>
        <div class="default bt">降到位</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cage {
  height: 433px;
  .header {
    height: 39px;
    background-image: url('@/assets/image/smartDevices/cage/subheading.png');
  }
  .content {
    height: 394px;
    background-image: url('@/assets/image/smartDevices/cage/content_bg.png');
    display: flex;
    .cotent_l {
      width: 216px;
      margin: 10px 7px 15px 18px;
      img {
        margin-top: 7px;
      }
      span:nth-child(1) {
        width: 2px;
        height: 12px;
        background-color: #3b97ff;
        display: inline-flex;
        margin-right: 6px;
      }
    }
    .cotent_r {
      margin-top: 35px;
      .bt {
        width: 65px;
        height: 23px;
        line-height: 23px;
        text-align: center;
      }
      .highLight {
        background-image: url('@/assets/image/smartDevices/cage/highLight.png');
      }
      .default {
        background-image: url('@/assets/image/smartDevices/cage/default.png');
      }
      .content_t {
        height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 29px 0 20px 8px;
        span {
          border-bottom: solid 1px #dbf0ff48;
        }
      }
    }
  }
}
</style>
