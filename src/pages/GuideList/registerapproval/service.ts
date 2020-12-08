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
