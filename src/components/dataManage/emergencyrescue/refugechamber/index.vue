<!--
 * @Author: wangshiwei
 * @Date: 2025-04-18 09:18:48
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-30 16:27:04
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\emergencyrescue\refugechamber\index.vue
 * @Description: 避难硐室
 * 
 *  
-->

<template>
  <div class="refugechamber">
    <div class="refugechamber_header">
      <div class="r_header_search">
        <span>关键字：</span>
        <el-input
          v-model="queryParams.keyword"
          placeholder="请输入关键字搜索"
          clearable
          @keyup.enter="handleSearch"
          class="search_input_container"
          @clear="handleSearch"
        >
        </el-input>
        <span>类型：</span>
        <el-select
          v-model="queryParams.type"
          placeholder="请选择类型"
          class="search_input"
          clearable
          popper-class="custom-select-dropdown"
          @clear="handleSearch"
        >
          <el-option
            v-for="item in sectiontypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span>所属中段：</span>
        <el-select
          v-model="queryParams.regionId"
          placeholder="请选择所属中段"
          class="search_input"
          clearable
          popper-class="custom-select-dropdown"
          @clear="handleSearch"
        >
          <el-option
            v-for="item in sectionOption"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <div class="search_btn" @click="handleSearch"></div>
      </div>
      <div class="r_header_create" @click="craeteItem">+</div>
    </div>
    <div class="refugechamber_contnet">
      <div class="data_table">
        <el-table :data="filteredData" height="600">
          <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" />
          <el-table-column prop="address" label="地点" :show-overflow-tooltip="true" />
          <el-table-column prop="type" label="类型" :show-overflow-tooltip="true" />
          <el-table-column prop="regionId" label="所属中段" :show-overflow-tooltip="true">
            <template #default="{ row }">
              {{ regionName(row.regionId) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90">
            <template #default="scope">
              <div class="btnlist">
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
      @close="cancelGroup"
    >
      <el-form ref="dialogGroupRef" :model="formGrop" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formGrop.name" placeholder="请输入名称" class="search_input" />
        </el-form-item>
        <el-form-item label="地点" prop="name">
          <el-input v-model="formGrop.address" placeholder="请输入地点" class="search_input" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="formGrop.type"
            placeholder="请选择类型"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in sectiontypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属中段" prop="regionId">
          <el-select
            v-model="formGrop.regionId"
            placeholder="请选择所属中段"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in sectionOption"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
import {
  mapserviceRefugePage,
  mapserviceRefuge,
  mapserviceRefugeUpdate,
  mapserviceRefugeDetele,
  mapserviceRegionPage, //中段接口
} from '@/api'
import { useGlobalStore } from '@/stores/index'
const filteredData = ref([])
// 搜索表单
const queryParams = reactive({
  currentPage: 1, // 当前页码
  pageSize: 10, // 每页显示数量
  keyword: '', //关键字
  type: '', //类型
  regionId: '', //所属中段
})
// 分页相关变量
const totalItems = ref(0) // 总数据量
const store = useGlobalStore()
// 弹窗标题
const titleFrom = ref('新增')
// 弹窗ref
const dialogGroupRef = ref(null)
// 是否开启弹窗
const openGroup = ref(false)
// 弹窗表单
const initFrom = {
  name: '',
  address: '',
  type: '',
  regionId: '',
}
const formGrop = reactive({ ...initFrom })
// 所属中段
const sectionOption = ref([]) // 类型
const sectiontypeOption = ref([
  { label: '永久避难硐室', value: '永久避难硐室' },
  { label: '临时避难硐室', value: '临时避难硐室' },
])
// 处理搜索
const handleSearch = () => {
  queryParams.currentPage = 1
  _mapserviceRefugePage()
}
// 分页处理
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  _mapserviceRefugePage()
}
const handleCurrentChange = (val) => {
  queryParams.currentPage = val
  _mapserviceRefugePage()
}
// 新增
const craeteItem = () => {
  titleFrom.value = '新增'
  openGroup.value = true
}
// 修改
const edit = (row) => {
  titleFrom.value = '编辑'
  Object.assign(formGrop, row)
  openGroup.value = true
}
// 重置表单分组
const resetGroup = () => {
  Object.assign(formGrop, initFrom)
}
// 修改确定
const submitFormGroup = () => {
  dialogGroupRef.value.validate(async (valid) => {
    if (!valid) return
    if (titleFrom.value == '新增') {
      const data = {
        ...formGrop,
        diggingsId: kqDataid.value,
      }
      await mapserviceRefuge(data)
      ElMessage.success('新增成功')
    } else {
      await mapserviceRefugeUpdate(formGrop)
      ElMessage.success('更新成功')
    }
    _mapserviceRefugePage()
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
  ElMessageBox.confirm('是否确认删除数据?')
    .then(() => {
      mapserviceRefugeDetele({ refugeId: row.id })
      _mapserviceRefugePage()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}
// 获取接口
const _mapserviceRefugePage = async () => {
  const data = {
    diggingsId: kqDataid.value,
    ...queryParams,
  }
  const res = await mapserviceRefugePage(data)
  if (res.code == 200) {
    filteredData.value = res.data.list
    totalItems.value = res.data.total
  }
}
const _mapserviceRegionPage = async () => {
  const data = {
    diggingsId: kqDataid.value,
    page: 1,
    pageSize: 999,
  }
  const res = await mapserviceRegionPage(data)
  if (res.code == 200) {
    sectionOption.value = res.data.list
  }
}
// 中段
const regionName = (id) => {
  const region = sectionOption.value.find((item) => item.id === id)
  return region ? region.name : id
}

const kqDataid = computed(() => store.kqData.kqid)
onMounted(() => {
  _mapserviceRefugePage()
  _mapserviceRegionPage() //所属中段
})
</script>
  
  <style lang="scss" scoped>
// el-table
@use '../../../../styles/components/publicttable.scss';
// from表单
@use '../../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../../styles/components/publicesearch.scss';
.refugechamber {
  width: 100%;
  .refugechamber_header {
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
        transform: all 0.3s;
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
  .refugechamber_contnet {
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
/* 下拉背景 */
@use '../../../../styles/components/publicdown.scss';
</style>
  