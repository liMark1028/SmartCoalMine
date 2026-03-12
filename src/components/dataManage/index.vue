<template>
  <div class="box">
    <div class="gis-manage" v-if="modelValue">
      <div class="manage-header">
        <div class="header_title">数据管理</div>
        <div class="close" @click="close"></div>
      </div>
      <div class="manage-content">
        <div class="menu">
          <div
            class="menu_item"
            v-for="menu in menus"
            :key="menu.id"
            @click="selectMenu(menu.id)"
            :class="{ active: currentMenu === menu.id }"
          >
            {{ menu.name }}
          </div>
        </div>
        <div class="content">
          <component
            :is="componentsMap[currentMenu]"
            @edit="(item) => $emit('edit', currentMenu, item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, onMounted } from 'vue'
import VideoMonitor from './videomonitor/index.vue'
import DeviceManage from './devicemanages/index.vue'
import EmergencyRescue from './emergencyrescue/index.vue'
import ResourceManage from './resourcemanage/index.vue'
import SubstationManages from './substationmanages/index.vue'
import Dictionaries from './dictionaries/index.vue'

const props = defineProps({
  modelValue: Boolean,
  currentMenu: String,
})

const emit = defineEmits(['update:modelValue', 'update:current-menu', 'edit', 'close'])

const menus = [
  { id: 'video', name: '视频监控' },
  { id: 'device', name: '设备管理' },
  { id: 'emergency', name: '应急救援' },
  { id: 'resource', name: '资源管理' },
  { id: 'substation', name: '变电所管理' },
  { id: 'dictionaries', name: '字典管理' },
]

const componentsMap = {
  video: VideoMonitor,
  device: DeviceManage,
  emergency: EmergencyRescue,
  resource: ResourceManage,
  substation: SubstationManages,
  dictionaries: Dictionaries,
}

const selectMenu = (menuId) => {
  emit('update:current-menu', menuId)
}

const close = (item) => {
  emit('update:modelValue', false)
  emit('close', 'data')
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 108px;
  left: 346px;
  z-index: 1000;
  max-width: 400px;
  width: 30%;
}
.gis-manage {
  width: $mk-sjgl-width;
  height: $mk-sjgl-height;
  background: $mk-sjgl-bj no-repeat;
  background-size: 100% 100%;
  //   头部
  .manage-header {
    width: 100%;
    height: 64px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 80px;
    box-sizing: border-box;
    .header_title {
      font-size: 22px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(to bottom, #f5f8fb, #c5d9ec, #6a99c3, #1a609d);
      -webkit-background-clip: text;
      color: transparent;
    }
    .close {
      width: 21px;
      height: 21px;
      background: url('@/assets/image/datamanage/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: url('@/assets/image/datamanage/close_s.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  //   内容
  .manage-content {
    width: 100%;
    height: $tk-contnet-bg-height;
    // background: $tk-contnet-bg;
    // background-size: 100% 100%;
    display: flex;
    .menu {
      width: 190px;
      height: 750px;
      padding: 14px;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      .menu_item {
        width: 163px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        background: url('@/assets/image/datamanage/onebtn.png') no-repeat;
        background-size: 100% 100%;
        margin-bottom: 8px;
        &:hover {
          background: url('@/assets/image/datamanage/onebtn_s.png') no-repeat;
          background-size: 100% 100%;
          color: #ffac05;
        }
      }
      .active {
        width: 163px;
        height: 55px;
        line-height: 55px;
        background: url('@/assets/image/datamanage/onebtn_s.png') no-repeat;
        background-size: 100% 100%;
        color: #ffac05;
      }
    }
    .content {
      width: 80%;
      height: 730px;
      padding: 20px;
    }
  }
}
</style>
