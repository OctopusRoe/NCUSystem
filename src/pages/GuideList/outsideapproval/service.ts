import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

//社团指导    获取外出审批列表
export async function queryOutRegistrationApproval(params: {
  Name: string;
  Status: number;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('outregistrationapproval/query'), { params: params });
}

//社团指导    删除外出审批
export async function deleteOutRegistrationApproval(params: { Id: string }) {
  return request.delete(getPort('outregistrationapproval/delete'), { params: params });
}

//社团指导   查看外出审批详情
export async function getDetail(params: { Id: string }) {
  return request.get(getPort('outregistrationapproval/detail'), { params: params });
}
