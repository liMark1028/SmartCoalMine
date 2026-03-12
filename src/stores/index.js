/*
 $ @Author: wangshiwei
 $ @Date: 2025-04-10 16:28:51
 $ @LastEditors: wangshiwei
 $ @LastEditTime: 2025-04-23 12:51:40
 $ @FilePath: \ahla-tkxt-web\src\stores\index.js
 $ @Description: 全局数据
 $ @
 $ @ 
 $/
 */
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('counter', {
  state: () => ({
    kqData: {
      kqname:'',
      kqid:''
    },
  }),
  actions: {
    setkqData(data) {
      this.kqData.kqname = data.kqname
      this.kqData.kqid = data.kqid
    },
  },
  /**
   * 可以通过配置 persist 来定制存储的行为。常见的选项包括：
   * enabled: 是否启用持久化（默认为 true）。
   * storage: 存储类型，默认为 localStorage，可以设置为 sessionStorage 或自定义存储。
   * paths: 指定哪些 state 需要被持久化。
   * key: 自定义存储的 key 名称，默认是 store 的名字。
   */
  persist: {
    enabled: true, // 启用持久化
    storage: localStorage, // 使用 localStorage 存储
    paths: ['kqData'], // 只持久化 count
  },
})
