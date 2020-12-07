import request from 'umi-request';

import getPort from '@/services/global';

//社团管理  成员管理  获取社团成员列表
export async function searchMember(params: {
  name?: string;
  session?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('communityguidancemember/getcommunityguidancememberlist'), {
    params: params,
  });
}

//社团管理  成员管理  导出社团成员列表
export async function downLoadMember(params: { PresonId: string }) {
  return request.get(getPort('communityguidancemember/export'), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    responseType: 'blob',
    params: params,
  });
}

// 社团管理  成员管理  修改社团成员列表
export async function memberUpdata(data: FormData) {
  return request.post(getPort('communityguidancemember/update'), { data: data });
}

// 社团管理  成员管理   删除
export async function deleteMember(params: { dPersonId: string }) {
  return request.delete(getPort('communityguidancemember/delete'), { params: params });
}

// 社团管理  成员管理  新增社团成员
export async function addMember(data: { params: {}; data: {} }) {
  return request.put(getPort('communityguidancemember/create'), { ...data });
}
