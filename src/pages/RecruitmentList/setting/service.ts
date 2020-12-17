import request from 'umi-request';

import getPort from '@/services/global'


// 招新管理 招新设置 获取列表
export async function searchList (params: {PageSize: number, PageIndex: number, Year?: number}) {
  return request.get(getPort('recruitmentsetting/getrecruitmentsettinglist'), {params: params})
}

// 招新管理 招新设置 查询部门
export async function getOrganization () {
  return request.post(getPort('community/querydepartment'))
}

// 招新管理 招新设置 查询职务
export async function searchPosition (data: {query?: string, PageSize: number, PageIndex: number}) {
  return request.post(getPort('community/queryposition'), {data: data})
}

// 招新管理 招新设置 获取设置信息
export async function getSetInfo () {
  return request.get(getPort('recruitmentsetting/querydetail'))
}

// 招新管理 招新设置 设置
export async function setting (data: FormData) {
  return request.put(getPort('recruitmentsetting/createorupdate'), {data: data})
}

// 招新管理 招新设置 新增
export async function addFunc (data: FormData) {
  return request.put(getPort('recruitmentsetting/addpostion'), {data: data})
}

// 招新管理 招新设置 修改职位招新
export async function upData (data: FormData) {
  return request.post(getPort('recruitmentsetting/updatepostion'), {data: data})
}

// 招新管理 招新设置 删除招新职位
export async function deletePostion (params: {Id: string}) {
  return request.delete(getPort('recruitmentsetting/deletepostion'), {params: params})
}