<!--
 * @Author: wangshiwei
 * @Date: 2025-04-10 16:28:51
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-15 14:41:57
 * @FilePath: \ahla-tkxt-web\src\layout\Header\index.vue
 * @Description: 
 * @Autor: wangshiwei
 * @Date: 2025年4月10日17:59:23
 * @Description: 1、根据样式添加并调整全局搜索样式
                2、根据样式添加并调整菜单切换样式
                 3、根据样式添加并调整右侧按钮样式
 *  
-->

<template>
  <div class="mk-header">
    <div class="mk-header_l">
      <div class="week">
        <div class="span1">{{ nowData }}</div>
        <div class="span2">{{ dayOfWeek }}</div>
        <div class="span3">{{ nowTime }}</div>
      </div>
      <div class="search_box" v-if="route.path !== '/index'">
        <el-input
          v-model="keyValue"
          placeholder="请输入关键字"
          class="input-with-select"
          @keyup.enter.native="keyList"
        >
          <template #prepend>
            <el-select v-model="selValue" placeholder="全部">
              <el-option label="全部" value="0" />
              <el-option label="视频监控" value="1" />
              <el-option label="一氧化碳" value="2" />
              <el-option label="二氧化碳" value="3" />
            </el-select>
          </template>
          <template #suffix>
            <el-icon class="el-input__icon" @click="keyList"><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <!-- 标题 -->
    <div class="mk-header_m">
      <div class="header_title"></div>
      <div class="header_menu"><menuList /></div>
    </div>
    <!-- 右侧按钮 -->
    <div class="mk-header_r">
      <div class="header_rTop"><userPage /></div>
      <div class="header_rBottom"><iconMenu /></div>
    </div>
    <div class="content-box">
      <!-- 全局搜索 -->
      <glbsearch v-if="searchFlag"></glbsearch>
      <div v-if="searchFlag" class="close-button" @click.stop="closeSearch()"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import glbsearch from '@/components/glbSearch/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 子菜单
import menuList from './menu/index.vue'
// 图标按钮
import iconMenu from './iconMenu/index.vue'
// 用户页面
import userPage from './userPage/index.vue'

// 选择值
const selValue = ref('0')
// 输入值
const keyValue = ref('')
// 是否开启搜索列表
const searchFlag = ref(false)

import dayjs from 'dayjs'
// 时间
const nowTime = ref('')
// 日期
const nowData = ref('')
// 星期
const dayOfWeek = ref('')
// 获取星期方法
const getWeekdayText = (day) => {
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekDays[day]
}
// 获取日期时间方法
const updateTime = () => {
  const now = dayjs()
  const year = now.year()
  const mon = now.month() + 1
  const day = now.date()
  const hours = now.hour()
  const minute = now.minute()
  const second = now.second()
  dayOfWeek.value = getWeekdayText(now.day())
  nowTime.value =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minute < 10 ? '0' + minute : minute) +
    ':' +
    (second < 10 ? '0' + second : second)
  nowData.value = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day)
}
// 搜索关键字
const keyList = () => {
  searchFlag.value = !searchFlag.value
}
// 搜索关闭
const closeSearch=()=>{
  searchFlag.value =false
}
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style lang="scss" scoped>
.mk-header {
  width: 100%;
  height: 130px;
  // background: $mk-header-bg;
  background-size: 100% 100%;
  display: flex;
  .mk-header_l {
    width: 25%;
    line-height: 70px;
    .week {
      display: flex;
      color: #fff;
      font-size: 14px;
      height: 50px;
      align-items: center;
      font-family: 'PUHUITI55';
      .span2 {
        margin: 0 10px;
      }
    }
    .search_box {
      width: 350px;
      :deep {
        .el-input {
          height: 35px;
          background: url('@/assets/image/global/search_bg.png') no-repeat;
          background-size: 100% 100%;
          border: none;
          .el-input-group__prepend {
            box-shadow: none;
          }
        }
      }
      :deep .el-input__wrapper {
        padding: 0 26px 0 0;
        background: transparent;
        box-shadow: none;
        .el-input__icon {
          width: 14px;
          height: 14px;
          background: url('@/assets/image/global/searchicon.png') no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          &:hover {
            background: url('@/assets/image/global/searchicon_s.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        .el-icon svg {
          height: 0em;
          width: 0em;
        }
      }

      .el-select {
        width: 100px;
        height: 30px;
        :deep .el-select__wrapper {
          height: 30px;
          text-align: center;
          box-shadow: none;
          padding-right: 20px;
        }
      }
    }
  }
  .mk-header_m {
    width: 50%;
    // display: flex;
    // justify-content: center;
    // align-items: flex-end;
    .header_title {
      width: 603px;
      height: 93px;
      background: $mk-glabal-title;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .header_menu {
      width: 1024px;
      height: 79px;
      margin: 0 auto;
      background: $mk-glabal-titleBottonBg;
      background-size: 100% 100%;
      margin: -38px 0 0 -60px;
    }
  }
  .mk-header_r {
    width: 25%;
    .header_rTop {
      display: flex;
      justify-content: flex-end;
      height: 50px;
      align-items: center;
    }
    .header_rBottom {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  .content-box {
    position: fixed;
    left: 24px;
    top: 105px;
    z-index: 99999;
    .close-button {
      position: absolute;
      right: 8px;
      top: 18px;
      z-index: 1001;
      width: 17px;
      height: 18px;
      background: url('@/assets/image/global/alarm/close.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background: url('@/assets/image/global/alarm/close.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
