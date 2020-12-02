import request from 'umi-request'

import getPort from './global'

// 获取指导老师验证码
export async function getTeacherCode (params: {PersonId: string}) {
  return request.get(getPort('community/teacherapproval'), {params: params})
}

// 验证指导老师验证码
export async function validationTCode (params: {GUID: string, Code: string}) {
  return request.get(getPort('community/verifyteachercode'), {params: params})
}

// 获取指导部门验证码
export async function getDepartmentCode (params: {PersonId: string}) {
  return request.get(getPort('community/teacherapproval'), {params: params})
}

// 验证指导老师验证码
export async function validationDCode (params: {GUID: string, Code: string}) {
  return request.get(getPort('community/verifyteachercode'), {params: params})
}