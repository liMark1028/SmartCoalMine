<!--
 * @Author: wangshiwei
 * @Date: 2025-04-10 16:28:51
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-14 16:38:28
 * @FilePath: \ahla-tkxt-web\src\layout\Header\menu\index.vue
 * @Description: 菜单列表
 * 
 *  
-->

<template>
  <div class="menu_class">
    <ul v-if="route.path !== '/index'">
      <li
        v-for="(item, i) in menuList"
        :key="i"
        @click="menuTab(item, i)"
        :class="{ isActiveClass: route.path == item.path }"
      >
        <div class="item">{{ item.label }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const menuList = ref([
  { label: '综合态势', path: '/comperhensive' },
  { label: '视频监控', path: '/videoMonitoring' },
  { label: '人车定位', path: '/humanAndVehicle' },
  { label: '智能设备', path: '/smartDevices' },
  { label: '生产进度', path: '/production' },
  { label: '应急救援', path: '/emergency' },
])
const isActive = ref('/comperhensive')

const menuTab = (item, i) => {
  isActive.value = item.path
  router.push({ path: item.path })
}
onMounted(() => {
  
})
</script>

<style lang="scss" scoped>
.menu_class {
  height: 79px;
  display: flex;
  align-items: flex-end;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 10px auto;
    width: 70%;
    li {
      width: 157px;
      height: 45px;
      list-style-type: none;
      line-height: 45px;
      font-size: 22px;
      color: rgba(219, 240, 255, 0.64);
      font-family: "YouSheBiaoTiHei";
      text-align: center;
      cursor: pointer;
      &:hover {
        width: 157px;
        height: 103px;
        background: $mk-glabal-itemactive;
        background-size: 100% 100%;
        .item {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 103px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .isActiveClass {
      width: 157px;
      height: 103px;
      background: $mk-glabal-itemactive;
      background-size: 100% 100%;
      .item {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 103px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
