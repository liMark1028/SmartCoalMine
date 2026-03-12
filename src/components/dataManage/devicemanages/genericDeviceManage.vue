<template>
  <div class="device-manage">
    <div class="header">
      <div class="search-area">
        <span>关键字：</span>
        <el-input
          v-model="queryParams.searchKeyword"
          placeholder="请输入关键字搜索"
          @keyup.enter="handleSearch"
          class="search_input_container"
        />
        <span>所属中段：</span>
        <el-select
          v-model="queryParams.belongsection"
          placeholder="请选择所属中段"
          class="search_input"
          popper-class="custom-select-dropdown"
        >
          <el-option
            v-for="item in sectionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- 其他搜索条件 -->
      </div>
      <div class="create-btn" style="font-size: 20px" @click="handleCreate">+</div>
    </div>
    <div class="sensor_contnet">
      <el-table :data="tableData" :columns="config.tableColumns" :height="config.tableHeight">
        <el-table-column
          v-for="col in config.tableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="操作" width="90">
          <template #default="scope">
            <div class="action-btns">
              <span @click="handleEdit(scope.row)">修</span>
              <span @click="handleDelete(scope.row)">删</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog
      :title="dialogTitle"
      v-model="showDialog"
      :width="config.dialogWidth"
      :append-to-body="false"
      :close-on-click-modal="false"
      class="formDialog"
    >
      <el-form :model="formData" :rules="formRules" label-width="100px">
        <template v-for="field in config.formFields" :key="field.prop">
          <el-form-item :label="field.label" :prop="field.prop">
            <component
              :is="field.component || 'el-input'"
              v-model="formData[field.prop]"
              :options="field.options"
              :class="getComponentClass(field.component)"
              v-bind="getComponentProps(field)"
            >
              <template v-if="field.component == 'el-select'">
                <el-option
                  v-for="item in field.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </template>
            </component>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="mksure" @click="submitForm">确 定</div>
          <div class="mksure" @click="cancel">取 消</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true,
    default: () => ({
      // 表格字段
      tableColumns: [],
      // 新增/编辑字段
      formFields: [],
      // 所属中段
      sectionOptions: [],
      trst: '', //测试
      // 表高
      tableHeight: 100,
      // 弹窗宽度
      dialogWidth: '450px',
      // 其他配置项
    }),
  },
})

// 通用逻辑（搜索、分页、CRUD操作）
const queryParams = reactive({
  currentPage: 1, // 当前页码
  pageSize: 9, // 每页显示数量
  // 关键字
  searchKeyword: '',
  // 所属中段
  belongsection: '',
})
// 分页相关变量
const totalItems = ref(0) // 总数据量
const tableData = ref([{ name: '展示' }, { name: 'saad ' }])
const showDialog = ref(false)
const dialogTitle = ref('新增')
const formData = ref({
  /*...*/
})
// 所属中段
const sectionOptions = ref([{ label: '230', value: '230' }])
const getComponentClass = (component) => {
  return 'search_input'
  // return {
  //   'search_input':component==='el-input',
  //   'search_input':component=='el-select',
  // }
}

const getComponentProps = (field) => {
  const baseProps = field.props || {}
  const specialProps = {}

  if (field.component === 'el-select') {
    specialProps.popperClass = 'custom-popper'
  }

  return { ...baseProps, ...specialProps }
}
const handleSearch = (row) => {
  /*...*/
}
const handleCreate = () => {
  dialogTitle.value = '新增'
  showDialog.value = true
}
const handleEdit = (row) => {
  dialogTitle.value = '编辑'
  showDialog.value = true
}
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除 ${row.name}?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // props.config.api.delete(row.id)
    ElMessage.success('删除成功')
    // loadData()
  })
}
// 修改确定
const submitForm = () => {
  showDialog.value = false
}

// 修改取消
const cancel = () => {
  showDialog.value = false
}
// 加载数据
const loadData = async () => {
  try {
    const params = {
      ...queryParams,
    }
    console.log('params', params)

    // const res = await props.config.api.fetch(params)
    // tableData.value = res.data.list
    // pagination.total = res.data.total
  } catch (error) {
    ElMessage.error('数据加载失败')
    console.error('数据加载错误:', error)
  }
}
// 初始化加载
onMounted(() => {
  loadData()
  console.log('config', props.config)
})
</script>
<style lang="scss" scoped>
// from表单
@use '../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../styles/components/publicesearch.scss';
// el-table
@use '../../../styles/components/publicttable.scss';
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  color: #fff;
  .search-area {
    span {
      margin: 0 8px;
    }
  }
  .create-btn {
    font-size: 20px;
    cursor: pointer;
  }
}
.sensor_contnet {
  .action-btns {
    width: 50px;
    display: flex;
    justify-content: space-around;
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
</style>
