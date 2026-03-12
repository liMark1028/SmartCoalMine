<template>
  <div class="dictionary">
    <div class="dictionary_header">
      <div class="r_header_search">
        <span>关键字：</span>
        <el-input
          v-model="queryParams.searchKeyword"
          placeholder="请输入字典名称或类型搜索"
          clearable
          @keyup.enter="handleSearch"
          class="search_input_container"
        >
        </el-input>
        <div class="search_btn" @click="createItem"></div>
      </div>
      <div class="r_header_create" @click="createItem">+</div>
    </div>
    <div class="dictionary_contnet">
      <div class="data_table">
        <el-table :data="filteredData" height="640">
          <el-table-column prop="dictName" label="字典名称" :show-overflow-tooltip="true" />
          <el-table-column prop="dictType" label="字典类型" :show-overflow-tooltip="true" />
          <el-table-column prop="dictLabel" label="字典标签" />
          <el-table-column prop="dictValue" label="字典值" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
                {{ scope.row.status === 1 ? '启用' : '停用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <div class="btnlist">
                <span class="edit" @click="edit(scope.row)">编辑</span>
                <span class="delete" @click="del(scope.row)">删除</span>
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
          background
        />
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="titleFrom"
      v-model="openDialog"
      width="500px"
      :close-on-click-modal="false"
      class="formDialog"
    >
      <el-form ref="dialogRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model="formData.dictName" placeholder="请输入字典名称" class="search_input" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="formData.dictType" placeholder="请输入字典类型" class="search_input" />
        </el-form-item>
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input
            v-model="formData.dictLabel"
            placeholder="请输入字典标签"
            class="search_input"
          />
        </el-form-item>
        <el-form-item label="字典值" prop="dictValue">
          <el-input v-model="formData.dictValue" placeholder="请输入字典值" class="search_input" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formData.sort" :min="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="mksure" @click="cancel">取 消</div>
          <div class="mksure" type="primary" @click="submitForm">确 定</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
const filteredData = ref([
  {
    id: 1,
    dictName: '性别',
    dictType: 'sys_gender',
    dictLabel: '男',
    dictValue: '1',
    status: 1,
    sort: 1,
  },
  {
    id: 2,
    dictName: '采矿状态',
    dictType: 'old_status',
    dictLabel: '已采',
    dictValue: 'paid',
    status: 0,
    sort: 2,
  },
])

// 查询参数
const queryParams = reactive({
  currentPage: 1,
  pageSize: 10,
  searchKeyword: '',
})

// 分页相关
const totalItems = ref(2)

// 弹窗控制
const titleFrom = ref('新增字典')
const openDialog = ref(false)
const dialogRef = ref(null)

// 表单数据
const initForm = {
  dictName: '',
  dictType: '',
  dictLabel: '',
  dictValue: '',
  status: 1,
  sort: 1,
}
const formData = reactive({ ...initForm })

// 表单验证规则
const rules = {
  dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
  dictValue: [{ required: true, message: '字典值不能为空', trigger: 'blur' }],
}

// 搜索
const handleSearch = () => {
  // 实际项目中此处应调用接口
  console.log('执行搜索:', queryParams.searchKeyword)
}

// 新增
const createItem = () => {
  titleFrom.value = '新增字典'
  openDialog.value = true
}

// 编辑
const edit = (row) => {
  titleFrom.value = '编辑字典'
  Object.assign(formData, row)
  openDialog.value = true
}

// 提交表单
const submitForm = () => {
  dialogRef.value.validate((valid) => {
    if (!valid) return

    // 模拟提交操作
    if (titleFrom.value === '新增字典') {
      filteredData.value.push({ ...formData, id: Date.now() })
      ElMessage.success('新增成功')
    } else {
      const index = filteredData.value.findIndex((item) => item.id === formData.id)
      filteredData.value.splice(index, 1, { ...formData })
      ElMessage.success('修改成功')
    }
    resetForm()
    openDialog.value = false
  })
}

// 重置表单
const resetForm = () => {
  Object.assign(formData, initForm)
}

// 取消
const cancel = () => {
  resetForm()
  openDialog.value = false
}

// 删除
const del = (row) => {
  ElMessageBox.confirm(`确定删除字典 "${row.dictName}"?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const index = filteredData.value.findIndex((item) => item.id === row.id)
      filteredData.value.splice(index, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

// 分页事件
const handleSizeChange = (val) => {
  queryParams.pageSize = val
}
const handleCurrentChange = (val) => {
  queryParams.currentPage = val
}
</script>
  
<style lang="scss" scoped>
// el-table
@use '../../../styles/components/publicttable.scss';
// from表单
@use '../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../styles/components/publicesearch.scss';
.dictionary {
  width: 100%;
  .dictionary_header {
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
  .dictionary_contnet {
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
@use '../../../styles/components/publicdown.scss';
</style>
  