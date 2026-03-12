<!--
 * @Author: wangshiwei
 * @Date: 2025-04-17 11:19:56
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-18 10:33:41
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\devicemanages\positionsub\index.vue
 * @Description: 定位分站
 * 
 *  
-->

<template>
  <div class="positionsub">
    <div class="positionsub_header">
      <div class="r_header_search">
        <span>关键字：</span>
        <el-input
          v-model="queryParams.searchKeyword"
          placeholder="请输入关键字搜索"
          clearable
          @keyup.enter="handleSearch"
          class="search_input_container"
        >
        </el-input>
        <span>所属中段：</span>
        <el-select
          v-model="queryParams.belongsection"
          placeholder="请选择所属中段"
          class="search_input"
          clearable
           popper-class="custom-select-dropdown"
        >
          <el-option
            v-for="item in sectionOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="search_btn"></div>
      </div>
      <div class="r_header_create" @click="createItem">+</div>
    </div>
    <div class="positionsub_contnet">
      <div class="data_table">
        <el-table :data="filteredData" height="600">
          <el-table-column prop="id" label="编号" :show-overflow-tooltip="true" />
          <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" />
          <el-table-column prop="address" label="地点" :show-overflow-tooltip="true" />
          <el-table-column prop="belongsection" label="所属中段" :show-overflow-tooltip="true" />
          <el-table-column label="操作" width="90">
            <template #default="scope">
              <div class="btnlist">
                <span class="location">标</span>
                <span class="location" @click="edit(scope.row)">修</span>
                <span class="location" @click="dell(scope.row)">删</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="queryParams.currentPage"
          v-model:page-size="queryParams.pageSize"
          layout="total, prev, pager, next"
          :total="totalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background="transtarnt"
        />
      </div>
    </div>
    <!-- 修改 -->
    <el-dialog
      :title="titleFrom"
      v-model="openGroup"
      width="450px"
      :append-to-body="false"
      :close-on-click-modal="false"
      class="formDialog"
    >
      <el-form ref="dialogGroupRef" :model="formGrop" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formGrop.name" placeholder="请输入名称" class="search_input" />
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-input v-model="formGrop.address" placeholder="请输入地点" class="search_input" />
        </el-form-item>
        <el-form-item label="所属中段" prop="belongsection">
          <el-select
            v-model="formGrop.belongsection"
            placeholder="请选择所属中段"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in sectionOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="mksure" @click="submitFormGroup">确 定</div>
          <div class="mksure" @click="cancelGroup">取 消</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const filteredData = ref([
  {
    name: '350进风巷区域',
    address: '350进风巷300米',
    x: '112.2772850',
    y: '35.6197895',
    z: '523.12',
    id: 169,
    belongsection: '350',
  },
  {
    name: '350斜坡道区域',
    address: '350斜坡道入口',
    x: '112.2770044',
    y: '35.6174083',
    z: '548.48',
    id: 170,
    belongsection: '350',
  },
  {
    name: '450进风巷区域',
    name: '450进风巷300米',
    x: '112.2770044',
    y: '35.6174083',
    z: '548.48',
    id: 171,
    belongsection: '450',
  },
])
// 搜索表单
const queryParams = reactive({
  currentPage: 1, // 当前页码
  pageSize: 9, // 每页显示数量
  searchKeyword: '', //关键字
  belongsection: '', //所属中段
})
// 分页相关变量
const totalItems = ref(0) // 总数据量

// 弹窗标题
const titleFrom = ref('新增')
// 弹窗ref
const dialogGroupRef = ref(null)
// 是否开启弹窗
const openGroup = ref(false)
// 弹窗表单
const initFormDta = {
  name: '',
  address: '',
  belongsection: '',
}
const formGrop = reactive({ ...initFormDta })

// 所属中段
const sectionOption = ref([
  { label: '230', value: '230' },
  { label: '350', value: '350' },
  { label: '400', value: '400' },
  { label: '450', value: '450' },
  { label: '500', value: '500' },
])
// 处理搜索
const handleSearch = () => {}
// 新增
const createItem = () => {
  titleFrom.value = '新增'
  openGroup.value = true
}
// 修改
const edit = (row) => {
  titleFrom.value = '修改'
  Object.assign(formGrop, row)
  openGroup.value = true
}
// 重置表单
const resetGroup = () => {
  Object.assign(formGrop, initFormDta)
}
// 修改确定
const submitFormGroup = () => {
  dialogGroupRef.value.validate((valid) => {
    if (!valid) return
    if (titleFrom.value == '新增') {
      ElMessage.success('新增成功')
    } else {
      ElMessage.success('更新成功')
    }
    resetGroup()
    openGroup.value = false
  })
}
// 修改取消
const cancelGroup = () => {
  resetGroup()
  openGroup.value = false
}
const dell = (row) => {
  ElMessageBox.confirm('是否确认删除"' + row.name + '"的数据项?')
    .then(() => {
      //   done()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      // catch error
      ElMessage.info('已取消删除')
    })
}
</script>

<style lang="scss" scoped>
// el-table
@use '../../../../styles/components/publicttable.scss';
// from表单
@use '../../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../../styles/components/publicesearch.scss';
.positionsub {
  width: 100%;
  .positionsub_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    color: #fff;
    .r_header_search {
      span {
        margin: 0 8px;
      }
      .search_btn {
        width: 16px;
        height: 17px;
        background: url('@/assets/image/global/searchicon.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        margin: 0 0 0 10px;
        vertical-align: middle;
        opacity: 0.9;
        transform:  all .3s;
        cursor: pointer;
        &:hover {
          background: url('@/assets/image/global/searchicon_s.png') no-repeat;
          background-size: 100% 100%;
          opacity: 1;
        }
      }
    }
    .r_header_create {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .positionsub_contnet {
    width: 100%;
   
    .btnlist {
      display: flex;
      justify-content: space-around;
      span {
        margin-right: 10px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      // margin-top: 10px;

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

}

</style>
<style lang="scss">
// 下拉背景
@use '../../../../styles/components/publicdown.scss';
</style>
