<!--
 * @title: 重点视频
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-23 17:07:01
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\videoMonitoring\highVideo\index.vue
-->
<template>
  <div class="highVideo">
    <div class="header"></div>
    <div class="content">
      <!-- 遍历摄像头列表 -->
      <div v-for="(item, index) in photoList" :key="index" class="video_list">
        <!-- 视频播放器 :src="`rtsp://${item.videoStreaming}`" -->
        <!-- <video
          v-if="item.videoStreaming"
          class="video_image"
          controls
          src="@/assets/image/videoMonitoring/video_one.webm"
          @error="handleVideoError"
        ></video> -->
        <!-- 无视频流时显示占位图 -->
        <!-- <img
          v-else
          src="@/assets/image/videoMonitoring/highVideo/video_one.png"
          class="video_image"
        /> -->
        <video
          class="video_image"
          controls
          :src="item.imageUrl"
          @error="handleVideoError"
        ></video>
        <!-- 标签显示摄像头名称 -->
        <div class="label">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cameraFocus } from '@/api'
import video_one from '@/assets/image/videoMonitoring/video_one.webm'
import video_two from '@/assets/image/videoMonitoring/video_two.webm'
import video_three from '@/assets/image/videoMonitoring/video_three.webm'
import video_four from '@/assets/image/videoMonitoring/video_four.webm'
const photoList = [
  { imageUrl: video_one, name: '1#监控' },
  { imageUrl: video_two, name: '2#监控' },
  { imageUrl: video_three, name: '3#监控' },
  { imageUrl: video_four, name: '4#监控' },
]
// 定义响应式变量
const cameraList = ref([])
// 获取重点摄像头数据
const fetchCameraData = async () => {
  const res = await cameraFocus()
  // 筛选 isFocus=1 且 status=1 的在线摄像头
  // cameraList.value = res.data.filter((item) => item.isFocus === 1 && item.status === 1)
  cameraList.value = res.data.slice(0, 4)
}
// 获取视频失败
const handleVideoError = (e) => {
  console.log(e, 'e')
}

onMounted(() => {
  fetchCameraData()
})
</script>
  
<style lang="scss" scoped>
.highVideo {
  width: 441px;
  .header {
    height: 39px;
    background-image: url('@/assets/image/videoMonitoring/highVideo/subheading.png');
  }
  .content {
    width: 441px;
    height: 233px;
    background: url('@/assets/image/videoMonitoring/highVideo/background_content.png') no-repeat;
    display: flex; /* 启用 Flex 布局 */
    flex-wrap: wrap; /* 允许换行 */
    justify-content: space-around; /* 均匀分布 */
    align-items: center;
    .video_list {
      width: 199px;
      height: 110px;
      text-align: center;
      background: url('@/assets/image/videoMonitoring/highVideo/decorate.png') no-repeat;
      .label {
        width: 190px;
        height: 22px;
        line-height: 22px;
        background-color: #000000;
        opacity: 0.6;
        position: relative;
        top: -25px;
        left: 4px;
      }
    }
    .video_image {
      margin-top: 8px;
      width: 190px;
      height: 89px;
    }
  }
}
</style>
  
  