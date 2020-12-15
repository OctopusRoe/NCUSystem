import request from 'umi-request'

import getPort from '@/services/global'

// 社团指导 注销审批 获取列表
export async function searchList (params: {Name?: string, Status?: number, PageSize: number, PageIndex: number}) {
  return request.get(getPort('logoutapproval/query'), {params: params})
}

// 社团指导 注销审批 获取详细信息
export async function searchInfo (params: {Id: string}) {
  return request.get(getPort('logoutapproval/detail'), {params: params})
}
