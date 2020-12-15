import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

//社团指导    获取升级审批列表
export async function queryUpgradeApproval(params: {
  Name: string;
  Status: number;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('upgradeapproval/query'), { params: params });
}

//社团指导   查看升级审批详情
export async function getDetail(params: { Id: string }) {
  return request.get(getPort('upgradeapproval/detail'), { params: params });
}

//社团指导    删除升级审批
export async function deleteUpgradeApproval(params: { Id: string }) {
  return request.delete(getPort('upgradeapproval/delete'), { params: params });
}
