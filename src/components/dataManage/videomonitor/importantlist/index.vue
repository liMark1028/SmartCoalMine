<!--
 * @Author: wangshiwei
 * @Date: 2025-04-16 13:06:12
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-28 17:09:08
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\videomonitor\importantlist\index.vue
 * @Description: 重点视频区域
 * 
 *  
-->

<template>
  <div class="importlist">
    <!-- <div class="importlist_header">
      <div class="r_header_search">
        <span>关键字：</span>
        <el-input v-model="queryParams.name" placeholder="请输入关键字搜索" clearable @keyup.enter="handleSearch"
          class="search_input_container">
        </el-input>
        <div class="search_btn"></div>
      </div>
      <div class="r_header_create" @click="createItem">+</div>
    </div> -->
    <div class="importlist_contnet">
      <div class="data_table">
        <el-table :data="filteredData" height="600">
          <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" />
          <el-table-column prop="address" label="地点" :show-overflow-tooltip="true" />
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true">
            <template #default="scope">
              <span>{{ scope.row.status == 1 ? '在线' : '离线' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="groupId" label="分组" :show-overflow-tooltip="true" />
          <el-table-column prop="regionId" label="所属中段" :show-overflow-tooltip="true" />
          <el-table-column label="操作" width="90">
            <template #default="scope">
              <div class="btnlist">
                <!-- <span class="location">标</span> -->
                <span class="location" @click="edit(scope.row)">修</span>
                <!-- <span class="location" @click="dell(scope.row)">删</span> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <!-- <div class="pagination">
        <el-pagination v-model:current-page="queryParams.page" v-model:page-size="queryParams.pageSize"
          layout="total, prev, pager, next" :total="totalItems" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" background="transtarnt" />
      </div> -->
    </div>
    <!-- 新增/编辑 -->
    <el-dialog
      :title="titleName"
      v-model="openVideo"
      width="450px"
      :append-to-body="false"
      :close-on-click-modal="false"
      class="formDialog"
    >
      <el-form ref="dialogRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="所属矿区" prop="name">
          <el-select
            v-model="form.diggingsId"
            disabled
            placeholder="请选择所属矿区"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in areaOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入设备名称" class="search_input" />
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-input v-model="form.address" placeholder="请输入地点" class="search_input" />
        </el-form-item>
        <el-form-item label="类型" prop="cameraType">
          <el-select
            v-model="form.cameraType"
            placeholder="请选择类型"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in cameraTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属分组" prop="groupId">
          <el-select
            v-model="form.groupId"
            placeholder="请选择所属分组"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in groupOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择状态"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否重点" prop="isFocus">
          <el-select
            v-model="form.isFocus"
            placeholder="请选择是否重点"
            class="search_input"
            popper-class="custom-select-dropdown"
          >
            <el-option
              v-for="item in isFocusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属中段" prop="regionId">
          <el-select v-model="form.regionId" placeholder="请选择所属中段" class="search_input">
            <el-option
              v-for="item in sectionOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="form.sort" placeholder="请输入排序" class="search_input" />
        </el-form-item>
        <!-- <el-form-item label="经度" prop="lon">
          <el-input v-model="form.lon" placeholder="请输入经度" class="search_input" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" class="search_input" />
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-input v-model="form.height" placeholder="请输入高度" class="search_input" />
        </el-form-item> -->
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
import { cameraGrouptree, camerafocus, cameraadd, cameraedit } from '@/api/videomonitor.js'
import { onMounted } from 'vue'
// 列表
const filteredData = ref([])
const searchKeyword = ref('')
// 分页相关变量
const totalItems = ref(0) // 总数据量
const queryParams = reactive({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示数量
  //所属矿区
  diggingsId: 1,
  //名称
  name: '',
})
// 新增 标题
const titleName = ref('新增')
// 是否开启新增
const openVideo = ref(false)
const dialogRef = ref(null)
// 弹窗表单
const initFrom = {
  id: null,
  name: '',
  address: '',
  // 分组ID
  groupId: '',
  // 分组名称
  groupName: '',
  // 所属中段
  regionId: '',
  // 所属矿区
  diggingsId:1,
  // 排序
  sort: 0,
  // 类型
  cameraType: null,
  // 是否重点
  isFocus: null,
   //状态
  status: 1,
  lon: '',
  lat: '',
  height: '',
}

const form = reactive({ ...initFrom })
// 所属中段
const sectionOption = ref([
  { label: '230', value: '230' },
  { label: '350', value: '350' },
  { label: '400', value: '400' },
  { label: '450', value: '450' },
  { label: '500', value: '500' },
])
// 是否重点
const isFocusOption = ref([
  { label: '是', value: 1 },
  { label: '否', value: 0 },
])
// 状态
const statusOption = ref([
  { label: '在线', value: 1 },
  { label: '离线', value: 0 },
])
// 所属矿区
const areaOption = ref([
  { label: '周油坊矿区', value: 1 },
  { label: '重新集矿区', value: 2 },
])
// 类型
const cameraTypeOption = ref([
  { label: 'AI摄像头', value: '1' },
  { label: '普通', value: '2' },
])
// 所属分组
const groupOption = ref([])
// 处理搜索
const handleSearch = () => {
  queryParams.value.page = 1
  camerafocusList()
}
// 新增
const createItem = () => {
  titleName.value = '新增'
  openVideo.value = true
}
//  新增--确定
const submitForm = () => {
  dialogRef.value.validate((valid) => {
    if (!valid) return
    if (titleName.value == '新增') {
      cameraadd(form).then((res) => {
        if (res.code == 200) {
          camerafocusList()
          reset()
          ElMessage.success('创建成功')
          openVideo.value = false
        }
      })
    } else {
      form.diggingsId = 1
      cameraedit(form).then((res) => {
        if (res.code == 200) {
          camerafocusList()
          reset()
          ElMessage.success('更新成功')
          openVideo.value = false
        }
      })
    }
  })
}

// 重置表单
const reset = () => {
  Object.assign(form, initFrom)
}
//  新增--取消
const cancel = () => {
  reset()
  openVideo.value = false
}
// 编辑
const edit = (row) => {
  Object.assign(form, row)
  form.diggingsId=1
  titleName.value = '修改'
  openVideo.value = true
}
// 删除
const dell = (row) => {
  ElMessageBox.confirm('是否确认删除名称为"' + row.name + '"的数据项?')
    .then(() => {
      //   done()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      // catch error
      ElMessage.info('已取消删除')
    })
}
// 列表
const camerafocusList = () => {
  camerafocus(queryParams).then((res) => {
    if (res.code == 200) {
      filteredData.value = res.data
    }
  })
}
// 摄像头树结构
const cameraGrouptreeList = () => {
  function flattenNodes(nodes, result = []) {
    for (const node of nodes) {
      // 提取需要排除的属性和保留的属性
      const { childList, cameraList, name, id, ...rest } = node

      // 构建新节点：name → label，id → value，并保留其他属性
      const newNode = {
        ...rest,
        label: name,
        value: id,
      }
      result.push(newNode) // 加入结果数组
      // 递归处理子节点（自动处理 null 值）
      flattenNodes(childList || [], result)
      // flattenNodes(cameraList || [], result)
    }
    return result
  }
  // 1 周游坊
  cameraGrouptree(1).then((res) => {
    if (res.code == 200) {
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        // 执行转换
        const flatArray = flattenNodes(res.data)
        // 查看结果
        groupOption.value.push(...flatArray)
      }
    }
  })
}
onMounted(() => {
  cameraGrouptreeList()
  camerafocusList()
})
</script>

<style lang="scss" scoped>
// el-table
@use '../../../../styles/components/publicttable.scss';
// from表单
@use '../../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../../styles/components/publicesearch.scss';

.importlist {
  width: 100%;
  color: #fff;

  .importlist_header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;

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

  .importlist_contnet {
    width: 100%;
    margin: 5px 0 0 0;
    .btnlist {
      display: flex;
      justify-content: space-between;

      span {
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
