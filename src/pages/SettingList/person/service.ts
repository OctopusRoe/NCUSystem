import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

//系统设置  用户管理  获取用户列表
export async function getPerson(params: { PageSize: number; PageIndex: number }, data: FormData) {
  return request.post(getPort('user/getusers'), { params: params, data: data });
}

//系统设置  用户管理  创建单个用户
export async function createUser(data: any) {
  return request.post(getPort('user/createuser'), { data: data });
}

// 系统设置 用户管理 删除用户
export async function deleteUser(params: { id: string }) {
  return request.get(getPort('user/deleteuser'), { params: params });
}

// 系统设置 用户管理 重置用户密码
export async function resetPassword(params: { id: string }) {
  return request.get(getPort('user/resetpwd'), { params: params });
}

// 系统设置 用户管理 模板下载
export async function getPersonTemplate() {
  return request.get(getPort('user/downloadtemplate'), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    responseType: 'blob',
  });
}

// 系统设置 用户管理 批量导入
export async function upLoadPerson(data: FormData) {
  return request.post(getPort('user/import'), { data: data });
}

// 系统设置 用户管理  修改用户状态
export async function updateUserStatus(params: { id: string; Status: number }) {
  return request.get(getPort('user/updateuserstatus'), { params: params });
}

//系统设置  用户管理   编辑用户
export async function editPerson(data: any) {
  return request.post(getPort('user/updateuser'), { data: data });
}
