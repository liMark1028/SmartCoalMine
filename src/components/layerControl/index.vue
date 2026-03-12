<!--
 * @Author: wangshiwei
 * @Date: 2025-04-11 12:58:35
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 14:04:13
 * @FilePath: \ahla-tkxt-web\src\components\layerControl\index.vue
 * @Description: 图层控制
 * 
 *  
-->

<template>
  <div class="gis-layer">
    <div class="layer-header">
      <div class="layer-title">图层控制</div>
    </div>
    <div class="layer-content">
      <el-tree
        :data="treeDataList"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        :default-expanded-keys="[3, 4]"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <img
              v-if="data.children"
              src="@/assets/image/videoMonitoring/monitorList/compilations.png"
              class="svgs"
              alt="顶级节点图标"
            />
            <img
              v-else
              src="@/assets/image/videoMonitoring/monitorList/monitoring.png"
              class="svgs"
            />
            <span>{{ data.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup>
const defaultProps = {
  children: 'children',
  label: 'label',
}
const treeDataList = [
  {
    id: 1,
    label: '视频监控',
  },
  {
    id: 2,
    label: '车辆定位',
  },
  {
    id: 3,
    label: '环境监测',
    children: [
      {
        id: 7,
        label: '温度传感器',
      },
      {
        id: 8,
        label: '一氧化碳传感器',
      },
      {
        id: 9,
        label: '二氧化碳传感器',
      },
      {
        id: 10,
        label: '湿度传感器',
      },
      {
        id: 11,
        label: '其他',
      },
    ],
  },
  {
    id: 4,
    label: '通风系统',
    children: [
      {
        id: 12,
        label: '风机',
      },
      {
        id: 13,
        label: '测风点',
      },
      {
        id: 14,
        label: '进风路线',
      },
      {
        id: 15,
        label: '回风路线',
      },
    ],
  },
  {
    id: 5,
    label: '供水施救设备',
    children: [
      {
        id: 16,
        label: '供水施救装置',
      },
      {
        id: 17,
        label: '阀门',
      },
      {
        id: 18,
        label: '进水路线',
      },
      {
        id: 19,
        label: '回水路线',
      },
    ],
  },
  {
    id: 7,
    label: '压风自救设施',
  },
  {
    id: 8,
    label: '其他',
    children: [
      {
        id: 20,
        label: '通信电话',
      },
      {
        id: 21,
        label: '广播',
      },
      {
        id: 22,
        label: '定位基站',
      },
      {
        id: 23,
        label: '巷道映射',
      },
      {
        id: 24,
        label: '避难硐室',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
.gis-layer {
  width: $tk-contnettcbox-width;
  height: $tk-contnettcbox-height;
  background: rgba(12, 51, 88, 0.8);
  background-size: 100% 100%;
  //   头部
  .layer-header {
    width: $tk-contnettcbox-width;
    height: $tk-contnettcbox-tc-height;
    //   background: $tk-contnet-bt;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .layer-title {
      font-size: 16px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(
      to bottom,
      #f5f8fb,
      #c5d9ec,
      #6a99c3,
      #1a609d,
    );
    -webkit-background-clip: text;
    color: transparent;
    }
  }
  //   内容
  .layer-content {
    width: $tk-contnettcbox-width;
    height: $tk-contnettcbox-tc-text-height;
    background: rgba(2, 169, 240, 0.2);
    overflow-y: auto;
    :deep(.el-tree) {
      width: 275px;
      background: transparent;
      color: #fff;
      margin-left: 10px;
      // 文字
      .textSpan {
        margin-left: 20px;
        span:nth-child(1) {
          color: #4dba3f;
        }
      }
      // 顶级节点背景
      .el-tree-node {
        .el-tree-node__content {
          height: 32px;
          background-image: url('@/assets/image/videoMonitoring/monitorList/packUp.png');
          // background-image: url('@/assets/image/videoMonitoring/monitorList/unfold.png');
          margin-top: 5px;
        }
      }
      .el-tree-node__content > label.el-checkbox {
        margin-left: 4px;
      }
      .el-checkbox__inner {
        width: 17px;
        height: 17px;
        background: url('@/assets/image/emergency/fuxuanjk.png') no-repeat;
        background-size: 100% 100%;
        border: none;
      }
      .svgs {
        margin: 0 10px;
      }
      // 隐藏默认箭头图标
      .el-tree-node__expand-icon {
        display: none;
      }
    }
  }
}
// 滚动条
:deep {
  ::-webkit-scrollbar {
    width: 5px;
    height: 6px;
    background-color: transparent;
  }

  //定义滚动条轨道
  //内阴影+圆角
  ::-webkit-scrollbar-track {
    background-color: transparent;
    background-size: 100% 100%;
    height: 30px;
  }

  // 定义滑块
  // 内阴影+圆角
  ::-webkit-scrollbar-thumb {
    // border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #60cfff;
    width: 5px;
    // height: 30px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #07f9fd;
  }
}
</style>
