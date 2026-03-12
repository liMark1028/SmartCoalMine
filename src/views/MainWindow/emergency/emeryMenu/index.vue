<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 11:44:47
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-14 16:13:09
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\emergency\emeryMenu\index.vue
 * @Description: 应急救援--避灾路线、应急演练
 * 
 *  
-->

<template>
  <div class="emerymenu">
    <div class="emerymenu_content">
      <div
        class="listmenu"
        :class="{ listmenuActive: isActive == item.id }"
        v-for="(item, i) in menulist"
        :key="item.id"
        @click="tabClick(item, item.id)"
      >
        {{ item.label }}
      </div>
      <!-- 二级切换按钮 -->
      <div class="listtab" v-if="isActive == 1">
        <div
          class="item"
          :class="{ tabactive: isbizaiActive == item.id }"
          v-for="item in bizailist"
          :key="item.id"
          @click="bizaiClick(item, item.id)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="listtab2" v-else-if="isActive == 2">
        <div
          class="item"
          :class="{ tabactive: isyingjiActive == item.id }"
          v-for="item in yingjilist"
          :key="item.id"
          @click="yingjiClick(item, item.id)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 一级菜单
const menulist = ref([
  { id: '1', label: '避灾路线' },
  { id: '2', label: '应急演练' },
])
// 二级菜单
const bizailist = ref([
  { id: '1', label: '火灾路线' },
  { id: '2', label: '水灾路线' },
])
// 二级菜单
const yingjilist = ref([
  { id: '1', label: '火灾模拟' },
  { id: '2', label: '火灾模拟' },
])
// 一级高亮
const isActive = ref(-1)
// 避灾按钮高亮
const isbizaiActive = ref(1)
// 应急按钮高亮
const isyingjiActive = ref(1)
// 一级切换
const tabClick = (item, i) => {
  if (i != isActive.value) {
    isActive.value = i
    console.log(' isActive.value ',isActive.value );
    
  } else {
    isActive.value = -1
  }
}
// 避灾切换
const bizaiClick = (item, i) => {
  if (i != isbizaiActive.value) {
    isbizaiActive.value = i
    console.log('isbizaiActive.value',isbizaiActive.value);
    
  } else {
    isbizaiActive.value =-1
  }
}
// 应急切换
const yingjiClick = (item, i) => {
  if (i != isyingjiActive.value) {
    isyingjiActive.value = i
  } else {
    isyingjiActive.value =-1
  }
}
</script>

<style lang="scss" scoped>
.emerymenu {
  pointer-events: none;
  position: fixed;
  bottom: 58px;
  left: 50%;
  transform: translate(-50%);
  .emerymenu_content {
    pointer-events: all;
    width: 459px;
    display: flex;
    justify-content: space-between;
    .listmenu {
      width: 193px;
      height: 57px;
      background: url(('@/assets/image/emergency/menu.png')) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 57px;
      color: rgba(255, 255, 255, 0.514);
      font-size: 24px;
      cursor: pointer;
      &:hover {
        background: url(('@/assets/image/emergency/menus.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
      }
    }
    .listmenuActive {
      width: 193px;
      height: 57px;
      background: url(('@/assets/image/emergency/menus.png')) no-repeat;
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 1);
    }
    .listtab,
    .listtab2 {
      position: absolute;
      top: -88px;
      display: flex;
      width: 193px;
      justify-content: space-around;
      .item {
        width: 88px;
        height: 84px;
        background: url(('@/assets/image/emergency/erjisel.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        padding: 25px;
        box-sizing: border-box;
        white-space: pre-wrap;
        text-align: center;
        cursor: pointer;
        &:hover{
          background: url(('@/assets/image/emergency/erjisel_s.png')) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .listtab {
      left: 0;
    }
    .listtab2 {
      right: 0;
    }
    .listtab .tabactive {
      width: 88px;
      height: 84px;
      background: url(('@/assets/image/emergency/erjisel_s.png')) no-repeat;
      background-size: 100% 100%;
      // color: #fff;
      // font-size: 14px;
      // padding: 25px;
      // box-sizing: border-box;
      // white-space: pre-wrap;
      // text-align: center;
      cursor: pointer;
    }
  }
}
</style>
