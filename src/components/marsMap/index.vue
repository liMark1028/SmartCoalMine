<template>
  <div id="mars3dContainer" class="mars3d-container"></div>
</template>

<script setup>
import 'mars3d-cesium/Build/Cesium/Widgets/widgets.css'
import 'mars3d/mars3d.css'
import * as mars3d from 'mars3d'
import configJson from '@/assets/mapConfig/config'
const emit = defineEmits(['mapLoaded'])

onMounted(() => {
  nextTick(() => {
    // 初始化地图
    const map = new mars3d.Map('mars3dContainer', configJson.map3d)

    // 开启全局调试模式
    window.mars3dMap = map
    emit('mapLoaded', map)
  })
})
</script>

<style lang="scss" scoped></style>
