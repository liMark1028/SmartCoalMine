<!--
 * @title: 人车列表
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-16 15:13:47
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\humanAndVehicle\mancar\index.vue
-->
<template>
  <div class="mancar">
    <div class="header"></div>
    <div class="content">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <span style="margin: 0 10px">关键字</span>
        <el-input
          v-model="searchKeyword"
          placeholder="请输入关键字搜索"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
          class="search_input_container"
        >
        </el-input>
      </div>

      <!-- 筛选条件 -->
      <div class="filters">
        <!-- 区域选择下拉框 -->
        <span style="margin-right: 5px">区域选择</span>
        <el-select v-model="selectedArea" placeholder="选择区域" clearable class="select_container">
          <el-option v-for="area in areaOptions" :key="area" :label="area" :value="area" />
        </el-select>
        <span style="margin-left: 10px; margin-right: 5px">类型选择</span>
        <!-- 类型选择下拉框 -->
        <el-select v-model="selectedType" placeholder="选择类型" clearable class="select_container">
          <el-option
            v-for="types in typeOptions"
            :key="types.label"
            :label="types.label"
            :value="types.value"
          />
        </el-select>
      </div>

      <div class="data_table">
        <el-table :data="filteredData" height="440">
          <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true" />
          <el-table-column prop="entryTime" label="入井时间" :show-overflow-tooltip="true" />
          <el-table-column prop="duration" label="入井时长" :show-overflow-tooltip="true" />
          <el-table-column prop="cardNumber" label="卡号" :show-overflow-tooltip="true" />
          <el-table-column label="操作">
            <template #default="scope">
              <div @click="handleOperation(scope.row)" class="location"></div>
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
  </div>
  <!-- 员工详情信息弹窗 -->
  <div class="details" v-if="detailsDialog">
    <div class="header">
      <div class="title">员工信息</div>
      <div class="close" @click="close"></div>
    </div>
    <div class="content">
      <div style="display: flex">
        <img src="@/assets/image/humanAndVehicle/mancar/pic.png" />
        <div class="personage">
          <div>姓名：{{ currentPerson.name }}</div>
          <div>性别：{{ currentPerson.gender || '男' }}</div>
          <div>工号：{{ currentPerson.workNumber || 'W' + currentPerson.cardNumber.slice(1) }}</div>
          <div>部门：{{ currentPerson.department || '采矿部' }}</div>
          <div>联系方式：{{ currentPerson.phone || '暂无' }}</div>
        </div>
      </div>
      <div class="run_time">
        <span>入井时间：{{ currentPerson.entryTime }}</span>
        <span>时长：{{ currentPerson.duration }}</span>
      </div>
      <div style="margin: 10px 0">监测时间：{{ new Date().toLocaleString() }}</div>
      <div>当前位置：{{ currentPerson.area || '-230中段' }}</div>
    </div>
    <div class="time">
      <span style="margin-right: 10px">时间</span>
      <el-date-picker
        v-model="dataTime"
        type="datetimerange"
        start-placeholder="开始"
        end-placeholder="结束"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="A hh:mm:ss"
        class="data_container"
      />
    </div>
    <div class="seeButton">
      <el-button type="primary" @click="see">轨迹查询</el-button>
    </div>
  </div>

  <!-- 轨迹查询弹窗 -->
  <div class="track" v-if="trackDialog">
    <div class="header">
      <div class="title">历史轨迹</div>
      <div class="trackClose" @click="trackClose"></div>
    </div>
    <div class="content">
      <el-table :data="tableData">
        <el-table-column
          type="index"
          label="序号"
          width="60"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="address"
          label="位置"
          width="140"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="time"
          label="采集时间"
          :show-overflow-tooltip="true"
          align="center"
        />
      </el-table>
      <div class="bts">
        <el-button type="primary">轨迹回放</el-button>
        <el-button type="primary">第三视角</el-button>
        <el-button type="primary">第一视角</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue-demi'

