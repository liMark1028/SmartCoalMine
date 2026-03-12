<template>
  <div class="device">
    <!-- <div class="device_l">
      <cage />
      <belt />
    </div> -->
    <div class="device_l">
      <intelligentSubstation />
      <deviceAlarm />
    </div>
  </div>
  <!-- 传感器 -->
  <img src="@/assets/image/smartDevices/sensor.png" @click="sensor" class="sensorImg" />
  <div class="details" v-if="sersorDialog">
    <div class="header">
      <div class="title">设备信息</div>
      <div class="sensorClose" @click="sensorClose"></div>
    </div>
    <div class="content">
      <div>名称：-550米中段运输巷道温度传感器</div>
      <div>编码：9832897</div>
      <div>位置：-530米中段</div>
      <div>类别：温度传感器</div>
      <div>状态：正常</div>
      <div>采集时间：2025-02-11 11:22:13</div>
      <div>监测值：23°</div>
    </div>
    <div class="monitor">
      <div>当日监测</div>
      <img src="@/assets/image/smartDevices/monitor.png" style="width: 319px; margin-left: 11px" />
    </div>
  </div>
</template>

<script setup>
import cage from './cage/index.vue'
import belt from './beltInspection/index.vue'
import intelligentSubstation from './intelligentSubstation/index.vue'
import deviceAlarm from './deviceAlarm/index.vue'
// 传感器弹窗
const sersorDialog = ref(false)

const sensor = () => {
  sersorDialog.value = true
}
// 关闭弹窗
const sensorClose = () => {
  sersorDialog.value = false
}
</script>

<style lang="scss" scoped>
.device {
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
  font-size: 14px;
  color: #fff;
  .device_l,
  .device_r {
    width: 441px;
    height: 910px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: all;
  }
}
.sensorImg {
  position: absolute;
  left: 1000px;
  top: 700px;
  cursor: pointer;
  pointer-events: all;
}
.details {
  pointer-events: all;
  width: 341px;
  height: 476px;
  background: rgba(12, 51, 88, 0.8);
  position: absolute;
  left: 864px;
  top: 220px;
  .header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    .title {
      color: #fff;
      font-size: 16px;
      font-family: 'PUHUITI65';
    }
    .sensorClose {
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .content {
    width: 320px;
    height: 180px;
    background: rgba(64, 120, 149);
    margin-left: 10px;
    color: #fff;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
      margin-left: 5px;
    }
  }
  .monitor {
    div {
      color: #fff;
      font-size: 16px;
      font-family: 'PUHUITI65';
      margin: 10px;
    }
  }
}
</style>
