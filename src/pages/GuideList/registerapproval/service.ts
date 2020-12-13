import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

//社团指导  注册审批  获取注册审批列表
export async function queryRegisterapproval(
  params: { Name: string; Status: boolean },
  data: FormData,
) {
  return request.post(getPort('registapproval/queryregisterapproval'), {
    params: params,
    data: data,
  });
}

//社团指导  注册审批  删除注册审批
export async function deleteRegisterapproval(params: { Id: string }) {
  return request.get(getPort('registapproval/deleteregisterapproval'), { params: params });
}

//社团指导  注册审批  查看申请详情
export async function getDetail(params: { Id: string }) {
  return request.post(getPort('registapproval/getdetail'), { params: params });
}

//社团指导  注册审批  审核
export async function registerAudit(params: { Id: string; Status: number }) {
  return request.get(getPort('registapproval/registeraudit'), { params: params });
}
