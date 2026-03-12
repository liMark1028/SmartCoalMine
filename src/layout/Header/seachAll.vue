<!--
 * @Author: wangshiwei
 * @Date: 2025-02-17 15:26:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-19 13:29:29
 * @FilePath: \mk-gis\src\layout\Header\seachAll.vue
 * @Description:
 * @Autor: wangshiwei
 * @Date: 2025年2月18日17:35:07
 * @Description: 1、修改头部全局搜素部分并添加自定义变量展示样式
 *
-->

<template>
  <div class="search_box">
    <el-input
      v-model="serachValue"
      style="max-width: 300px"
      placeholder="Please input"
      class="inputSelect"
      @keydown.enter="seacher()"
    >
      <template #prepend>
        <el-select
          v-model="seacherType"
          placeholder="请选择"
          :popper-append-to-body="false"
          class="custom-select"
        >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #append>
        <img src="@/assets/image/header/search.png" @click="seacher()" />
      </template>
    </el-input>
    <div
      class="span8"
      @click="changeEquiment"
      :style="{ color: equimentStatus ? '#ffaa0f' : '#ffffff' }"
    >
      <img class="img" src="@/assets/image/header/equipIcon.png" />
      <div class="span9">设备管理</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 下拉选择值
const seacherType = ref('')
// 下拉选择列表
const options = ref([
  {
    label: '视频监控',
    value: '摄像头',
  },
  {
    label: '瓦斯监控',
    value: '瓦斯监控',
  },
  {
    label: '人员定位',
    value: '人员定位',
  },
  {
    label: '瓦斯编号',
    value: '设备ID',
  },
  {
    label: '电话设备',
    value: '电话设备',
  },
  {
    label: '人员路径',
    value: '人员姓名',
  },
])
// 搜素值
const serachValue = ref('')
/**
 * @description:搜素方法
 * @return {*}
 */
const seacher = () => {
  if (seacherType.value == null || seacherType.value == '') {
    ElMessage('请先选择类型')
  } else {
    if (serachValue.value == '') {
      ElMessage({
        type: 'info',
        message: '请您输入要搜索的设备名称',
      })
    } else if (seacherType.value != '人员姓名') {
      console.log('!=人员姓名')

      //   this.$bus.emit("showDate", true);
      //   this.$bus.emit("tittlelabel", true);
      //   var searchDate = serachValue.value;
      //   searchDataJie(seacherType.value, searchDate).then((searchobjDate) => {
      //     this.$bus.emit("shuju", searchobjDate);
      //   });
    } else if (seacherType.value == '人员姓名') {
      console.log('=人员姓名')
      //   this.$bus.emit("showDate", true);
      //   this.$bus.emit("tittlelabel", false);

      //   var searchDate = document.getElementById("search").value;
      //   this.$bus.emit("searchvalue", searchDate);
      //   searchDataJie(seacherType.value, searchDate).then((searchobjDate) => {
      //     this.$bus.emit("shuju", searchobjDate);
      //   });
    }
  }
}
// 设备管理flag

const equimentStatus = ref(false)
/**
 * @description: 设备管理方法
 * @return {*}
 */
const changeEquiment = () => {
  equimentStatus.value = !equimentStatus.value
}
</script>

<style lang="scss" scoped>
.search_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  .inputSelect {
    // 背景
    --el-input-bg-color: var(--el-fill-color-serachBg);
    /* 边框 */
    --el-input-border-color: var(--el-fill-color-borederColor);
    // 输入框高度
    --el-input-inner-height: calc(var(--el-common-component-size-default, 20px) - 0.01042rem);
  }

  :deep() {
    .inputSelect .el-input__inner {
      width: 200px;
      height: 20px;
      // background: $mk-allSearch-bg no-repeat;
      background-size: 100% 100%;
      padding: 0 15px;
    }
    .inputSelect .el-input-group__append {
      padding: 0 0px;
    }
    .inputSelect .el-input__wrapper:hover {
      box-shadow: none;
    }
  }
  .custom-select {
    width: 100px;
    height: 20px;
    // background: $mk-allSelect-bg no-repeat;
    background-size: 100% 100%;
  }
  .span8 {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
<style lang="scss">
// .el-select-dropdown__item span {
//   color: #000;
// }
// .el-select-dropdown__item.is-selected span {
//   color: #409eff;
// }
// .el-popper{
//     --el-input-bg-color: var(--el-fill-color-myinput);

// }
</style>
