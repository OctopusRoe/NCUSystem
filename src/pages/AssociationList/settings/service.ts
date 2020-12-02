import request from 'umi-request';

import getPort from '@/services/global'

// 社团管理 信息变更 基本信息 修改
export async function upBaseInfo (data: FormData) {
  return request.post(getPort('community/updateinfo'), {data: data})
}

// 社团管理 信息变更 部门设置 查询部门
export async function getOrganization () {
  return request.post(getPort('community/querydepartment'))
}

// 社团管理 信息变更 部门设置 修改部门
export async function upOrganization (data: {params: {}, data: {}}) {
  return request.post(getPort('community/updatedepartment'), {...data})
}

// 社团管理 信息变更 职务设置 搜索
export async function searchPosition (data: FormData) {
  return request.post(getPort('community/queryposition'), {data: data})
}

// 社团管理 信息变更 职务设置 编辑
export async function createPosition () {
  return
}

// 社团管理 信息变更 职务设置 删除
export async function deletePosition () {
  return 
}