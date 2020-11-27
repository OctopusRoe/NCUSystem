import request from 'umi-request'

// 获取全局公共URL的函数
import getPort from '@/services/global'

// 获取图片
export async function getPhoto (patch: string) {
  return request.get(getPort('image/') + patch, {headers: {'Content-Type': 'image/*'}, responseType: 'blob'})
}

// 应用管理 应用管理 新增
export async function createControl (data: FormData) {
  return request.put(getPort('application/applicationcreateorupdate'), {data: data})
}

// 应用管理 应用管理 获取列表
export async function searchControl (params: {query?: string, PageSize: number, PageIndex: number}) {
  return request.get(getPort('application/getapplications'), {params: params})
}

// 应用管理 应用管理 删除
export async function deleteControl (params: {id: number}) {
  return request.delete(getPort('application/applicationdelete'), {params: params})
}

// 应用管理 应用管理 导出
export async function downloadControl () {
  return request.get(getPort('application/export'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
}

// 应用管理 应用类别 查询
export async function getControl () {
  return request.get(getPort('application/getapplicationmenus'))
}

// 应用管理 应用类别 修改
export async function upControl (data: FormData) {
  return request.put(getPort('application/applicationmenucreateorupdate'), {data: data})
}