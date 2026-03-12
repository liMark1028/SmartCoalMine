<template>
  <div class="SensorMain" :style="'width:' + width + 'px'">
    <!-- 搜索框 -->
    <div class="search">
      <el-input v-model="searchValue" placeholder=""></el-input>
      <div class="search_img"></div>
    </div>
    <!-- 列表 -->
    <div class="list">
        <el-tree
    style="max-width: 600px"
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
  />
    </div>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue'
defineProps({
  width: {
    type: Number,
  },
})
const searchValue = ref('')
const defaultProps = {
  children: 'children',
  label: 'label',
}
const sortedEquitmentData = ref([
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
])
// el-tree默认打开的节点
const expandedKeys = ref([])
/**
 * 节点过滤
 */
const filterNode = (value, data) => {
  if (!value) return true
  if (!data.ssStationName) {
    return data.name.indexOf(value) !== -1
  }
}
</script>

<style lang="scss" scoped></style>
