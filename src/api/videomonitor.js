import request from '@/utils/request';

// 摄像头树结构
export function cameraGrouptree(diggingsId) {
    return request({
        url: '/video/cameraGroup/tree?diggingsId='+diggingsId,
        method: 'get',
    });
}
// 保存
export function savecameraGroup(data) {
    return request({
        url: '/video/cameraGroup',
        method: 'post',
        data
    });
}
// 删除
export function delcameraGroup(groupId) {
    return request({
        url: '/video/cameraGroup',
        method: 'DELETE',
        params:{
            groupId
        }
    });
}
// 修改
export function editcameraGroup(data) {
    return request({
        url: '/video/cameraGroup',
        method: 'PUT',
        data
    });
}
// 摄像头列表
export function camerapageList(data) {
    return request({
        url: '/video/camera/page',
        method: 'POST',
        data
    });
}
// 摄像头列表 新增
export function cameraadd(data) {
    return request({
        url: '/video/camera',
        method: 'POST',
        data
    });
}
// 摄像头列表 修改
export function cameraedit(data) {
    return request({
        url: '/video/camera',
        method: 'PUT',
        data
    });
}
//摄像头列表  删除
export function delcamera(cameraId) {
    return request({
        url: '/video',
        method: 'DELETE',
        params:{
            cameraId
        }
    });
}
//重点摄像头列表  
export function camerafocus(params) {
    return request({
        url: '/video/camera/focus',
        method: 'get',
        params
    });
}





