import request from 'umi-request';

//获取全局公共URL的函数
import getPort from '@/services/global';

//系统设置  用户组管理  获取列表
export async function getUserGroup(params: {
  groupName?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('auth/getaccessgroups'), { params: params });
}

//系统设置  用户组管理  新增用户组
export async function addUserGroup(params: { gid: number, groupName: string, remark: string}) {
  return request.put(getPort('auth/accessgroupcreateorupdate'), { params: params });
}

//系统设置  用户组管理 删除用户组
export async function deleteUserGroup(params: { id: number }) {
  return request.delete(getPort('auth/accessgroupdelete'), { params: params });
}