// 搜索关键词
const searchKeyword = ref('')
// 选中的区域
const selectedArea = ref('')
// 选中的类型
const selectedType = ref('')
// 详情弹窗
const detailsDialog = ref(false)
// 轨迹弹窗
const trackDialog = ref(false)
// 时间
const dataTime = ref('')
// 储存手机号
const phoneMap = ref({})
// 储存人员
const currentPerson = ref({})

// 区域选项
const areaOptions = ['-230中段', '-290中段', '-350中段']
// 类型选项
const typeOptions = [
  { label: '车辆', value: 'vehicle' },
  { label: '人员', value: 'person' },
]

const tableData = [
  { address: '运输顺槽10米处', time: '2025-03-20 16:50:31' },
  { address: '运输顺槽40米处', time: '2025-03-20 16:50:47' },
  { address: '运输顺槽70米处', time: '2025-03-20 16:51:03' },
  { address: '运输顺槽70米处', time: '2025-03-20 16:51:19' },
  { address: '运输顺槽100米处', time: '2025-03-20 16:51:35' },
  { address: '运输顺槽130米处', time: '2025-03-20 16:51:51' },
  { address: '回风顺槽50米处', time: '2025-03-20 16:52:07' },
  { address: '回风顺槽80米处', time: '2025-03-20 16:52:23' },
  { address: '回风顺槽110米处', time: '2025-03-20 16:52:39' },
  { address: '回风顺槽140米处', time: '2025-03-20 16:54:19' },
]

// 分页相关变量
const currentPage = ref(1) // 当前页码
const pageSize = ref(9) // 每页显示数量
const totalItems = ref(0) // 总数据量

// 模拟数据
const mockData = ref([])

// 增强的模拟数据生成
const generateMockData = () => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const genders = ['男', '女']
  const departments = ['采矿部', '安全部', '设备部', '运输部', '技术部']
  const areas = ['-230中段', '-290中段', '-350中段']
  const types = ['vehicle', 'person']
  const data = []

  // 初始化手机号映射
  names.forEach((name) => {
    phoneMap.value[name] = `138${Math.floor(10000000 + Math.random() * 90000000)}`
  })

  for (let i = 0; i < 50; i++) {
    const randomType = types[Math.floor(Math.random() * types.length)]
    const isPerson = randomType === 'person'
    const randomName = isPerson ? names[Math.floor(Math.random() * names.length)] : `车辆${i + 1}`
    const randomArea = areas[Math.floor(Math.random() * areas.length)]

    const hours = Math.floor(Math.random() * 10)
    const minutes = Math.floor(Math.random() * 60)

    data.push({
      id: i + 1,
      name: randomName,
      entryTime: `${Math.floor(Math.random() * 12 + 1)
        .toString()
        .padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`,
      duration: `${hours}小时${minutes}分钟`,
      cardNumber: `C${Math.floor(1000 + Math.random() * 9000)}`,
      area: randomArea,
      type: randomType,
      gender: isPerson ? genders[Math.floor(Math.random() * genders.length)] : undefined,
      department: isPerson
        ? departments[Math.floor(Math.random() * departments.length)]
        : undefined,
      phone: isPerson ? phoneMap.value[randomName] : undefined,
    })
  }
  return data
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1 // 搜索时重置到第一页
}

// 处理操作按钮点击
const handleOperation = (row) => {
  if (row.type == 'person') {
    currentPerson.value = row // 储存人员信息
    detailsDialog.value = true // 打开详情弹窗
    // 关闭轨迹弹窗
    if (trackDialog.value) {
      trackDialog.value = false
    }
  }
}

// 处理每页显示数量变化
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1 // 改变每页数量时重置到第一页
}

// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 关闭详情弹窗
const close = () => {
  detailsDialog.value = false
  trackDialog.value = false
}
// 轨迹查询
const see = () => {
  // 打开弹窗
  trackDialog.value = true
}
// 关闭历史轨迹弹窗
const trackClose = () => {
  trackDialog.value = false
}

