<template>
  <div class="mk-gis">
    <mars-map @map-loaded="mapLoadedChange"></mars-map>
    <div :class="[gismenban, 'gis-menban']"></div>
    <div class="mk-gis-content">
      <div class="gis-header">
        <mkHeader></mkHeader>
        <!-- 数据统计 -->
        <dataStatistics v-if="!isIndexRoute"></dataStatistics>
      </div>
      <div class="gis-layout">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import mkHeader from './Header/index.vue'
import dataStatistics from '@/components/dataStatistics/index.vue'
import marsMap from '@/components/marsMap/index.vue'
const route = useRoute()
const isIndexRoute = computed(() => route.path === '/index')
const map = ref(null)
// 通过注入依赖的方式注入map，方便全局使用
provide('mars3dMap', map)
const mapLoadedChange = (marsMap) => {
  map.value = marsMap
}

// 不同组件路由使用不同蒙版
const routeBhConfig = {
  '/index': 'gis-menban',
  '/comperhensive': 'zhts',
  '/videoMonitoring': 'spjk',
  '/humanAndVehicle': 'spjk',
  '/smartDevices': 'rcdwe',
  '/production': 'scjd',
  '/emergency': 'yjjy',
  default: 'gis-menban',
}
const gismenban = computed(() => {
  return routeBhConfig[route.path] || routeBhConfig.default
})
</script>
<style lang="scss" scoped>
.gis-menban {
  height: 100%;
  background: $mk-glabal-menban no-repeat;
  background-size: 100% 100%;
}
.mk-gis-content {
  width: 100%;
  height: 100%;
  background: $mk-glabal-bg no-repeat;
  background-size: 100% 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.zhts {
  height: 100%;
  background: $mk-glabal-menban-zhts no-repeat;
  background-size: 100% 100%;
}
.spjk {
  height: 100%;
  background: $mk-glabal-menban-spjk no-repeat;
  background-size: 100% 100%;
}
.rcdwe {
  height: 100%;
  background: $mk-glabal-menban-rcdwe no-repeat;
  background-size: 100% 100%;
}
.znsb {
  height: 100%;
  background: $mk-glabal-menban-znsb no-repeat;
  background-size: 100% 100%;
}
.scjd {
  height: 100%;
  background: $mk-glabal-menban-scjd no-repeat;
  background-size: 100% 100%;
}
.yjjy {
  height: 100%;
  background: $mk-glabal-menban-yjjy no-repeat;
  background-size: 100% 100%;
}
</style>
