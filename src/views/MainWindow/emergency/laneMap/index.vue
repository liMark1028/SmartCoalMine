<!--
 * @Author: wangshiwei
 * @Date: 2025-04-14 10:19:59
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-14 13:59:46
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\emergency\laneMap\index.vue
 * @Description: 巷道映射
 * 
 *  
-->

<template>
    <div class="lane">
        <div class="lane_header"></div>
        <div class="lane_content">
            <div class="select-all">
                <label class="checkbox-all">
                    <input class="hidden-checkbox" type="checkbox" :checked="isAllSelected"
                        @change="toggleSelectAll"><span class="custom-checkbox"></span>全部</input>
                </label>
            </div>
            <div class="line"></div>
            <!-- 选项列表 -->
            <div class="options-grid">
                <div v-for="item in items" :key="item.id" class="option-item"
                    :class="{ active: selectedItems.includes(item.id) }" @click="toggleSelect(item.id)">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 示例数据
const items = ref([
  { id: 1, label: '-230中段' },
  { id: 2, label: '-290中段' },
  { id: 3, label: '-350中段' },
  { id: 4, label: '-410中段' },
  { id: 5, label: '-470中段' },
  { id: 6, label: '-530中段' },
])

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
</script>

<style lang="scss" scoped>
.lane {
    width: 441px;
    margin-top: 16px;

    .lane_header {
        width: 441px;
        height: 39px;
        background: url('@/assets/image/emergency/hd_bt.png') no-repeat;
        background-size: 100% 100%;
    }

    .lane_content {
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
            background: url('@/assets/image/emergency/fuxuanjk.png')no-repeat;
            background-size: 100% 100%;
        }

        .hidden-checkbox:checked+.custom-checkbox {
            // background: rgba(210, 249, 255, 1);
            background: url('@/assets/image/emergency/fuxuanActive.png')no-repeat center/cover;
            background-size: 100% 100%;
            border-radius: 2px;
            width: 14px;
            height: 14px;
        }
    }
}
</style>
