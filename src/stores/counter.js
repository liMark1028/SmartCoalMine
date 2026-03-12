/*
 * @Author: 孙海涛 973316286@qq.com
 * @Date: 2025-02-10 10:35:29
 * @LastEditors: 孙海涛 973316286@qq.com
 * @LastEditTime: 2025-02-13 18:10:59
 * @FilePath: \vue-project\src\stores\counter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    userData: {},
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    setUserData(data) {
      this.userData = data
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
    paths: ['count'], // 只持久化 count
  },
})
