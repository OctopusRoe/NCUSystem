import request from 'umi-request';

import getPort from '@/services/global';

//社团管理  成员管理  获取社团成员列表
export async function searchMember(params: {
  name?: string;
  session?: string;
  PageSize: number;
  PageIndex: number;
  Communityid: string;
}) {
  return request.get(getPort('communityguidancemember/getcommunityguidancememberlist'), {
    params: params,
  });
}
