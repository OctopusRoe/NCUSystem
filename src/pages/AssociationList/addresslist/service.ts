import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

// 社团管理 社团通讯录 获取列表
export async function searchAddreList(params: {
  PresonId?: string;
  Name?: string;
  DepartmentId?: string;
  Phone?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('communityguidancemember/queryaddressbook'), {
    params: params,
  });
}

// 社团管理 社团通讯录 导出
export async function downLoadAddressList(params: { PersonId: string }) {
  return request.get(getPort('communityguidancemember/exportaddressbook'), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    responseType: 'blob',
    params: params,
  });
}
