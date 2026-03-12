<!--
 * @title: 设备统计
 * @Autor: li yu mo
 * @Date: 2025-04-14 10:15:28
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 15:06:40
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\comperhensive\equipment\index.vue
-->
<template>
  <div class="equipment">
    <div class="header"></div>

    <div class="content">
      <!-- 循环遍历设备数据，渲染每种设备类型 -->
      <div
        v-for="(item, index) in equipmentData"
        :key="item.type"
        class="eq_svs"
        :class="`eq_svs_${index + 1}`"
      >
        <!-- 设备数量统计区域 -->
        <div class="eq_num">
          <!-- 设备总数 -->
          <div>
            设备总数：<span class="eq_color_pink">{{ item.total }}</span
            >处
          </div>
          <!-- 在线数量 -->
          <div>
            在线：<span class="eq_color_green">{{ item.online }}</span
            >处
          </div>
          <!-- 离线数量 -->
          <div>
            离线：<span class="eq_color_red">{{ item.offline }}</span
            >处
          </div>
        </div>
        <!-- 设备类型名称 -->
        <div class="eq_text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 模拟设备统计数据
// 实际项目中这些数据应该从后端API获取
const equipmentData = [
  {
    // 环境检测设备数据
    type: 'environment', // 设备类型标识
    name: '环境检测设备', // 设备类型名称
    total: 32, // 设备总数
    online: 16, // 在线数量
    offline: 16, // 离线数量
  },
  {
    // 视频监控设备数据
    type: 'video',
    name: '视频监控设备',
    total: 16,
    online: 10,
    offline: 6,
  },
  {
    // 井下电话设备数据
    type: 'phone',
    name: '井下电话设备',
    total: 12,
    online: 10,
    offline: 2,
  },
]
</script>

<style lang="scss" scoped>
/* 设备统计主容器 */
.equipment {
  /* 头部标题样式 */
  .header {
    height: 39px;
    background-image: url('@/assets/image/comperhensive/equipment/subheading.png');
    background-size: 100% 100%; /* 背景图拉伸填充 */
  }

  /* 内容区域样式 */
  .content {
    height: 198px;
    background-image: url('@/assets/image/comperhensive/equipment/content_bg.png');
    display: flex;
    flex-direction: column; /* 垂直排列 */
    justify-content: space-evenly; /* 均匀分布空间 */
    align-items: center; /* 水平居中 */
  }

  /* 单个设备统计项基础样式 */
  .eq_svs {
    width: 353px;
    height: 45px;
    background-position: 100% 100%; /* 背景图定位 */
    display: flex;
    flex-direction: column; /* 垂直布局 */
    justify-content: center; /* 垂直居中 */

    /* 第一种设备类型背景图（环境检测） */
    &_1 {
      background-image: url('@/assets/image/comperhensive/equipment/surroundings.png');
    }

    /* 第二种设备类型背景图（视频监控） */
    &_2 {
      background-image: url('@/assets/image/comperhensive/equipment/video.png');
    }

    /* 第三种设备类型背景图（井下电话） */
    &_3 {
      background-image: url('@/assets/image/comperhensive/equipment/iphone.png');
    }

    /* 设备数量统计区域样式 */
    .eq_num {
      margin-top: 5px;
      display: flex; /* 水平布局 */

      /* 第一个统计项（设备总数）左边距 */
      div:nth-child(1) {
        margin-left: 61px;
      }

      /* 第二个统计项（在线数量）左右边距 */
      div:nth-child(2) {
        margin: 0 15px;
      }
    }

    /* 设备类型名称样式 */
    .eq_text {
      margin-top: 5px;
      margin-left: 61px;
      color: #3befff; /* 浅蓝色文字 */
    }
  }

  /* 粉色文字样式（用于设备总数） */
  .eq_color_pink {
    color: #ff9c9c;
    font-size: 16px;
  }

  /* 绿色文字样式（用于在线数量） */
  .eq_color_green {
    color: #22de4e;
    font-size: 16px;
  }

  /* 红色文字样式（用于离线数量） */
  .eq_color_red {
    color: #f43146;
    font-size: 16px;
  }
}
</style>
