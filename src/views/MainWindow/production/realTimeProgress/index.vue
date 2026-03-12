<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 09:20:15
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-18 11:55:11
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\production\realTimeProgress\index.vue
 * @Description: 实时进度
 * 
 *  
-->

<template>
  <div class="realprogress">
    <div class="progress-header"></div>
    <div class="progress_content">
      <div class="select-all">
        <label class="checkbox-all">
          <input
            class="hidden-checkbox"
            type="checkbox"
            :checked="isAllSelected"
            @change="toggleSelectAll"
          />
          <span class="custom-checkbox"></span><span>全部</span>
        </label>
        <el-button type="primary" @click="workArea" class="work_area">工作区域</el-button>
      </div>
      <div class="line"></div>
      <!-- 选项列表 -->
      <div class="options-grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="option-item"
          :class="{ active: selectedItems.includes(item.id) }"
          @click="toggleSelect(item.id)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
  <div class="showWork" v-if="workDialog">
    <div class="header">
      <div class="title">工作区域</div>
      <div class="close" @click="close"></div>
    </div>
    <div class="content">
      <el-table :data="tableData">
        <el-table-column prop="name" label="采矿编码" :show-overflow-tooltip="true" />
        <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" />
        <el-table-column prop="type" label="类别" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <div class="bts">
      <el-button type="primary">实时进度</el-button>
      <el-button type="primary">一步采场</el-button>
      <el-button type="primary">二步采场</el-button>
    </div>
  </div>
</template>

<script setup>
const workDialog = ref(false) //工作区域

// 生产进度 示例数据
const items = ref([
  { id: 1, label: '-230中段' },
  { id: 2, label: '-290中段' },
  { id: 3, label: '-350中段' },
  { id: 4, label: '-410中段' },
  { id: 5, label: '-470中段' },
  { id: 6, label: '-530中段' },
])

// 工作区域内容
const tableData = [
  {
    name: '450-01',
    status: '已采',
    type: '一步采场',
  },
  {
    name: '470-01',
    status: '未采',
    type: '二步采场',
  },

  {
    name: '450-02',
    status: '回填',
    type: '一步采场',
  },
  {
    name: '450-01',
    status: '已采',
    type: '一步采场',
  },
  {
    name: '470-01',
    status: '未采',
    type: '二步采场',
  },

  {
    name: '450-02',
    status: '回填',
    type: '一步采场',
  },
  {
    name: '450-01',
    status: '已采',
    type: '一步采场',
  },
  {
    name: '470-01',
    status: '未采',
    type: '二步采场',
  },
]
// 选中项集合
const selectedItems = ref([])

// 是否全选
const isAllSelected = computed(() => {
  return selectedItems.value.length === items.value.length
})

// 切换单个选项
const toggleSelect = (itemId) => {
  const index = selectedItems.value.indexOf(itemId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(itemId)
  }
}

// 全选/取消全选
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = items.value.map((item) => item.id)
  }
}

// 打开、关闭工作区域
const workArea = () => {
  workDialog.value = !workDialog.value
}
// 关闭工作区域
const close = () => {
  workDialog.value = false
}
</script>

<style lang="scss" scoped>
.realprogress {
  color: #fff;
  font-size: 14px;

  .progress-header {
    height: 39px;
    background: url('@/assets/image/production/realtimeprogress/real_bt.png') no-repeat;
    background-size: 100% 100%;
  }

  .progress_content {
    width: 441px;
    height: 263px;
    background: url('@/assets/image/emergency/gf_bg.png') no-repeat;
    background-size: 100% 100%;

    .line {
      width: 402px;
      height: 2px;
      background: url('@/assets/image/emergency/lin.png') no-repeat;
      background-size: 100% 100%;
      margin: 0px auto;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      /* 每行4列 */
      gap: 15px;
      /* 间距 */
      margin-top: 20px;
      padding: 0 18px;
      box-sizing: border-box;
    }

    .option-item {
      width: 87px;
      height: 87px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      background: url('@/assets/image/emergency/eq_sel.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
      line-height: 150px;

      &:hover {
        background: url('@/assets/image/emergency/eq_sel_s.png') no-repeat;
        background-size: 100% 100%;
      }
    }

    .option-item.active {
      width: 87px;
      height: 87px;
      background: url('@/assets/image/emergency/eq_sel_s.png') no-repeat;
      background-size: 100% 100%;
    }

    .select-all {
      width: 422px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    // 复选框样式
    .checkbox-all {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: rgba(210, 249, 255, 0.507);
    }

    .hidden-checkbox {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
    }

    .custom-checkbox {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('@/assets/image/emergency/fuxuanjk.png') no-repeat;
      background-size: 100% 100%;
    }

    .hidden-checkbox:checked + .custom-checkbox {
      background: url('@/assets/image/emergency/fuxuanActive.png') no-repeat center/cover;
      background-size: 100% 100%;
      border-radius: 2px;
      width: 14px;
      height: 14px;
    }

    .work_area {
      margin-left: 10px;
    }
  }
}

.showWork {
  height: 382px;
  width: 335px;
  position: fixed;
  top: 300px;
  left: 592px;
  background: rgba(12, 51, 88, 0.8);
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
    height: 310px;
    background: rgba(2, 169, 240, 0.2);
    margin-left: 20px;

    :deep(.el-table) {
      background-color: transparent;
      height: 100%;
      color: #fff;

      tr {
        height: 37px;
        background-color: transparent;
        margin-top: 10px;
      }

      th {
        background-color: transparent;
        color: #fff;
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
  .bts {
    margin-left: 20px;
    margin-top: 8px;
    :deep(.el-button) {
      height: 25px;
    }
  }
}
</style>
