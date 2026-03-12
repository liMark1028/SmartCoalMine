/*
 * @title: API接口
 * @Autor: li yu mo
 * @Date: 2025-04-18 13:10:26
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-30 17:38:45
 * @FilePath: \ahla-tkxt-web\src\api\index.js
 */
import request from '@/utils/request';

// 登录
export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        params: {
            username,
            password
        }
    });
}

/** 视频监控模块 */
// 监控列表    摄像头树结构
export function cameraGroupTree(params) {
    return request({
        url: '/video/cameraGroup/tree',
        method: 'get',
        params
    });
}
// 获取重点摄像头分页列表
export function cameraFocus() {
    return request({
        url: '/video/camera/focus',
        method: 'get',
    });
}

/** 用户相关接口 */
// 修改用户 
export function authUser(data) {
    return request({
        url: '/auth/user',
        method: 'put',
        data
    });
}
// 获取用户详情  
export function authUserDetail(params) {
    return request({
        url: '/auth/user/detail',
        method: 'get',
        params
    });
}

// 获取用户分页列表  
export function authUserPage(data) {
    return request({
        url: '/auth/user/page',
        method: 'post',
        data
    });
}

// 修改用户密码  
export function updatePassword(data) {
    return request({
        url: '/auth/user/updatePassword',
        method: 'put',
        data
    });
}
/** 资源管理 */ 
// 中段管理 获取中段分页列表
export function mapserviceRegionPage(data) {
    return request({
        url: '/mapservice/region/page',
        method: 'post',
        data
    });
}
// 中段管理 保存中段数据
export function mapserviceRegion(data) {
    return request({
        url: '/mapservice/region',
        method: 'post',
        data
    });
}
// 中段管理 修改中段数据
export function mapserviceRegionUpdate(data) {
    return request({
        url: '/mapservice/region',
        method: 'put',
        data
    });
}
// 中段管理 删除中段数据
export function mapserviceRegionDetele(params) {
    return request({
        url: '/mapservice/region',
        method: 'delete',
        params
    });
}

// 视角管理 获取视角分页列表
export function mapserviceVisualPage(params) {
    return request({
        url: '/mapservice/visual/page',
        method: 'get',
        params
    });
}
// 视角管理 保存视角基础数据
export function mapserviceVisual(data) {
    return request({
        url: '/mapservice/visual',
        method: 'post',
        data
    });
}
// 视角管理 修改视角基础数据
export function mapserviceVisualUpdate(data) {
    return request({
        url: '/mapservice/visual',
        method: 'put',
        data
    });
}
// 视角管理 删除视角基础数据
export function mapserviceVisualDetele(params) {
    return request({
        url: '/mapservice/visual',
        method: 'delete',
        params
    });
}

/** 应急救援 */ 
// 避难硐室
// 获取视角分页列表
export function mapserviceRefugePage(data) {
    return request({
        url: '/mapservice/refuge/page',
        method: 'post',
        data
    });
}
//  保存视角基础数据
export function mapserviceRefuge(data) {
    return request({
        url: '/mapservice/refuge',
        method: 'post',
        data
    });
}
//  修改视角基础数据
export function mapserviceRefugeUpdate(data) {
    return request({
        url: '/mapservice/refuge',
        method: 'put',
        data
    });
}
//  删除视角基础数据
export function mapserviceRefugeDetele(params) {
    return request({
        url: '/mapservice/refuge',
        method: 'delete',
        params
    });
}

// 压风自救
// 获取压风自救分页列表
export function mapserviceWindPage(data) {
    return request({
        url: '/mapservice/wind/page',
        method: 'post',
        data
    });
}
//  保存压风自救基础数据
export function mapserviceWind(data) {
    return request({
        url: '/mapservice/wind',
        method: 'post',
        data
    });
}
//  修改压风自救基础数据
export function mapserviceWindUpdate(data) {
    return request({
        url: '/mapservice/wind',
        method: 'put',
        data
    });
}
//  删除压风自救基础数据
export function mapserviceWindDetele(params) {
    return request({
        url: '/mapservice/wind',
        method: 'delete',
        params
    });
}

// 供水施救
// 获取供水施救分页列表
export function mapserviceWaterPage(data) {
    return request({
        url: '/mapservice/water/page',
        method: 'post',
        data
    });
}
//  保存供水施救基础数据
export function mapserviceWater(data) {
    return request({
        url: '/mapservice/water',
        method: 'post',
        data
    });
}
//  修改供水施救基础数据
export function mapserviceWaterUpdate(data) {
    return request({
        url: '/mapservice/water',
        method: 'put',
        data
    });
}
//  删除供水施救基础数据
export function mapserviceWaterDetele(params) {
    return request({
        url: '/mapservice/water',
        method: 'delete',
        params
    });
}