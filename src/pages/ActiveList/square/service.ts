import request from 'umi-request';

import getPort from '@/services/global'

// 活动管理 活动广场 获取广告列表
export async function searchPosterList (data: {page: {pageSize: number, pageIndex: number}, key: string, sponsor: string, orderby: string, type: []}) {
  return request.post(getPort('activity/querysquare'), {data: data})
}

// 活动管理 活动广场 获取详情
export async function getInfo (params: {Id: string}) {
  return request.get(getPort('activity/querysquaredetail'), {params: params})
}

// 活动管理 活动广场 报名/取消报名
export async function singnUp (params: {Id: string, Status: number}) {
  return request.put(getPort('activity/signup'), {params: params})
}

// 活动管理 活动广场 获取报名列表
export async function searchList (params: {PageSize: number, PageIndex: number, Name: string}) {
  return request.get(getPort('activity/myapplylist'), {params: params})
}