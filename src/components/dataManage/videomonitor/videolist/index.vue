<!--
 * @Author: wangshiwei
 * @Date: 2025-04-16 13:03:46
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-28 17:03:13
 * @FilePath: \ahla-tkxt-web\src\components\dataManage\videomonitor\videolist\index.vue
 * @LastEditors: wangshiwei
 * @LastEditTime:2025年4月17日11:04:34
 *              1、添加视频分组新增页面
                2、添加点击tree切换右侧列表
 * @LastEditors: wangshiwei
 * @LastEditTime:2025年4月22日17:42:33
 *              1、视频分组新增、修改、删除功能
                2、视频列表根据接口渲染
 * @LastEditTime:2025年4月23日11:00:06
 *              1、视频列表搜索、新增、修改、删除功能
				        2、修改分组节点选择问题
 * @LastEditTime:2025年4月28日17:03:12
 *              1、视频列表删除、修改数据刷新列表页码
-->

<template>
  <div class="list">
    <!-- 左侧--视频分组 -->
    <div class="list_l">
      <!-- 视频分组--头部 -->
      <div class="l_box">
        <div class="l_title">视频分组</div>
        <div class="l_create" @click="createGroup">+</div>
      </div>
      <!--视频分组--列表   -->
      <div class="l_contnet">
        <el-tree
          ref="treeRef"
          :data="treeData"
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[7]"
          :props="defaultProps"
          @node-click="handleNodeClick"
          highlight-current
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <div class="info">
                <img
                  v-if="data.childList"
                  src="@/assets/image/videoMonitoring/monitorList/compilations.png"
                  class="svgs"
                  alt="顶级节点图标"
                />
                <img
                  v-else
                  src="@/assets/image/videoMonitoring/monitorList/monitoring.png"
                  class="svgs"
                />
                <div class="infolabel" :title="data.name">{{ data.name }}</div>
              </div>
              <div class="btn">
                <span @click.stop="editGroup(data)">修</span
                ><span @click.stop="dellGroup(data)">删</span>
              </div>
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <!-- 右侧--视频列表-->
    <div class="list_r">
      <!-- 视频列表--搜索-->
      <div class="r_header">
        <div class="r_header_search">
          <span>关键字：</span>
          <el-input
            v-model="queryParams.name"
            placeholder="请输入关键字搜索"
            clearable
            @keyup.enter="handleSearch"
            class="search_input_container"
          >
          </el-input>
          <div class="search_btn"></div>
        </div>
        <div class="r_header_create" @click="createItem">+</div>
      </div>
      <!-- 视频列表--列表渲染-->
      <div class="r_table">
        <div class="data_table">
          <el-table :data="filteredData" height="540">
            <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" />
            <el-table-column prop="address" label="地点" :show-overflow-tooltip="true" />
            <el-table-column prop="cameraType" label="类型" :show-overflow-tooltip="true">
              <template #default="scope">
                <span>{{ scope.row.cameraType == 1 ? 'AI摄像头' : '普通' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" :show-overflow-tooltip="true">
              <template #default="scope">
                <span>{{ scope.row.status == 1 ? '在线' : '离线' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="groupName" label="分组" :show-overflow-tooltip="true" />
            <el-table-column prop="regionId" label="所属中段" :show-overflow-tooltip="true" />
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
          v-if="true"
            v-model:current-page="queryParams.page"
            v-model:page-size="queryParams.pageSize"
            layout="total, prev, pager, next"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background="transtarnt"
          />
        </div>
      </div>
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
        <!-- <el-form-item label="所属矿区" prop="name">
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
        </el-form-item> -->
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
        <el-form-item label="所属中段" prop="regionId">
          <el-select
            v-model="form.regionId"
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
    <!-- 新增分组 -->
    <el-dialog
      :title="titleGroup + '分组'"
      v-model="openGroup"
      width="450px"
      :append-to-body="false"
      :close-on-click-modal="false"
      class="formDialog"
    >
      <el-form ref="dialogGroupRef" :model="formGrop" :rules="rules" label-width="100px">
        <el-form-item label="所属矿区" prop="name">
          <el-select
            v-model="formGrop.diggingsId"
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
          <el-input v-model="formGrop.name" placeholder="请输入分组名称" class="search_input" />
        </el-form-item>
        <el-form-item label="排序" prop="name">
          <el-input v-model.number="formGrop.sort" placeholder="请输入排序" class="search_input" />
        </el-form-item>
        <el-form-item label="所属分组" prop="groupName">
          <el-select
            v-model="formGrop.groupNames"
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
import { computed, onMounted, reactive } from 'vue'
import {
  cameraGrouptree,
  savecameraGroup,
  delcameraGroup,
  editcameraGroup,
  camerapageList,
  cameraadd,
  cameraedit,
  delcamera,
} from '@/api/videomonitor.js'
import { useGlobalStore } from '@/stores/index'
const defaultProps = {
  children: 'childList',
  label: 'name',
}
const store = useGlobalStore()
const kqDataid = computed(() => store.kqData.kqid)
const kqDatakqname = computed(() => store.kqData.kqname)
const treeData = ref([
  // {
  //   id: 1,
  //   label: '办公区区域',
  //   children: [],
  // },
  // {
  //   id: 2,
  //   label: '地上工作区域',
  //   children: [],
  // },
  // {
  //   id: 3,
  //   label: '井下区域',
  //   children: [
  //     {
  //       id: 7,
  //       label: '350中段',
  //       children: [],
  //     },
  //     {
  //       id: 8,
  //       label: '400中段',
  //       children: [],
  //     },
  //     {
  //       id: 9,
  //       label: '450中段',
  //       children: [],
  //     },
  //     {
  //       id: 10,
  //       label: '500中段',
  //       children: [],
  //     },
  //   ],
  // },
])
// 当前点击数节点
const treeDataLabel = ref({})
// 表格数据
const filteredData = ref([])
const treeRef = ref('')
const titleGroup = ref('新增')
// 分页相关变量
const totalItems = ref(0) // 总数据量
const queryParams = ref({
  page: 1, // 当前页码
  pageSize: 10, // 每页显示数量
  //分组id
  groupId: '',
  //所属矿区
  diggingsId: kqDataid.value,
  //名称
  name: '',
})

// 新增 标题
const titleName = ref('新增')
// 是否开启新增
const openVideo = ref(false)
const dialogRef = ref(null)
const dialogGroupRef = ref(null)

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
  diggingsId: kqDataid.value,
  // 排序
  sort: 0,
  // 类型
  cameraType: null,
  // 是否重点
  isFocus: 0,
  //状态
  status: 1,
  lon: '',
  lat: '',
  height: '',
}

const form = reactive({ ...initFrom })
// 所属分组
const groupOption = ref([{ label: '根节点', value: 0 }])
// 所属中段
const sectionOption = ref([
  { label: '230', value: '230' },
  { label: '350', value: '350' },
  { label: '400', value: '400' },
  { label: '450', value: '450' },
  { label: '500', value: '500' },
])
// 类型
const cameraTypeOption = ref([
  { label: 'AI摄像头', value: '1' },
  { label: '普通', value: '2' },
])
// 状态
const statusOption = ref([
  { label: '在线', value: 1 },
  { label: '离线', value: 0 },
])
// 是否重点
const isFocusOption = ref([
  { label: '是', value: 1 },
  { label: '否', value: 0 },
])
// 所属矿区
const areaOption = ref([
  { label: '周油坊矿区', value: 1 },
  { label: '重新集矿区', value: 2 },
])
// 新增分组弹窗
const openGroup = ref(false)
// 分组表单
const initFromGroup = {}
const formGrop = reactive({
  diggingsId: kqDataid.value,
  name: '',
  sort: 0,
  groupNames: '',
  id: '',
})
// 点击的页大小
const handleSizeChange = (size) => {
  queryParams.value.pageSize = size
}
// 点击的页码
const handleCurrentChange = (val) => {
  queryParams.value.page = val
  getCameraList(queryParams)
}
// 处理搜索
const handleSearch = () => {
  queryParams.value.page = 1
  getCameraList()
}

// 新增
const createItem = () => {
  // 赋值分组
  form.groupId = treeDataLabel.value.id
  titleName.value = '新增'
  openVideo.value = true
}
//  新增--确定
const submitForm = () => {
  dialogRef.value.validate((valid) => {
    if (!valid) return
    if (titleName.value == '新增') {
      // form.diggingsId = 1
      if (form.diggingsId) {
        cameraadd(form).then((res) => {
          if (res.code == 200) {
            queryParams.value.page = 1
            getCameraList()
            reset()
            ElMessage.success('创建成功')
            openVideo.value = false
          }
        })
      }
    } else {
      // form.diggingsId = 1
      cameraedit(form).then((res) => {
        if (res.code == 200) {
          queryParams.value.page = 1
          getCameraList()
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
      delcamera(row.id).then((res) => {
        if (res.code == 200) {
          queryParams.value.page = 1
          getCameraList()
          ElMessage.success('删除成功')
        }
      })
    })
    .catch(() => {
      // catch error
      ElMessage.info('已取消删除')
    })
}
// tree 点击
const handleNodeClick = (nodeData, node) => {
  filteredData.value = []
  if (Array.isArray(nodeData.childList)) {
    if (node.exposed) {
      node.collapse()
    } else {
      node.expand()
    }
    //赋值分组
    treeDataLabel.value = nodeData
    // 右侧表渲染
    getCameraList()
  }
}
// 分组删除
const dellGroup = (row) => {
  ElMessageBox.confirm('是否确认删除分组名称为"' + row.name + '"的数据项?')
    .then(() => {
      //   done()
      console.log('row,', row)
      delcameraGroup(row.id).then((res) => {
        if (res.code == 200) {
          cameraGrouptreeList()
          ElMessage.success('删除成功')
        }
      })
    })
    .catch(() => {
      // catch error
      ElMessage.info('已取消删除')
    })
}
// 分组编辑
const editGroup = (row) => {
  formGrop.groupNames = row.id
  Object.assign(formGrop, row)
  titleGroup.value = '编辑'
  openGroup.value = true
}

// 获取视频列表
const getCameraList = () => {
  queryParams.value.diggingsId = treeDataLabel.value.diggingsId
  let obj = queryParams.value
  camerapageList(obj).then((res) => {
    if (res.code == 200) {
      filteredData.value = res.data.list
      totalItems.value = res.data.total
      console.log('totalItems.value',totalItems.value);
      
    }
  })
}

// 自动选择第一个有效节点
const autoSelectFirstNode = async () => {
  // 查找第一个有children的节点
  const findFirstValidNode = (nodes) => {
    for (const node of nodes) {
      if (Array.isArray(node.childList)) {
        return node
      }
      if (node.childList?.length) {
        const childNode = findFirstValidNode(node.childList)
        if (childNode) return childNode
      }
    }
    return null
  }
  const firstNode = findFirstValidNode(treeData.value)
  if (firstNode) {
    // 设置当前选中节点
    treeRef.value.setCurrentKey(firstNode.id)
    // 赋值树节点label
    treeDataLabel.value = firstNode
    // 加载对应数据
    getCameraList()
  }
}
// 分组新增
const createGroup = () => {
  // 赋值分组
  formGrop.groupNames = treeDataLabel.value.id
  titleGroup.value = '新增'
  openGroup.value = true
}
// 重置表单分组
const resetGroup = () => {
  Object.assign(formGrop, initFromGroup)
}
const submitFormGroup = () => {
  dialogGroupRef.value.validate((valid) => {
    if (!valid) return

    if (titleGroup.value == '新增') {
      let obj = {
        pid: formGrop.groupNames,
        name: formGrop.name,
        sort: formGrop.sort,
        diggingsId: formGrop.diggingsId,
      }
      savecameraGroup(obj).then((res) => {
        if (res.code == 200) {
          cameraGrouptreeList()
          ElMessage.success('创建成功')
          resetGroup()
          openGroup.value = false
        }
      })
    } else {
      let obj = {
        name: formGrop.name,
        sort: formGrop.sort,
        diggingsId: formGrop.diggingsId,
        id: formGrop.id || '',
      }
      editcameraGroup(obj).then((res) => {
        if (res.code == 200) {
          cameraGrouptreeList()
          ElMessage.success('更新成功')
          resetGroup()
          openGroup.value = false
        }
      })
    }
  })
}
const cancelGroup = () => {
  resetGroup()
  openGroup.value = false
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
  cameraGrouptree(kqDataid.value).then((res) => {
    if (res.code == 200) {
      treeData.value = res.data
      // 选择第一个有效节点
      autoSelectFirstNode()
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        // 执行转换
        const flatArray = flattenNodes(res.data)
        // 查看结果
        groupOption.value.push(...flatArray)
      }
    }
  })
}
// 初始化自动选择
onMounted(() => {
  // 摄像头树结构
  cameraGrouptreeList()
})
</script>

<style lang="scss" scoped>
// el-table
@use '../../../../styles/components/publicttable.scss';
// from表单
@use '../../../../styles/components/publicfrom.scss';
// 搜索表单
@use '../../../../styles/components/publicesearch.scss';

.list {
  width: 100%;
  height: 700px;
  display: flex;
  padding: 10px 0;
  box-sizing: border-box;

  .list_l {
    width: 200px;
    background: rgba(12, 51, 88, 0.8);

    .l_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-family: 'PUHUITI65';
      font-size: 16px;
      width: 90%;
      height: 30px;
      margin: 0 auto;

      .l_create {
        cursor: pointer;
      }
    }

    .l_contnet {
      width: 90%;
      height: 640px;
      margin: 0 auto;
      background: rgba(2, 169, 240, 0.284);
      padding: 5px 0;
      box-sizing: border-box;

      :deep(.el-tree) {
        //   width: 275px;
        background: transparent;
        color: #fff;
        margin: 0 10px;

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
            //   height: 32px;
            //   background-image: url('@/assets/image/videoMonitoring/monitorList/packUp.png');
            margin-top: 5px;
          }
        }

        .el-tree-node__content > label.el-checkbox {
          margin-left: 4px;
        }

        .el-tree-node__content {
          height: 30px;
          line-height: 30px;
          border-radius: 3px;

          &:hover {
            background: rgb(22, 229, 227, 0.5);
            background-size: 100% 100%;
          }
        }

        .el-tree-node.is-current > .el-tree-node__content {
          background: rgb(22, 229, 227, 0.5);
        }

        .svgs {
          margin: 0 10px;
          width: 13px;
          height: 14px;
        }

        .el-checkbox__inner {
          width: 17px;
          height: 17px;
          background: url('@/assets/image/emergency/fuxuanjk.png') no-repeat;
          background-size: 100% 100%;
          border: none;
        }

        // 隐藏默认箭头图标
        .el-tree-node__expand-icon {
          display: none;
        }
      }

      .custom-tree-node {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .info {
        width: 70%;
        display: flex;
        align-items: center;
        .infolabel {
          width: 66%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
        }
      }

      .btn {
        width: 28%;
        display: flex;
        justify-content: space-around;
      }
    }
  }

  .list_r {
    width: 80%;
    background: rgba(12, 51, 88, 0.8);
    margin-left: 10px;
    padding: 20px;
    box-sizing: border-box;

    // 头部区域
    .r_header {
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

    // 表格区域
    .r_table {
      width: 700px;

      .btnlist {
        display: flex;
        justify-content: flex-end;

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
}
</style>
<style lang="scss">
// 下拉背景
@use '../../../../styles/components/publicdown.scss';
</style>
