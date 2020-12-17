import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

//活动管理  活动申请
export async function activeApply(data: FormData) {
  return request.put(getPort('activity/applyorupdate'), { data: data });
}

//活动管理  查询我的社团活动申请列表
export async function getApplyList(params: { PageSize: number; PageIndex: number; Name: string }) {
  return request.get(getPort('activity/myapplylist'), { params: params });
}

//活动管理   查看活动详情
export async function getApplyDetail(params: { PersonId: string; Id: string }) {
  return request.get(getPort('activity/getdetail'), { params: params });
}
