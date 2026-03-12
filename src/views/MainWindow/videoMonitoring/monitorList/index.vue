<!--
 * @title: 监控列表
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-23 17:02:08
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\videoMonitoring\monitorList\index.vue
-->
<template>
  <div class="monitorList" :style="{ '--expanded-node-height': expandedNodeHeight }">
    <div class="header"></div>
    <div class="content">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        node-key="id"
        @node-click="handleNodeClick"
        accordion
      >
        <!-- 自定义树节点内容 -->
        <template #default="{ node }">
          <!-- 动态图标显示 -->
          <img :src="getNodeIcon(node)" class="svgs" />

          <div
            class="tree_three"
            :style="{
              width: node.level === 2 ? '288px' : node.data.cameraData ? '270px' : 'auto',
            }"
          >
            <div>{{ node.label }}</div>

            <!-- 非摄像头节点显示统计信息 -->
            <div v-if="!node.data.cameraData" class="textSpan">
              ( <span class="online">{{ getOnlineCount(node) }}</span> /
              <span class="total">{{ getTotalCount(node) }}</span>
              )
            </div>

            <!-- 摄像头节点显示定位图标 -->
            <img
              v-if="node.data.cameraData"
              src="@/assets/image/videoMonitoring/monitorList/location.png"
            />
          </div>
        </template>
      </el-tree>
    </div>

    <!-- 摄像头详情弹窗 -->
    <div v-if="detailsDialog" class="details">
      <div class="header_d">
        <div class="title">{{ title }}信息</div>
        <div class="close" @click="close"></div>
      </div>
      <div class="content">
        <!-- 视频播放器 -->
        <!-- <video
          v-if="videoStreaming"
          class="video_image"
          controls
          :src="`rtsp://${videoStreaming}`"
          @error="handleVideoError"
        ></video> -->
        <video
          class="video_image"
          controls
          src="@/assets/image/videoMonitoring/video_one.webm"
          @error="handleVideoError"
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cameraGroupTree } from '@/api'
import compilations from '@/assets/image/videoMonitoring/monitorList/compilations.png'
import monitoring from '@/assets/image/videoMonitoring/monitorList/monitoring.png'
import onLine from '@/assets/image/videoMonitoring/monitorList/onLine.png'
import offLine from '@/assets/image/videoMonitoring/monitorList/offLine.png'
// 视频弹窗控制
const detailsDialog = ref(false)
const title = ref('')
const videoStreaming = ref('')

// 树形数据结构
const treeData = ref([])
const defaultProps = { children: 'children', label: 'label' }
const defaultExpandedKeys = ref([]) //默认展开第一个

/**
 * 数据转换：将API数据转换为树形结构
 * @param {Array} apiData - 原始API数据
 * @returns {Array} 格式化后的树形数据
 */
const transformData = (apiData) => {
  // 处理分组节点
  const processGroup = (group) => ({
    id: group.id,
    label: group.name,
    originalData: group, // 保留原始数据用于统计
    children: [
      ...(group.childList?.map(processGroup) || []), // 递归处理子组
      ...(group.cameraList?.map(processCamera) || []), // 处理摄像头
    ].filter(Boolean),
  })

  // 处理摄像头节点
  const processCamera = (camera) => ({
    id: `camera_${camera.id}`,
    label: camera.name,
    isLeaf: true,
    cameraData: camera,
  })

  return apiData.map(processGroup)
}

/**
 * 获取节点图标路径
 * @param {Object} node - 树节点对象
 * @returns {String} 图标路径
 */
const getNodeIcon = (node) => {
  if (node.level === 1) return compilations
  if (node.level === 2 && !node.data.cameraData) return monitoring
  if (node.data.cameraData?.status === 1) return onLine
  return offLine
}

// 节点点击处理
const handleNodeClick = (data) => {
  if (data.cameraData && !data.children) {
    title.value = data.label
    videoStreaming.value = data.cameraData.videoStreaming
    detailsDialog.value = true
  }
}

// 计算展开容器高度
const expandedNodeHeight = computed(() => `${545 - (treeData.value.length - 1) * 37}px`)

/**
 * 递归统计摄像头数量
 * @param {Object} data - 当前节点数据
 * @param {Boolean} onlyOnline - 是否只统计在线
 * @returns {Number} 摄像头数量
 */
const getCamerasRecursively = (data, onlyOnline = false) => {
  if (!data) return []

  // 当前节点的摄像头
  const currentCameras = data.cameraList?.filter((c) => !onlyOnline || c.status === 1) || []

  // 递归子节点的摄像头
  const childCameras = data.childList?.flatMap((c) => getCamerasRecursively(c, onlyOnline)) || []

  return [...currentCameras, ...childCameras]
}

const getOnlineCount = (node) => getCamerasRecursively(node.data.originalData, true).length
const getTotalCount = (node) => getCamerasRecursively(node.data.originalData).length

// 关闭弹窗
const close = () => (detailsDialog.value = false)
// 获取视频失败
const handleVideoError = (e) => {
  console.log(e, 'e')
}

// 初始化加载数据
onMounted(async () => {
  const res = await cameraGroupTree({ diggingsId: 1 })
  treeData.value = transformData(res.data)
  // 数据加载后默认展开第一个
  if (treeData.value.length > 0) {
    defaultExpandedKeys.value = [treeData.value[0].id]
  }
})
</script>
<style lang="scss" scoped>
.monitorList {
  width: 441px;
  margin-top: 15px;

  .header {
    height: 39px;
    background-image: url('@/assets/image/videoMonitoring/monitorList/subheading.png');
  }

  .content {
    width: 441px;
    height: 578px;
    background-image: url('@/assets/image/videoMonitoring/monitorList/background_content.png');
    padding: 8px;
    box-sizing: border-box;
    overflow-y: hidden !important;

    :deep(.el-tree) {
      width: 397px;
      height: 550px;
      background: transparent;
      color: #fff;
      margin-left: 10px;
      overflow-y: hidden !important;

      // 文字
      .textSpan {
        margin-left: 20px;
        span:nth-child(1) {
          color: #4dba3f;
        }
      }
      // 顶级节点默认
      > .el-tree-node > .el-tree-node__content {
        height: 32px;
        background-image: url('@/assets/image/videoMonitoring/monitorList/packUp.png');
        margin-top: 5px;
      }
      // 一级节点展开
      > .el-tree-node.is-expanded {
        height: var(--expanded-node-height);
        background-image: url('@/assets/image/videoMonitoring/monitorList/unfold.png');
      }
      > .el-tree-node.is-expanded > .el-tree-node__children {
        height: calc(var(--expanded-node-height) - 50px);
        overflow-y: auto !important;
        margin-top: 10px;
      }
      .svgs {
        margin: 0 10px;
      }
      // 隐藏默认箭头图标
      .el-tree-node__expand-icon {
        display: none;
      }
    }
    .tree_three {
      display: flex;
      justify-content: space-between;
      img {
        width: 11px;
        height: 13px;
      }
    }
  }
}
.details {
  width: 341px;
  height: 245px;
  background: rgba(12, 51, 88, 0.8);
  position: absolute;
  right: 30px;
  top: 130px;
  font-size: 14px;
  .header_d {
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
    .close {
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .content {
    width: 300px;
    height: 195px;
    background: rgba(2, 169, 240, 0.2);
    margin-left: 20px;
    .video_image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
