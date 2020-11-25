import request from 'umi-request';

//获取全局公共url的函数
import getPort from '@/services/global';

//系统设置 短信统计 获取列表
export async function queryMessage(params: {
  Phone?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('message/query'), { params: params });
}
