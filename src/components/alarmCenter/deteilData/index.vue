<!--
 * @Author: wangshiwei
 * @Date: 2025-04-15 16:28:18
 * @LastEditors: wangshiwei
 * @LastEditTime: 2025-04-16 13:34:24
 * @FilePath: \ahla-tkxt-web\src\components\alarmCenter\deteilData\index.vue
 * @Description: 告警详情信息
 * 
 *  
-->

<template>
  <div class="details">
    <div class="details_header">
      <div class="details_title">详情信息</div>
    </div>
    <div class="details_contnet">
      <div class="content_l">
        <div class="name">描述：{{ list.detail }}</div>
        <div class="name">时间：{{ list.time }}</div>
        <div class="name">状态：{{ list.status }}</div>
        <div class="name">
          级别：<span :style="{ color: getColor(list.level) }">{{ list.level }}</span>
        </div>
        <div class="name">类型：{{ list.type }}</div>
      </div>
      <div class="content_r">
        <div class="photo">抓拍照片：</div>
        <img src="@/assets/image/bh/gjsheb.png" alt="" srcset="">
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Object,
    default: {},
  },
})

// 获取级别颜色
const getColor = (level) => {
  if (level == '一级') {
    return '#d23148'
  } else if (level == '二级') {
    return '#d47b33'
  } else if (level == '三级') {
    return '#dfbd33'
  } else {
    return '#22de4e'
  }
}
</script>

<style lang="scss" scoped>
.details {
  width: $tk-contnetbox-xq-width;
  height: $tk-contnetbox-xq-height;
  background: rgba(12, 51, 88, 1);
  .details_header {
    width: $tk-contnetbox-xq-width;
    height: $tk-contnetbox-xq-bt-height;
    padding: 10px 10px;
    box-sizing: border-box;
    .details_title {
      font-size: 16px;
      font-family: 'PUHUITI65';
      font-weight: 500;
      background: linear-gradient(to bottom, #f5f8fb, #c5d9ec, #6a99c3, #1a609d);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  .details_contnet {
    height: $tk-contnetbox-xq-text-height;
    background: rgba(2, 169, 240, 0.2);
    margin: 10px;
    display: flex;
    justify-content: space-between;
    .content_l {
      .name {
        color: #fff;
        padding: 0 10px;
        box-sizing: border-box;
        line-height: 35px;
        font-size: 14px;
      }
    }
    .content_r {
        line-height: 35px;
        padding-right: 10px;
        .photo{
            color: #fff;
            font-size: 14px;
        }
    }
  }
}
</style>
