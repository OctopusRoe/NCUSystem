import request from 'umi-request';
import { TableListParams } from './data.d';

//获取全局公共url的函数
import getPort from '@/services/global';


//系统设置 违纪管理 获取违纪列表数据
export async function getTable(params: TableListParams) {
  return request.get(
    getPort(`violatediscipline/query?PageSize=${params.pageSize}&PageIndex=${params.current}`),
  );
}
