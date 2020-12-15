import request from 'umi-request';

import getPort from '@/services/global'

// 社团指导 成员列表 获取列表
export async function searchList (params: {Session: string, Name: string, PersonId: string, PageSize: string, PageIndex: string}) {
  return request.get(getPort('member/getmemorylist'), {params: params})
}

// 社团指导 成员列表 下载
export async function downLoad (data: string[]) {
  return request.post(getPort('member/export'), {headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }, responseType: 'blob', data: data})
}