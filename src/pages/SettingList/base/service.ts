import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global'

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}

// 系统设置 系统设置 修改
export async function baseInfoUpdata (data: FormData) {
  return request.put(getPort('sysbasicinfo/sysbasicinfocreateorupdate'),{data: data})
}

// 系统设置 网络平台设置 查询
export async function getOnlinePlatform () {
  return request.get(getPort('sysbasicplatform/getsysbasicplatformlist'))
}

// 系统设置 网络平台设置 修改
export async function upOnlinePlatform (data: FormData) {
  return request.put(getPort('sysbasicplatform/sysbasicplatformcreateorupdateordeletebat'), {data: data})
}

// 系统设置 社团级别 查询
export async function getAssociationGrade () {
  return request.get(getPort('sysbasiccommunitylevel/getsysbasiccommunitylevellist'))
}

// 系统设置 社团级别 修改
export async function upAssociationGrade (data: FormData) {
  return request.put(getPort('sysbasiccommunitylevel/sysbasiccommunitylevelcreateorupdateordeletebat'), {data: data})
}

// 系统设置 社团类别 查询
export async function getAssociationType () {
  return request.get(getPort('sysbasiccommunitytype/getsysbasiccommunitytypelist'))
}

// 系统设置 社团类别 修改
export async function upAssociationType (data: FormData) {
  return request.put(getPort('sysbasiccommunitytype/sysbasiccommunitytypecreateorupdateordeletebat'), {data: data})
}

// 系统设置 单位类别 查询
export async function getDepartmentType () {
  return request.get(getPort('sysbasicorganizationtype/getsysbasicorganizationtypelist'))
}

// 系统设置 单位类别 修改
export async function upDepartmentType (data: FormData) {
  return request.put(getPort('sysbasicorganizationtype/sysbasicorganizationtypecreateorupdateordeletebat'))
}