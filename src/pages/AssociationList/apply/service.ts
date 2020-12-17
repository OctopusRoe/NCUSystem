import request from 'umi-request';

// 获取全局公共URL的函数
import getPort from '@/services/global';

// 社团管理 社团注册申请
export async function registerApply(data: FormData) {
  return request.post(getPort('community/registerapply'), { data: data });
}

//社团管理  注册申请  获取学生信息
export async function getStudentInfo(params: { PersonId: string }) {
  return request.get(getPort('community/getuser'), { params: params });
}

//社团管理  注册申请   获取老师信息
export async function getTeacherInfo(params: { PersonId: string }) {
  return request.get(getPort('community/getteacher'), { params: params });
}
