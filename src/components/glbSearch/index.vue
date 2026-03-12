<!--
 * @Author: wangshiwei
 * @Date: 2025-04-11 10:28:10
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 14:38:19
 * @FilePath: \ahla-tkxt-web\src\components\glbSearch\index.vue
 * @Description: 全局搜索列表
 * 
 *  
-->

<template>
  <div class="gis-search">
    <div class="lookGr">查询结果</div>
    <div class="table">
      <el-table :data="tableData"  height="340" >
        <el-table-column prop="id" label="设备id" width="100"  />
        <el-table-column prop="address" label="位置"  />
        <el-table-column prop="操作" label="操作" width="80" >
          <template #default="scope">
            <div class="location"></div>
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
    id: '273',
    name: 'Tom',
    address: '450中段采区皮带处',
  },
  {
    id: '274',
    name: 'Tom',
    address: '中央水泵房',
  },
  {
    id: '275',
    name: 'Tom',
    address: '1401风机处',
  },
  {
    id: '276',
    name: 'Tom',
    address: '1402运输顺槽',
  },
]
// 分页相关变量
const currentPage = ref(1) // 当前页码
const pageSize = ref(9) // 每页显示数量
const totalItems = ref(10) // 总数据量
</script>

<style lang="scss" scoped>
.gis-search {
  width: 408px;
  height: 419px;
  background: #0c3358;
  background-size: 100% 100%;
  .lookGr{
    color: #fff;
    font-size: 14px;
    font-family: 'PUHUITI65';
    margin: 10px 0 10px 8px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  .table {
    :deep(.el-table) {
      background-color: transparent;
      width: 408px;
      height: 100%;
      color: #fff;

      tr {
        height: 37px;
        background-color: transparent;
        background-image: url('@/assets/image/humanAndVehicle/mancar/list.png');
        margin-top: 10px;
      }

      th {
        background-color: transparent;
        color: #fff;
      }
    }
    .location {
      width: 14px;
      height: 15px;
      background-image: url('@/assets/image/humanAndVehicle/mancar/location.png');
      cursor: pointer;
    }
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
