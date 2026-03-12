/*
 * @title: 路由
 * @Autor: li yu mo
 * @Date: 2025-04-10 16:29:38
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-18 13:06:40
 * @FilePath: \ahla-tkxt-web\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/mainWindow',
      name: 'MainWindow',
      component: () => import('@/layout/index.vue'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/MainWindow/index.vue')
        },
        {
          path: '/comperhensive',
          name: 'comperhensive',
          component: () => import('@/views/MainWindow/comperhensive/index.vue')
        },
        {
          path: '/videoMonitoring',
          name: 'videoMonitoring',
          component: () => import('@/views/MainWindow/videoMonitoring/index.vue')
        },
        // 人车定位
        {
          path: '/humanAndVehicle',
          name: 'humanAndVehicle',
          component: () => import('@/views/MainWindow/humanAndVehicle/index.vue')
        },
        {
          path: '/smartDevices',
          name: 'smartDevices',
          component: () => import('@/views/MainWindow/smartDevices/index.vue')
        },
        {
          path: '/production',
          name: 'production',
          component: () => import('@/views/MainWindow/production/index.vue')
        },
        {
          path: '/emergency',
          name: 'emergency',
          component: () => import('@/views/MainWindow/emergency/index.vue')
        }
      ]
    }
  ],
})
// 路由守卫
router.beforeEach((to,_form,next)=>{
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    token ? next(): next('/login')
  }
})

export default router
