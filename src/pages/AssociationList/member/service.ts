import request from 'umi-request';

import getPort from '@/services/global'

export async function searchMember (params: {name?: string, session?: string, PageSize: number, PageIndex: number, Communityid: string}) {
  return request.get(getPort('communityguidancemember/getcommunityguidancememberlist'), {params: params})
}
