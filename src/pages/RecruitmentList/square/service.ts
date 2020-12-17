import request from 'umi-request';

import getPort from '@/services/global'

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}

// 招新管理 招新广场 获取广告列表
export async function searchPosterList (data: {page: {pageSize: number, pageIndex: number}, key: string, category: number[], guidance: string, orderby: string}) {
  return request.post(getPort('recruitmentsquare/getrecruitmentsquarelist'), {data: data})
}