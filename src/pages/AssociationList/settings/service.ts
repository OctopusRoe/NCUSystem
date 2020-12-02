import request from 'umi-request';

import getPort from '@/services/global'

// 社团管理 信息变更 基本信息
export async function getAssociationBaseInfo () {
  return request.get(getPort('community/getinfo'))
}

// 社团管理 信息变更 部门设置 查询部门
export async function getOrganization () {
  return request.post(getPort('community/querydepartment'))
}

// 社团管理 信息变更 部门设置 修改部门
export async function upOrganization (data: {params: {}, data: {}}) {
  return request.post(getPort('community/updatedepartment'), {...data})
}