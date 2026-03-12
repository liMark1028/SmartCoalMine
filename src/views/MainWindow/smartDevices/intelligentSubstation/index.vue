<!--
 * @title: 智能变电站
 * @Autor: li yu mo
 * @Date: 2025-04-11 17:36:06
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 17:51:12
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\smartDevices\intelligentSubstation\index.vue
-->

<template>
  <div class="substation">
    <div class="header"></div>
    <div class="content">
      <div class="bt">
        <div
          v-for="station in substations"
          :key="station.id"
          :class="['btO', { active: currentStation === station.id }]"
          @click="selectStation(station.id)"
        >
          {{ station.name }}
        </div>
      </div>
      <div class="img">
        <img :src="currentData.image" />
      </div>
      <div class="character">
        <div>基本信息:</div>
        <div class="temperatureS">
          <div>
            环境温度：<span style="color: #33c7f8">{{ currentData.temperature }}℃</span>
          </div>
          <div>
            高压柜内节点温度：<span style="color: #ff8929">{{ currentData.cabinetTemp }}℃</span>
          </div>
          <div>
            电气节点温度：<span style="color: #22de4e">{{ currentData.electricTemp }}℃</span>
          </div>
        </div>
        <div class="temperatureS">
          <div>
            环境湿度：<span style="color: #f43146">{{ currentData.humidity }}RH</span>
          </div>
          <div>
            开关在线数：<span style="color: #f15a22">{{ currentData.onlineSwitches }}个</span>
          </div>
          <div>
            开关离线数：<span style="color: #808080">{{ currentData.offlineSwitches }}个</span>
          </div>
        </div>
        <div>
          变电柜数量：<span style="color: #00ae9d">{{ currentData.cabinetCount }}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 变电站数据
const substations = ref([
  {
    id: 1,
    name: '1号变电站',
    image: new URL(
      '@/assets/image/smartDevices/intelligentSubstation/video_bg.png',
      import.meta.url
    ).href,
    temperature: 36,
    cabinetTemp: 24,
    electricTemp: 23,
    humidity: 60,
    onlineSwitches: 14,
    offlineSwitches: 6,
    cabinetCount: 12,
  },
  {
    id: 2,
    name: '2号变电站',
    image: new URL(
      '@/assets/image/smartDevices/intelligentSubstation/video_bg.png',
      import.meta.url
    ).href,
    temperature: 32,
    cabinetTemp: 22,
    electricTemp: 21,
    humidity: 55,
    onlineSwitches: 16,
    offlineSwitches: 4,
    cabinetCount: 10,
  },
])

const currentStation = ref(1)

// 当前选中的变电站数据
const currentData = computed(() => {
  return substations.value.find((station) => station.id === currentStation.value)
})

const selectStation = (stationId) => {
  currentStation.value = stationId
}
</script>

<style lang="scss" scoped>
.substation {
  height: 433px;
  z-index: 2;
  .header {
    height: 39px;
    background-image: url('@/assets/image/smartDevices/intelligentSubstation/subheading.png');
  }
  .content {
    height: 394px;
    background-image: url('@/assets/image/smartDevices/intelligentSubstation/content_bg.png');

    .bt {
      display: flex;
      justify-content: space-evenly;
      div {
        width: 84px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        margin: 15px 0;
        background-image: url('@/assets/image/smartDevices/intelligentSubstation/unselected.png');
        color: #d2f9ff;
        cursor: pointer;
        transition: all 0.3s;

        &.active {
          background-image: url('@/assets/image/smartDevices/intelligentSubstation/selected.png');
          color: #00f6ff;
          font-weight: bold;
        }
      }
    }

    .img {
      text-align: center;
      margin-bottom: 20px;
      img {
        max-width: 90%;
        height: auto;
      }
    }
    .character {
      height: 106px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 17px;
      margin-right: 17px;
      color: #d2f9ff;
      .temperatureS {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
