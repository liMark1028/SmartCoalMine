<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 17:27:05
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 15:37:33
 * @FilePath: \ahla-tkxt-web\src\components\alarmCenter\offlinedevice\index.vue
 * @Description: 离线设备
 * 
 *  
-->

<template>
  <div class="untreted">
    <div class="search_box">
      <div>类型选择</div>
      <!-- 类型选择下拉框 -->
      <div>
        <el-select v-model="selectedType" placeholder="选择类型" class="select_container">
          <el-option
            v-for="types in typeOptions"
            :key="types.label"
            :label="types.label"
            :value="types.value"
          />
        </el-select>
      </div>
      <div>时间范围</div>
      <div>
        <el-date-picker
          v-model="dataTime"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
          class="data_container"
        />
      </div>
      <div class="search_bg"></div>
    </div>
    <div class="table">
      <el-table :data="tableData" height="168">
        <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" />
        <el-table-column prop="time" label="时间" :show-overflow-tooltip="true" />
        <el-table-column prop="type" label="类型" :show-overflow-tooltip="true" width="82" />
        <el-table-column prop="detail" label="描述" :show-overflow-tooltip="true"  />
        <el-table-column prop="操作" label="操作" width="60">
          <template #default="scope">
            <div class="location">详 定</div>
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
  </div>
</template>

<script setup>
const tableData = [
  {
    name:'1号机器人',
    detail: '托管高温',
    time: '2025-04-15 14:00:01',
    status: '未处理',
    type: '皮带巡检',
  },
  {
    name:'350巷道东侧枪机',
    detail: '物料堆积',
    time: '2025-04-15 13:00:01',
    status: '未处理',
    type: '视频监控',
  },

  {
    name:'450巷道东侧枪机',
    detail: '未带安全帽',
    time: '2025-04-15 15:00:01',
    status: '未处理',
    type: '视频监控',
  },
]
// 分页相关变量
const currentPage = ref(1) // 当前页码
const pageSize = ref(5) // 每页显示数量
const totalItems = ref(10) // 总数据量
// 选中的类型
const selectedType = ref('0')
// 时间
const dataTime = ref('')
// 类型选项
const typeOptions = [
  { label: '全部', value: '0' },
  { label: '皮带巡检', value: '1' },
  { label: 'AI监控', value: '2' },
  { label: '视频监控', value: '3' },
]

</script>

<style lang="scss" scoped>
.untreted {
  margin-top: 8px;
  .search_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 94%;
    margin: 0 auto;
    div {
      color: #fff;
    }
    .search_bg {
      width: 14px;
      height: 14px;
      background: url('@/assets/image/global/searchicon.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      &:hover {
        background: url('@/assets/image/global/searchicon_s.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .select_container {
      width: 100px;
      height: 27px;

      background-image: url('@/assets/image/humanAndVehicle/mancar/select_bg.png');
      background-size: 100% 100%;

      :deep(.el-select__wrapper) {
        height: 100%;
        background: transparent;
        border: none;
        box-shadow: none;
      }
      .el-select-dropdown {
        background: transparent;
        background-image: url('@/assets/image/humanAndVehicle/mancar/select.png');
      }
    }
    :deep {
      .data_container {
        width: 185px;
      }
      .el-input__wrapper {
        background: transparent;
        box-shadow: none;
        height: 27px;
        background-image: url('@/assets/image/humanAndVehicle/mancar/select_bg.png');
        background-size: 100% 100%;
      }
    }
  }
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
