<!--
 * @title: 资源管理
 * @Autor: li yu mo
 * @Date: 2025-04-23 09:19:17
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-29 09:52:50
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\resourcemanage\index.vue
-->
<template>
    <div class="resource">
      <div class="resource_header">
        <div
          class="header_item"
          v-for="(item) in btnlist"
          :key="item.id"
          :class="{ activeitem: currendBtn == item.id }"
          @click="selBtn(item.id)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="resource_content">
        <component :is="componentsMap[currendBtn]" />
      </div>
    </div>
  </template>
  
  <script setup>
  import minsection from './minsection/index.vue'
  import perspective from './perspective/index.vue'
  const btnlist = ref([
    {
      id: 'minsection',
      title: '中段管理',
    },
    {
      id: 'perspective',
      title: '视角管理',
    },
  ])
  const componentsMap = {
    minsection,
    perspective,
  }
  const currendBtn = ref('minsection')
  const selBtn = (itemId) => {
    currendBtn.value = itemId
  }
  </script>
  
  <style lang="scss" scoped>
  .resource {
    width: 100%;
    color: #fff;
    .resource_header {
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
  