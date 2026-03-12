<!--
 * @Author: wangshiwei
 * @Date: 2025-04-16 10:06:39
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-29 10:29:10
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\devicemanages\index.vue
 * @Description: 设备管理
 * @Date 2025年4月29日10:28:38
 * @Description1、封装数据设备管理页面表格、弹窗组件
-->

<template>
  <div class="devicemanage">
    <div class="video_header">
      <div class="header_item" v-for="(item, i) in btnlist" :key="item.id" :class="{ activeitem: currendBtn == item.id }" @click="selBtn(item.id)">
        {{ item.title }}
      </div>
    </div>
    <div class="video_content">
      <component :is="componentsMap[currendBtn]" :config="configJson[currendBtn]" />
    </div>
  </div>
</template>

<script setup>
import  GenericDeviceManage from './genericDeviceManage.vue'
import sensors from './json/sensor.js'
import phones from './json/phone.js'
import substations from './json/substation.js'
import fans from './json/fan.js'
import ventlines from './json/ventline.js'
import positionsubs from './json/positionsub.js'
import valve from './json/valve.js'
import iaops from './json/iaop.js'

const btnlist = ref([
  {
    id: 'sensor',
    title: '传感器',
  },
  {
    id: 'phone',
    title: '通讯电话',
  },
  {
    id: 'substation',
    title: '广播分站',
  },
  {
    id: 'fan',
    title: '风机设备',
  },
  {
    id: 'ventline',
    title: '通风管路',
  },
  {
    id: 'positionsub',
    title: '定位分站',
  },
  {
    id: 'valve',
    title: '阀门',
  },
  {
    id: 'iaop',
    title: '进排水管道',
  },
])
// 组件
const componentsMap = {
    sensor:GenericDeviceManage,
    phone:GenericDeviceManage,
    substation:GenericDeviceManage,
    fan:GenericDeviceManage,
    ventline:GenericDeviceManage,
    positionsub:GenericDeviceManage,
    valve:GenericDeviceManage,
    iaop:GenericDeviceManage,
}
// json
const configJson = {
    sensor:sensors,
    phone:phones,
    substation:substations,
    fan:fans,
    ventline:ventlines,
    positionsub:positionsubs,
    valve:valve,
    iaop:iaops,
}
const currendBtn = ref('sensor')
const selBtn = (itemId) => {
  currendBtn.value = itemId
}
</script>

<style lang="scss" scoped>
.devicemanage {
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
