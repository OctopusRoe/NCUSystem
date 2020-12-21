import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global'

// 系统设置 系统信息 修改
export async function baseInfoUpdata (data: FormData) {
  return request.put(getPort('sysbasicinfo/sysbasicinfocreateorupdate'),{data: data})
}

// 系统设置 指导单位设置 新增单位
export async function createDepartment (data: any) {
  return request.put(getPort('sysbasicorganization/sysbasicorganizationcreateorupdate'), {data: data})
}

// 系统设置 指导单位设置 获取列表
export async function searchDepartment (params: {query?: string, PageSize: number, PageIndex: number}) {
  return request.get(getPort('sysbasicorganization/getsysbasicorganizationlist'), {params: params})
}

// 系统设置 指导单位设置 删除
export async function deleteDepartment (params: {id: number}) {
  return request.delete(getPort('sysbasicorganization/sysbasicorganizationdelete'), {params: params})
}

// 系统设置 指导单位设置 导出
export async function downLoadDepartment () {
  return request.get(getPort('sysbasicorganization/sysbasicorganizationexport'), {headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }, responseType: 'blob'})
}

// 系统设置 学年设置 新增学年
export async function createAcademicYear (data: any) {
  return request.put(getPort('sysbasicschoolyear/sysbasicschoolyearcreateorupdate'), {data: data})
}

// 系统设置 学年设置 获取列表
export async function searchAcademicYear (params: {PageSize: number, PageIndex: number}) {
  return request.get(getPort('sysbasicschoolyear/getsysbasicschoolyearlist'), {params: params})
}

// 系统设置 学年设置 删除学年
export async function deleteAcademicYear (params: {id: number}) {
  return request.delete(getPort('sysbasicschoolyear/sysbasicschoolyeardelte'), {params: params})
}

// 系统设置 专业知识 新增专业
export async function createSpecial (data: any) {
  return request.put(getPort('sysbasicmajor/sysbasicmajorcreateorupdate'), {data: data})
}

// 系统设置 专业设置 获取列表
export async function searchSpecial (params: {query?: string, PageSize: number, PageIndex: number}) {
  return request.get(getPort('sysbasicmajor/getsysbasicmajorlist'), {params: params})
}

// 系统设置 专业设置 删除
export async function deleteSpecial (params: {id: number}) {
  return request.delete(getPort('sysbasicmajor/sysbasicmajordelte'), {params: params})
}

// 系统设置 专业设置 模板下载
export async function getSpecialTemplate () {
  return request.get(getPort('sysbasicmajor/template'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
}

// 系统设置 专业设置 导入
export async function upLoadSpecial (data: FormData) {
  return request.put(getPort('sysbasicmajor/sysbasicmajorimport'), {data: data})
}

// 系统设置 专业设置 导出
export async function downLoadSpecial () {
  return request.get(getPort('sysbasicmajor/sysbasicmajorexport'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
}

// 系统设置 班级设置 新增班级
export async function createClass (data: any) {
  return request.put(getPort('sysbasicclass/sysbasicclasscreateorupdate'), {data: data})
}

// 系统设置 班级设置 获取列表
export async function searchClass (params: {query?: string, PageSize: number, PageIndex: number}) {
  return request.get(getPort('sysbasicclass/getsysbasicclasslist'), {params: params})
}

// 系统设置 班级设置 删除
export async function deleteClass (params: {id: number}) {
  return request.delete(getPort('sysbasicclass/sysbasicclassdelte'), {params: params})
}

// 系统设置 班级设置 模板下载
export async function getClassTemplate () {
  return request.get(getPort('sysbasicclass/template'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
}

// 系统设置 班级设置 导入
export async function upLoadClass (data: FormData) {
  return request.post(getPort('sysbasicclass/import'), {data: data})
}

// 系统设置 班级设置 导出
export async function downLoadClass () {
  return request.get(getPort(''), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
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
  return request.put(getPort('sysbasicorganizationtype/sysbasicorganizationtypecreateorupdateordeletebat'), {data: data})
}

// 系统设置 活动类别 查询
export async function getActiveType () {
  return request.get(getPort('activitytype/query'))
}

// 系统设置 活动类别 修改
export async function upActiveType (data: {id: number, name: string}[]) {
  return request.post(getPort('activitytype/update'), {data: data})
}