import request from 'umi-request'

import getPort from '@/services/global'

// 外出登记 申请登记 获取学生信息
export function getStudentInfo (params: {PersonId: string}) {
  return request.get(getPort('community/getuser'), {params: params})
}

// 外出登记 申请登记 提交申请
export function upFormValue (data: FormData) {
  return request.put(getPort('outregistration/apply'), {data: data})
}

// 外出登记 登记列表 获取列表
export function searchList (params: {PageSize: number, PageIndex: number}) {
  return request.get(getPort('outregistration/query'), {params: params})
}

// 外出登记 登记列表 删除
export function deleteList (params: {Id: string}) {
  return request.delete(getPort('outregistrationapproval/delete'), {params: params})
}

// 外出登记 登记列表 查询列表详情
export function searchInfo (params: {Id: string}) {
  return request.get(getPort('outregistration/getdetails'), {params: params})
}