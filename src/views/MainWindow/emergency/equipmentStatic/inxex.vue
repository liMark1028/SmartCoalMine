<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 10:16:17
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-14 14:26:25
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\emergency\equipmentStatic\inxex.vue
 * @Description: 装备设施统计
 * 
 *  
-->

<template>
  <div class="statictices">
    <div class="static_header"></div>
    <div class="static_content">
      <div
        class="content"
        :class="{ contentactive: selItem.includes(item.id) }"
        v-for="item in list"
        :key="item.id"
        @click="toggleSel(item.id)"
      >
        <div class="content_title">{{ item.label }}</div>
        <div class="content_num">{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const list = ref([
  { id: 1, label: '压风自救装置', num: 20 },
  { id: 2, label: '供水施救装置', num: 230 },
  { id: 3, label: '避难硐室', num: 254 },
])
// 选中项
const selItem = ref([])
// 选中项方法
const toggleSel = (itemId) => {
  const index = selItem.value.indexOf(itemId)
  if (index > -1) {
    selItem.value.splice(index, 1)
  } else {
    selItem.value.push(itemId)
  }
}
</script>

<style lang="scss" scoped>
.statictices {
  width: 441px;
  .static_header {
    width: 441px;
    height: 39px;
    background: url('@/assets/image/emergency/ener_bt.png') no-repeat;
    background-size: 100% 100%;
  }
  .static_content {
    width: 441px;
    height: 174px;
    background: url('@/assets/image/emergency/eq_bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .content {
      width: 133px;
      height: 123px;
      background: url('@/assets/image/emergency/eq.png') no-repeat;
      background-size: 100% 100%;
      padding: 4px 0 44px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: url('@/assets/image/emergency/eq_s.png') no-repeat;
        background-size: 100% 100%;
      }
      .content_title {
        font-size: 14px;
        color: #fff;
      }
      .content_num {
        font-size: 31px;
        color: #fff;
      }
    }
    // 高亮
    .contentactive {
      width: 133px;
      height: 123px;
      background: url('@/assets/image/emergency/eq_s.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
