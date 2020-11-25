import request from 'umi-request';

//获取全局公共url的函数
import getPort from '@/services/global';

//系统设置 违纪管理 获取违纪列表数据
export async function queryPunish(params: {
  PersonId?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('violatediscipline/query'), { params: params });
}