// 计算属性：过滤后的数据
const filteredData = computed(() => {
  let result = [...mockData.value]

  // 根据搜索关键词过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) || item.cardNumber.toLowerCase().includes(keyword)
    )
  }

  // 根据区域过滤
  if (selectedArea.value) {
    result = result.filter((item) => item.area === selectedArea.value)
  }

  // 根据类型过滤
  if (selectedType.value) {
    result = result.filter((item) => item.type === selectedType.value)
  }

  // 更新总数据量
  totalItems.value = result.length

  // 分页处理
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.slice(start, end)
})

// 组件挂载时初始化模拟数据
onMounted(() => {
  mockData.value = generateMockData()
  totalItems.value = mockData.value.length
})
// 添加watch确保过滤条件变化时重置页码
watch([searchKeyword, selectedArea, selectedType], () => {
  currentPage.value = 1
})
</script>

<style lang="scss" scoped>
.mancar {
  margin-top: 15px;
  .header {
    height: 39px;
    background-image: url('@/assets/image/humanAndVehicle/mancar/subheading.png');
  }

  .content {
    height: 567px;
    padding: 10px 15px 0 15px;
    background-image: url('@/assets/image/humanAndVehicle/mancar/background_content.png');
    display: flex;
    flex-direction: column;
    gap: 5px;

    .search-bar {
      margin-bottom: 10px;

      .search_input_container {
        // 输入框外部容器样式
        width: 344px;
        height: 27px;
        line-height: 25px;
        background-image: url('@/assets/image/humanAndVehicle/mancar/input.png');
        background-size: 100% 100%;

        // 修改Element Plus输入框默认样式
        :deep(.el-input-group__wrapper) {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        :deep(.el-input__wrapper) {
          background: transparent;
          border: none;
          box-shadow: none;
        }

        :deep(.el-input__inner) {
          color: #fff; // 文字颜色
          background: transparent;
          border: none;
        }
      }
    }

    .filters {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .select_container {
        width: 137px;
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
    }

    .data_table {
      width: 406px;
      :deep(.el-table) {
        background-color: transparent;
        height: 100%;
        color: #fff;
        tr {
          background-color: transparent;
          background-image: url('@/assets/image/humanAndVehicle/mancar/list.png');
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
      :deep(.el-table__body) {
        -webkit-border-vertical-spacing: 5px; //
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

// 员工详情
.details {
  pointer-events: all;
  width: 341px;
  height: 330px;
  background: rgba(12, 51, 88, 0.8);
  position: absolute;
  right: 30px;
  top: 130px;
  font-size: 14px;
  .header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    .title {
      color: #fff;
      font-size: 16px;
      font-family: 'PUHUITI65';
    }
    .close {
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .content {
    width: 300px;
    height: 195px;
    background: rgba(2, 169, 240, 0.2);
    margin-left: 10px;
    padding: 10px 10px 0;
    img {
      width: 100px;
      margin-right: 10px;
    }
    .personage {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    // 入井时间
    .run_time {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .time {
    display: flex;
    margin: 10px;
    :deep(.data_container) {
      width: 240px;
    }
  }
  .seeButton {
    height: 40px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-right: 25px;
  }
}

// 轨迹查询
.track {
  pointer-events: all;
  width: 341px;
  height: 520px;
  background: rgba(12, 51, 88, 0.8);
  position: absolute;
  right: 30px;
  top: 490px;
  font-size: 14px;
  .header {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    .title {
      color: #fff;
      font-size: 16px;
      font-family: 'PUHUITI65';
    }
    .trackClose {
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .content {
    width: 320px;
    margin: 10px;
    :deep(.el-table) {
      background-color: transparent;
      height: 100%;
      color: #fff;

      tr {
        height: 37px;
        background: rgba(2, 169, 240, 0.2);
        margin-top: 10px;
      }

      th {
        background-color: transparent;
        color: #fff;
      }
      .el-table__row {
        height: 30px;
      }
    }
  }
  .bts {
    height: 40px;
    line-height: 40px;
    text-align: center;
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

