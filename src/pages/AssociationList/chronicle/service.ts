import request from 'umi-request';

import getPort from '@/services/global';

//社团管理  大事记   获取大事记
export async function searchChronicle() {
  return request.get(getPort('memorabilia/query'));
}

//社团管理  大事记  删除大事记
export async function deleteChronicle(params: { Id: string }) {
  return request.delete(getPort('memorabilia/delete'), { params: params });
}

//社团 大事记  新增
export async function addChronicle(data: FormData) {
  return request.put(getPort('memorabilia/create'), { data: data });
}
