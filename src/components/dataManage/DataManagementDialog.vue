<template>
    <div v-if="modelValue" class="dialog">
      <div class="header">
        <h2>数据管理</h2>
        <button @click="close">×</button>
      </div>
      <div class="body">
        <div class="menu">
          <button
            v-for="menu in menus"
            :key="menu.id"
            @click="selectMenu(menu.id)"
            :class="{ active: currentMenu === menu.id }"
          >
            {{ menu.name }}
          </button>
        </div>
        <div class="content">
          <component
            :is="componentsMap[currentMenu]"
            @edit="(item) => $emit('edit', currentMenu, item)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from 'vue';
  import VideoMonitor from './videomonitor/index.vue';
  import DeviceManage from './devicemanage/index.vue';
//   import EmergencyRescue from './EmergencyRescue.vue';
//   import ResourceManage from './ResourceManage.vue';
  
  const props = defineProps({
    modelValue: Boolean,
    currentMenu: String
  });
  
  const emit = defineEmits([
    'update:modelValue',
    'update:current-menu',
    'edit'
  ]);
  
  const menus = [
    { id: 'video', name: '视频监控' },
    { id: 'device', name: '设备管理' },
    { id: 'emergency', name: '应急救援' },
    { id: 'resource', name: '资源管理' },
  ];
  
  const componentsMap = {
    video: VideoMonitor,
    device: DeviceManage,
    // emergency: EmergencyRescue,
    // resource: ResourceManage,
  };
  
  const selectMenu = (menuId) => {
    emit('update:current-menu', menuId);
  };
  
  const close = () => {
    emit('update:modelValue', false);
  };
  </script>
  
  <style scoped>
  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 70vh;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  
  .menu {
    width: 200px;
    border-right: 1px solid #eee;
    padding: 10px;
    overflow-y: auto;
  }
  
  .menu button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border: none;
    background: #f5f5f5;
    cursor: pointer;
  }
  
  .menu button.active {
    background: #409eff;
    color: white;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  </style>