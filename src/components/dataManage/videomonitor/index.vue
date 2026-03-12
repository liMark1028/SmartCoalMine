<!--
 * @Author: wangshiwei
 * @Date: 2025-04-16 10:06:13
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-30 19:47:37
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\videomonitor\index.vue
 * @Description: 视频监控
 * 
 *  
-->

<template>
  <div class="videomonitor">
    <div class="video_header">
      <div
        class="header_item"
        v-for="(item, i) in btnlist"
        :key="item.id"
        :class="{ activeitem: currendBtn == item.id }"
        @click="selBtn(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="video_content">
      <component :is="componentsMap[currendBtn]" />
    </div>
  </div>
</template>

<script setup>
import videolist from './videolist/index.vue'
import importantlist from './importantlist/index.vue'

const btnlist = ref([
  {
    id: 'video',
    title: '视频监控',
  },
  {
    id: 'importantlist',
    title: '重点区域视频',
  },
])
const componentsMap = {
  video: videolist,
  importantlist: importantlist,
}
const currendBtn = ref('video')
const selBtn = (itemId) => {
  currendBtn.value = itemId
}
</script>

<style lang="scss" scoped>
.videomonitor {
  width: 100%;
  .video_header {
    display: flex;
    .header_item {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url(('@/assets/image/emergency/menu.png')) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin: 0 10px 0 0;
      color: #fff;
      &:hover {
        background: url(('@/assets/image/emergency/menus.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
      }
      &.activeitem {
        background: url(('@/assets/image/emergency/menus.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
