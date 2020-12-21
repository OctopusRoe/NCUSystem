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
export async function getApplyDetail(params: { Id: string }) {
  return request.get(getPort('activity/getdetail'), { params: params });
}

// 活动管理  删除申请
export async function deleteApply(params: { Id: string }) {
  return request.delete(getPort('activity/deleteapply'), { params: params });
}

//活动管理  填写审批人
export async function applyGuidance(data: FormData) {
  return request.post(getPort('activity/applyguidance'), { data: data });
}

//获取指导老师列表
export async function getTeacherList(params: { CommunityId: string; IsApplyCommunity: boolean }) {
  return request.get(getPort('community/getteacherlist'), { params: params });
}

//获取审批进度列表
export async function getProcessList(params: { Id: string }) {
  return request.get(getPort('community/process'), { params: params });
}
