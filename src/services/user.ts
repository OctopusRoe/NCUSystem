import request from '@/utils/request';

import getPort from './global'

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

// 续期 token
export async function renewalToken(params: {personId: string}) {
  return request.get(getPort('auth/renewal'), {params: params})
}