<template>
  <div class="gis-layer">
    <div class="layer-header">
      <div class="layer-title">周边设施</div>
    </div>
    <div class="layer-content">
      <div class="content_item">
        <span>类型选择：</span>
        <!-- 类型选择下拉框 -->
        <el-select v-model="selectedType" placeholder="选择类型" class="select_container">
          <el-option
            v-for="types in typeOptions"
            :key="types.label"
            :label="types.label"
            :value="types.value"
          />
        </el-select>
      </div>
      <div class="content_item">
        <span>区域选择：</span>
        <!-- 区域选择下拉框 -->
        <el-select v-model="areaType" placeholder="选择区域" class="select_container">
          <el-option
            v-for="types in areaOptions"
            :key="types.label"
            :label="types.label"
            :value="types.value"
          />
        </el-select>
      </div>
      <div class="content_item">
        <span>查询半径：</span>
        <el-input
          v-model="keyValue"
          placeholder="请输入范围"
          clearable
          class="search_input_container"
        >
          <template #append>
            <span>米</span>
          </template>
        </el-input>
      </div>
      <div class="content_item">
        <div class="item_btn">点 选</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 选中的类型
const selectedType = ref('0')
// 选中的区域
const areaType = ref('0')
// 查询范围
const keyValue = ref(100)
// 类型选项
const typeOptions = [
  { label: '全部', value: '0' },
  { label: '皮带巡检', value: '1' },
  { label: 'AI监控', value: '2' },
  { label: '视频监控', value: '3' },
]
// 区域选项
const areaOptions = [
  { label: '全部', value: '0' },
  { label: '-230', value: '-230' },
  { label: '-290', value: '-290' },
  { label: '-300', value: '-300' },
  { label: '-350', value: '-350' },
  { label: '-400', value: '-400' },
  { label: '-450', value: '-450' },
  { label: '-500', value: '-500' },
  { label: '-550', value: '-550' },
]
</script>

<style lang="scss" scoped>
.gis-layer {
  width: $tk-contnetzbbox-width;
  height: $tk-contnetzbbox-height;
  background: rgba(12, 51, 88, 0.8);
  background-size: 100% 100%;
  //   头部
  .layer-header {
    width: $tk-contnetzbbox-width;
    height: $tk-contnetzbbox-zb-height;
    //   background: $tk-contnet-bt;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .layer-title {
      font-size: 16px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(
      to bottom,
      #f5f8fb,
      #c5d9ec,
      #6a99c3,
      #1a609d,
      #1a609d,
    );
    -webkit-background-clip: text;
    color: transparent;
    }
  }
  //   内容
  .layer-content {
    width: $tk-contnetzbbox-width;
    height: $tk-contnetzbbox-zb-text-height;
    background: rgba(2, 169, 240, 0.2);
    background-size: 100% 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    line-height: 40px;
    .content_item {
      color: #97b0bf;
      :deep(.el-input-group__append) {
        box-shadow: none;
        padding: 0 12px 0 0;
      }
      span {
        color: #97b0bf;
      }
      .item_btn {
        width: 127px;
        height: 37px;
        background: url(('@/assets/image/emergency/menu.png')) no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        text-align: center;
        line-height: 37px;
        color: rgba(255, 255, 255, 0.514);
        cursor: pointer;
        &:hover{
          background: url(('@/assets/image/emergency/menus.png')) no-repeat;
          background-size: 100% 100%;
          color: rgba(255, 255, 255, 1);
        }

      }
    }
    .select_container {
      width: 127px;
      height: 27px;
      background: url('@/assets/image/humanAndVehicle/mancar/select_bg.png') no-repeat;
      background-size: 100% 100%;

      :deep(.el-select__wrapper) {
        height: 100%;
        background: transparent;
        border: none;
        box-shadow: none;
      }
      :deep(.el-select__placeholder){
        color: rgba(255, 255, 255, 1); // 文字颜色
      }

      .el-select-dropdown {
        background: transparent;
        background-image: url('@/assets/image/humanAndVehicle/mancar/select.png');
      }
    }
    .search_input_container {
      // 输入框外部容器样式
      width: 127px;
      height: 27px;
      line-height: 25px;
      background: url('@/assets/image/humanAndVehicle/mancar/select_bg.png') no-repeat;
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
        color: rgba(255, 255, 255, 1); // 文字颜色
        background: transparent;
        border: none;
      }
    }
  }
}
</style>
