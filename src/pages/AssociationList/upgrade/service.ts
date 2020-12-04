import request from 'umi-request';

import getPort from '@/services/global'

export async function fakeSubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

// 升级社团
export async function upAssociationLevel (data: FormData) {
  return request.post(getPort('community/upgradeapproval'), {data: data})
}