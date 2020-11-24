import request from 'umi-request';
import { TableListParams } from './data.d';

//获取全局公共url的函数
import getPort from '@/services/global';

//系统设置 短信统计 获取短信列表数据
export async function getTable(params: TableListParams) {
  return request.get(
    getPort(`message/query?PageSize=${params.pageSize}&PageIndex=${params.current}`),
  );
}

