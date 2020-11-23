// 系统设置 基本设置 的 model文件

import { Effect, Reducer } from 'umi';

export interface BaseModelState {

}

export interface settingListBaseModelType {
  namespace: string
  state: BaseModelState
  reducers: {

  }
  effects: {
    seveAssociationGrade: Effect
  }
}

const settingListBaseModel = {
  namespace: 'settingListBase',
  state: {},
  reducers: {},
  effects: {
    
  }
}

export default settingListBaseModel