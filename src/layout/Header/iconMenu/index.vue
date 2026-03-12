<!--
 * @Author: wangshiwei
 * @Date: 2025-04-10 16:28:51
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-16 13:45:24
 * @FilePath: \ahla-tkxt-web\src\layout\Header\iconMenu\index.vue
 * @Description: icon功能
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 10:15:20
                1、修改多个组件之间关闭事件
 *  
-->
<template>
  <div class="toolbar-container">
    <ul v-if="!isIndexRoute" class="toolbar-menu">
      <li
        v-for="item in combinedMenuItems"
        :key="item.id"
        :class="[
          'menu-item',
          `menu-item-${item.id}`,
          {
            active: item.active,
            'special-item': ['switch', 'admin'].includes(item.id),
          },
        ]"
        :title="item.title"
        @click="handleMenuItemClick(item)"
      ></li>
    </ul>

    <!-- 普通组件容器 -->
    <div class="content-wrapper">
      <div
        class="component-wraper"
        v-for="item in nonDataComponents"
        :key="item.id"
        v-show="item.active"
      >
        <component :is="item.component" class="dynamic-content" />
        <div class="close-button" @click.stop="CloseComponents(item.id)"></div>
      </div>
    </div>

    <!-- 数据管理专用容器 -->
    <!-- <div class="data-management-wrapper"  > -->
    <dataManage
      v-model:modelValue="showDataManagement"
      v-model:current-menu="currentMenu"
      @edit="handleEdit"
      @close="CloseComponents"
    >
    </dataManage>
    <!-- <component
        v-if="dataComponent?.active"
        :is="dataComponent.component"
        class="dynamic-content"
         :current-menu="currentMenu"
        @close="dataComponent?.active = false"
        @edit="handleEdit"
      /> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const mars3dMap = inject('mars3dMap')
// 组件导入
import gisAlarm from '@/components/alarmCenter/index.vue'
import layerControl from '@/components/layerControl/index.vue'
import viewPostions from '@/components/viewPostions/index.vue'
import surroundind from '@/components/surroundind/index.vue'
import dataManage from '@/components/dataManage/index.vue'

const route = useRoute()
const isIndexRoute = computed(() => route.path === '/index')

// 数据管理页面 默认
const currentMenu = ref('video')
const showDataManagement = ref(false)

// 通用菜单配置
const baseMenuItems = ref([
  {
    id: 'alarm',
    title: '告警信息',
    component: gisAlarm,
    active: false,
  },
  {
    id: 'layer',
    title: '图层控制',
    component: layerControl,
    active: false,
  },
  {
    id: 'view',
    title: '视角定位',
    component: viewPostions,
    active: false,
  },
  {
    id: 'facility',
    title: '周边设施',
    component: surroundind,
    active: false,
  },
  {
    id: 'data',
    title: '数据管理',
    component: dataManage,
    active: false,
    fixedPosition: true, // 添加定位标识
  },
])

// 特殊菜单项（独立状态管理）
const specialMenuItems = ref([
  {
    id: 'switch',
    title: '地上地下切换',
    component: null,
    active: false,
    handler: (flg) => handleGroundSwitch(flg),
  },
  {
    id: 'admin',
    title: '后台管理',
    component: null,
    active: false,
    handler: () => handleAdminPanel(),
  },
])

// 组合后的菜单项
const combinedMenuItems = computed(() => [...baseMenuItems.value, ...specialMenuItems.value])

// 非数据管理组件
const nonDataComponents = computed(() =>
  baseMenuItems.value.filter((item) => item.active && item.component && !item.fixedPosition),
)

// 数据管理组件
const dataComponent = computed(() => baseMenuItems.value.find((item) => item.fixedPosition))

// 处理菜单点击
const handleMenuItemClick = (item) => {
  if (item.handler) {
    item.active = !item.active
    item.handler(item.active)
  } else if (item.component) {
    // 普通组件切换逻辑
    //   if (!item.fixedPosition) {
    //     baseMenuItems.value.forEach(i => {
    //       if (!i.fixedPosition && i.id !== item.id) {
    //         i.active = false
    //       }
    //     })
    //   }
    item.active = !item.active
    if (item.id == 'data') {
      showDataManagement.value = !showDataManagement.value
    }
  }
}

// 地上地下切换处理
const handleGroundSwitch = (flg) => {
  console.log('地上地下状态切换')
  if (flg) {
  }

  // 这里可以添加状态管理逻辑或触发事件
}

// 后台管理处理
const handleAdminPanel = () => {
  console.log('打开后台管理')
  // 这里可以添加管理面板逻辑
}

// 关闭
const CloseComponents = (id) => {
  const item = baseMenuItems.value.find((i) => i.id === id)
  if (item) {
    item.active = false
  }
}

const handleEdit = (menu, item) => {
  currentMenu.value = menu
  // editingItem.value = item;
  showDataManagement.value = false
  // 关闭
  CloseComponents('data')
}
const handleEditClose = () => {
  // showEditDialog.value = false;
  showDataManagement.value = true
}
</script>

<style lang="scss" scoped>
.closeasd {
  color: #fff;
  font-size: 20px;
}
.toolbar-container {
  position: relative;
  width: 70%;
  height: 80px;
  top: 15px;
}

.toolbar-menu {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: space-between;
}

.menu-item {
  width: 36px;
  height: 35px;
  cursor: pointer;
  background-size: contain;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  &.special-item {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 6px;
      height: 6px;
      background: #00fffc;
      border-radius: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.2s;
    }

    &.active::after {
      opacity: 1;
    }
  }

  @each $id,
    $icon
      in (
        'alarm': 'gaojing',
        'layer': 'tuc',
        'view': 'shijiao',
        'facility': 'zb',
        'switch': 'dx',
        'data': 'dx',
        'admin': 'dx'
      )
  {
    &-#{$id} {
      background-image: url('@/assets/image/global/#{$icon}.png');

      &:hover,
      &.active {
        background-image: url('@/assets/image/global/#{$icon}_s.png');
      }
    }
  }
}

// 普通组件容器样式
.content-wrapper {
  position: fixed;
  left: 500px;
  top: 200px;
  z-index: 1000;
  max-width: 90vw;
}
.component-wraper {
  // position: relative;
  position: fixed;
  display: inline-block;
}
.close-button {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
  width: 17px;
  height: 18px;
  background: url('@/assets/image/global/alarm/close.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: url('@/assets/image/global/alarm/close.png') no-repeat;
    background-size: 100% 100%;
  }
}
// 数据管理专用样式
.data-management-wrapper {
  position: fixed;
  top: 108px;
  left: 346px;
  z-index: 1000;
  max-width: 400px;
  width: 30%;
}

.dynamic-content {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // position: fixed;
}
</style>
