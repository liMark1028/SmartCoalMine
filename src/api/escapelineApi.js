import request from '@/utils/request';
// 避险路线

// 保存
export function savehedgeline(data) {
    return request({
        url: '/mapservice/hedge/line',
        method: 'post',
        data
    });
}
// 修改
export function edithedgeline(data) {
    return request({
        url: '/mapservice/hedge/line',
        method: 'PUT',
        data
    });
}
// 获取
export function gethedgelinepage(data) {
    return request({
        url: '/mapservice/hedge/line/page',
        method: 'POST',
        data
    });
}
// 删除
export function dellhedgeline(hedgeLineId) {
    return request({
        url: '/mapservice/hedge/line',
        method: 'DELETE',
        params:{
            hedgeLineId
        }
    });
}