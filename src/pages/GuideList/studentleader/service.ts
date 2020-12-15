import request from 'umi-request';

import getPort from '@/services/global'

// 社团指导 学生负责人 查询列表
export async function searchList (params: {Session: string, Name: string, PersonId: string, PageSize: number, PageIndex: number}) {
  return request.get(getPort('member/getmemorylist'), {params: params})
}

// 社团指导 学生负责人 导出
export async function downLoad (data: any) {
  return request.post(getPort('member/export'), {headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}, responseType: 'blob', data: data})
}
