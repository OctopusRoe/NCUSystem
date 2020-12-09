import request from 'umi-request';

import getPort from '@/services/global'

// 社团指导 成员列表 获取列表
export function searchList (params: {Session: string, Name: string, PersonId: string, PageSize: string, PageIndex: string}) {
  return request.get(getPort('member/getmemorylist'), {params: params})
}

