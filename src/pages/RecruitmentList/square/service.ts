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

// 招新管理 招新广场 下载文件
export async function downLoadFile (url: string) {
  return request.get(url, {responseType: 'blob'})
}

// 招新管理 招新广场 获取加入的社团数量
export async function getJoinNumber () {
  return request.get(getPort('recruitmentsquare/getentrynum'))
}

// 招新管理 招新广场 招新报名
export async function signAssociation (params: {Id: string}) {
  return request.put(getPort('recruitmentsquare/deleteentrycommunity'), {params: params})
}

// 招新管理 招新广场 取消报名
export async function cancelAssociation (params: {Id: string}) {
  return request.delete(getPort('recruitmentsquare/deleteentrycommunity'), {params: params})
}

// 招新管理 招新广场 我的报名 获取列表
export async function getMySginUpList (params: {PageSize: number, PageIndex: number, Year?: number}) {
  return request.get(getPort('recruitmentsetting/getmyentry'), {params: params})
}