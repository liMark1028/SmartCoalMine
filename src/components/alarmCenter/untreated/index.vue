<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 17:03:09
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 17:10:12
 * @FilePath: \ahla-tkxt-web\src\components\alarmCenter\untreated\index.vue
 * @Description: 当日告警未处理信息
 * 
 *  
-->

<template>
  <div class="untreted">
    <div class="table">
      <el-table :data="tableData" height="200">
        <el-table-column prop="detail" label="描述" :show-overflow-tooltip="true" />
        <el-table-column prop="time" label="时间" :show-overflow-tooltip="true" width="110" />
        <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" width="68" />
        <el-table-column prop="level" label="级别" :show-overflow-tooltip="true" width="60">
          <template #default="scope">
            <div :style="{ color: getColor(scope.row.level) }">{{ scope.row.level }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" :show-overflow-tooltip="true" width="82" />
        <el-table-column prop="操作" label="操作" width="60">
          <template #default="scope">
            <div class="location" @click="detailsClick(scope.row)">详 定</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background="transtarnt"
      />
    </div>
    <!-- 告警详情信息 -->
    <div class="details_box" v-if="detailsFlag">
      <deteilData :list="deatilsList"></deteilData>
      <div class="close-button" @click.stop="close()"></div>
    </div>
  </div>
</template>

<script setup>
import deteilData from '../deteilData/index.vue'
const tableData = [
  {
    detail: '人员入侵',
    time: '2025-04-15 13:00:01',
    status: '未处理',
    level: '一级',
    type: '视频监控',
  },
  {
    detail: '物料堆积',
    time: '2025-04-15 14:00:01',
    status: '未处理',
    level: '二级',
    type: '皮带巡检',
  },
  {
    detail: '未带安全帽',
    time: '2025-04-15 15:00:01',
    status: '未处理',
    level: '三级',
    type: '视频监控',
  },
  {
    detail: '未带安全帽',
    time: '2025-04-15 15:00:01',
    status: '未处理',
    level: '四级',
    type: 'AI视频',
  },
]
// 分页相关变量
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页显示数量
const totalItems = ref(10) // 总数据量
// 详情展示
const detailsFlag = ref(false)
const deatilsList = ref({})

// 获取级别颜色
const getColor = (level) => {
  if (level == '一级') {
    return '#d23148'
  } else if (level == '二级') {
    return '#d47b33'
  } else if (level == '三级') {
    return '#dfbd33'
  } else {
    return '#22de4e'
  }
}

// 详情
const detailsClick = (row) => {
  detailsFlag.value = true
  deatilsList.value = row
}
// 关闭
const close=()=>{
  detailsFlag.value =false
}
</script>

<style lang="scss" scoped>
.untreted {
  .table {
    :deep(.el-table) {
      background-color: transparent;
      //   width: 408px;
      height: 100%;
      color: #fff;

      tr {
        height: 37px;
        background-color: transparent;
        // background-image: url('@/assets/image/humanAndVehicle/mancar/list.png') ;
        margin-top: 10px;
      }

      th {
        background-color: transparent;
        color: #fff;
      }
    }
    // .location {
    //   width: 14px;
    //   height: 15px;
    //   background-image: url('@/assets/image/humanAndVehicle/mancar/location.png');
    //   cursor: pointer;
    // }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    :deep(.el-pagination) {
      color: #fff;
      background-color: transparent;
      button {
        min-width: auto;
      }
      .btn-prev {
        width: 21px;
        height: 21px;
        background-image: url('@/assets/image/humanAndVehicle/mancar/pagination_prev.png');
        background-position: center;

        .el-icon {
          display: none;
        }
      }

      .btn-next {
        width: 21px;
        height: 21px;
        background-image: url('@/assets/image/humanAndVehicle/mancar/pagination_next.png');
        background-position: center;

        .el-icon {
          display: none;
        }
      }

      .el-pager {
        li {
          background-color: transparent;
          color: #fff;
          min-width: 21px;
          height: 21px;
          &.is-active {
            color: #409eff;
            background-color: transparent;
          }

          &:hover {
            color: #409eff;
          }
        }
      }

      .el-pagination__total {
        color: #fff;
      }
    }
  }
  // 详情
  .details_box {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;
    .close-button {
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 1001;
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/back.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: url('@/assets/image/global/alarm/back.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

// 表格样式调整
.el-table {
  --el-table-border-color: none;
  --el-table-border: none;

  :deep(.el-table__inner-wrapper::before) {
    display: none;
  }
}
</style>
