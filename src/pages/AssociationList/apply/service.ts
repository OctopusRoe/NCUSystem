import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

// 系统设置 系统信息 修改
export async function registerApply(data: FormData) {
  return request.post(getPort('community/registerapply'), { data: data });
}
