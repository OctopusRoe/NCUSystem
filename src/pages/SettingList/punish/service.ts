import request from 'umi-request';

//获取全局公共url的函数
import getPort from '@/services/global';

//系统设置 违纪管理 获取违纪列表数据
export async function queryPunish (params: {
  PersonId?: string;
  PageSize: number;
  PageIndex: number;
}) {
  return request.get(getPort('violatediscipline/query'), { params: params });
}

// 系统设置 违纪管理 模板下载
export async function getPunishTemplate () {
  return request.get(getPort('violatediscipline/template'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob'})
}

// 系统设置 违纪管理 导入
export async function upLoadPunish (data: FormData) {
  return request.post(getPort('violatediscipline/import'), {data: data})
}

