import request from '@/utils/request';

import getPort from './global'

export async function query (): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent (): Promise<any> {
  return request('/api/currentUser');
}


// 续期 token
export async function renewalToken (params: {personId: string}) {
  return request.get(getPort('auth/renewal'), {params: params})
}

// 全局调用的接口

// 用户社团级别信息
export async function getAssociationBaseInfo () {
  return request.get(getPort('community/getinfo'))
}

// 获取社团级别列表
export async function getAssociationLevel () {
  return request.get(getPort('sysbasiccommunitylevel/getsysbasiccommunitylevellist'))
}

// 获取社团类别列表
export async function getAssociationType () {
  return request.get(getPort('sysbasiccommunitytype/getsysbasiccommunitytypelist'))
}

// 获取学年列表
export async function getSchoolYear (params: {PageSize: number, PageIndex: number}) {
  return request.get(getPort('sysbasicschoolyear/getsysbasicschoolyearlist'), {params: params})
}

// 获取指导部门列表
export async function getDepartment () {
  return request.get(getPort('community/getorganization'))
}

// 获取指导老师列表
export async function getTeacher (params: {PersonId: string}) {
  return request.get(getPort('community/getteacher'), {params: params})
}
