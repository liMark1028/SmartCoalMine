/*
 * @Author: 孙海涛 973316286@qq.com
 * @Date: 2025-02-13 17:50:34
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-15 15:01:17
 * @FilePath: \ahla-tkxt-web\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia 持久化存储依赖
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import VScaleScreen from 'v-scale-screen';
import 'amfe-flexible'
import './assets/iconfont/iconfont.js'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.use(router)
app.component('VScaleScreen', VScaleScreen)
app.use(ElementPlus,{
    locale:zhCn
})

app.mount('#app')
