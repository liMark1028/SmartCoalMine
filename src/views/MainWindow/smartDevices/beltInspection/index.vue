<template>
  <div class="belt-box">
    <div class="alarm-header"></div>
    <div class="alarm-content">
      <div class="tab-nav">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          :class="{ active: currentTab === tab.id }"
        >
          {{ tab.title }}
        </div>
      </div>
      <div class="tab-content">
        <transition name="fade" mode="out-in">
          <div v-if="currentTab === '0'" key="0" class="item">
            <img src="@/assets/image/smartDevices/belt/video1.png" alt="" />
            <div class="info">
              <div class="infotitle">基本信息</div>
              <div class="info_z">
                <div>速度：5m/s</div>
                <div>电量：70%</div>
                <div>状态：运行中</div>
              </div>
              <div class="info-two">
                <div class="infoaddress">位置：1号主井东侧</div>
                <div class="info-time">监测时间：2025-03-04 17:23:32</div>
              </div>
              <div class="info-task">自动巡视1号主井矿物运输，监测皮带是否断裂或矿物堆积</div>
            </div>
          </div>

          <div v-else-if="currentTab === '1'" key="1" class="item">
            <img src="@/assets/image/smartDevices/belt/video2.png" alt="" />
            <div class="info">
              <div class="infotitle">基本信息</div>
              <div class="info_z">
                <div>速度：6m/s</div>
                <div>电量：50%</div>
                <div>状态：运行中</div>
              </div>
              <div class="info-two">
                <div class="infoaddress">位置：2号主井东侧</div>
                <div class="info-time">监测时间：2025-03-04 17:23:32</div>
              </div>
              <div class="info-task">自动巡视2号主井矿物运输，监测皮带是否断裂或矿物堆积</div>
            </div>
          </div>

          <div v-else-if="currentTab === '2'" key="2" class="item">
            <img src="@/assets/image/smartDevices/belt/video3.png" alt="" />
            <div class="info">
              <div class="infotitle">基本信息</div>
              <div class="info_z">
                <div>速度：5m/s</div>
                <div>电量：70%</div>
                <div>状态：运行中</div>
              </div>
              <div class="info-two">
                <div class="infoaddress">位置：1号主井东侧200米处</div>
                <div class="info-time">监测时间：2025-03-04 17:23:32</div>
              </div>
              <div class="info-task">自动巡视1号主井矿物运输，监测皮带是否断裂或矿物堆积</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  { id: '0', title: '1号机器人' },
  { id: '1', title: '2号机器人' },
  { id: '2', title: '3号机器人' },
]
const currentTab = ref('0')
</script>

<style lang="scss" scoped>
.belt-box {
  width: $tk-smartdevice-pdxj-widht;
  height: 451px;
  font-size: 14px;
  .alarm-header {
    width: $tk-smartdevice-pdxj-widht;
    height: $tk-smartdevice-pdxj-bt-height;
    background: $tk-smartdevice-pdxj-bt;
    background-size: 100% 100%;
  }
  .alarm-content {
    width: $tk-smartdevice-pdxj-widht;
    height: $tk-smartdevice-pdxj-cont-height;
    background: $tk-smartdevice-pdxj-cont_bg;
    background-size: 100% 100%;
    padding-top: 5px;
    box-sizing: border-box;
    .tab-nav {
      width: 417px;
      height: 26px;
      background: url('@/assets/image/smartDevices/belt/sel_tab_bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 6px auto;
      div {
        width: 107px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
    }
    .active {
      width: 107px;
      background: url('@/assets/image/smartDevices/belt/smart_sel.png') no-repeat;
      background-size: 100% 100%;
    }
    .tab-content {
      width: 417px;
      height: 355px;
      background: url('@/assets/image/smartDevices/belt/info_bg.png') no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      display: flex;
      .item {
        margin: 0 auto;
      }
      img {
        width: 378px;
        height: 198px;
        margin: 12px 0px;
      }
      .info {
        line-height: 22px;
        .infotitle {
          font-size: 14px;
          color: #fff;
          height: 30px;
          line-height: 30px;
        }
        .info_z {
          color: #fff;
          display: flex;
          justify-content: space-between;
        }
        .info-two {
          color: #fff;
          display: flex;
          justify-content: space-between;
        }
        .info-task {
          color: #fff;
        }
      }
    }
  }
}
</style>
