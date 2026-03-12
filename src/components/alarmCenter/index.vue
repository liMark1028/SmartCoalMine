<!--
 * @Author: wangshiwei
 * @Date: 2025-04-11 10:10:46
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 14:07:30
 * @FilePath: \ahla-tkxt-web\src\components\alarmCenter\index.vue
 * @Description: 告警信息
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 10:15:20
                1、修改告警信息背景样式
				2、添加级别分颜色展示
 *  
-->

<template>
  <div class="gis-alarm">
    <div class="alarm-header">
      <div class="alarm-title">告警信息</div>
      <!-- <div class="alarm-close" ></div> -->
    </div>
    <div class="alarm-content">
      <div class="tab-nav">
        <div
          class="item"
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="{ active: currentTab === tab.id }"
        >
          {{ tab.title }}
        </div>
      </div>
      <div class="tab-content">
        <transition name="fade" mode="out-in">
          <div v-if="currentTab === '0'" key="0">
            <untreated />
          </div>

          <div v-else-if="currentTab === '1'" key="1">
            <histroyData />
          </div>

          <div v-else-if="currentTab === '2'" key="2">
            <offlinedevice />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import untreated from './untreated/index.vue'
import histroyData from './histroyData/index.vue'
import offlinedevice from './offlinedevice/index.vue'
const tabs = [
  { id: '0', title: '未处置信息' },
  { id: '1', title: '历史告警' },
  { id: '2', title: '离线设备' },
]
const currentTab = ref('0')

</script>

<style lang="scss" scoped>
.gis-alarm {
  width: $tk-contnetbox-width;
  height: $tk-contnetbox-height;
  background: rgba(12, 51, 88, 0.8);
  // background: url('@/assets/image/bh/gj.png') no-repeat;
  background-size: 100% 100%;
  //   头部
  .alarm-header {
    width: $tk-contnet-bt-widht;
    height: $tk-contnet-bt-height;
    // background: $tk-contnet-bt;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .alarm-title {
      font-size: 16px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(
      to bottom,
      #f5f8fb,
      #c5d9ec,
      #6a99c3,
      #1a609d,
    );
    -webkit-background-clip: text;
    color: transparent;
    }
    .alarm-close {
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  //   内容
  .alarm-content {
    width: $tk-contnet-bt-widht;
    height: $tk-contnet-bg-height;
    // background: $tk-contnet-bg;
    background: rgba(2, 169, 240, 0.2);

    background-size: 100% 100%;
    .tab-nav {
      display: flex;
      gap: 20px;
      justify-content: center;
      padding: 5px 0;
      box-sizing: border-box;
      .item {
        width: 120px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: url(('@/assets/image/emergency/menu.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 0.514);
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
      }
    }

    .tab-nav .active {
      color: rgba(255, 255, 255, 1);
      width: 120px;
      height: 30px;
      background: url(('@/assets/image/emergency/menus.png')) no-repeat;
      background-size: 100% 100%;
    }

    .tab-content {
      // padding:0 20px;
      border-radius: 4px;
    }

    /* 过渡动画 */
    // .fade-enter-active,
    // .fade-leave-active {
    //   transition:
    //     opacity 0.3s,
    //     transform 0.3s;
    // }

    // .fade-enter-from {
    //   opacity: 0;
    //   transform: translateX(20px);
    // }

    // .fade-leave-to {
    //   opacity: 0;
    //   transform: translateX(-20px);
    // }
  }
}
</style>
