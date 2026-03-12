<!--
 * @Author: 孙海涛 973316286@qq.com
 * @Date: 2025-02-11 15:22:27
 * @LastEditors: 孙海涛 973316286@qq.com
 * @LastEditTime: 2025-02-11 16:23:23
 * @FilePath: \vue-project\src\components\common\iconfont\SvgIcon.vue
 * @Description: 阿里巴巴矢量图标库 SVG 组件封装 无需手动引入,common文件夹下组件自动引入，直接使用即可
 * 参考 csdn https://blog.csdn.net/qq_45438471/article/details/132778617
-->
<template>
    <svg aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

// 父组件传入参数
const props = defineProps({
    iconName: {
        type: String,
        required: true // 必须传入
    },
})

// 图标在 iconfont 中的名字
const iconName = computed(()=>{
  return `#${props.iconName}`
})
</script>

<style scoped>

</style>
