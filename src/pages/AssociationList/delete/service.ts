
import request from 'umi-request'

import getPort from '@/services/global'

// 社团管理 注销社团 获取成员姓名
export function getStudentName (params: {PersonId: string}) {
  return request.get(getPort('community/getuser'), {params: params})
}

// 社团管理 注销社团 注销
export function deleteAssociation (data: FormData) {
  return request.post(getPort('community/logoutapproval'), {data: data})
}