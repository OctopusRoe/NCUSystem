// 网络平台 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getOnlinePlatform, upOnlinePlatform } from '../../service'

import { OnlinePlatformState } from '../../data'

export interface OnlinePlatformType {
  namespace: string
  state: OnlinePlatformState
  reducers: {
    saveType: Reducer<OnlinePlatformState>
  }
  effects: {
    getType: Effect
    upType: Effect
  }
}

const onlinePlatformModel: OnlinePlatformType = {
  namespace: 'baseOnlinePlatform',
  state: {
    valueList: []
  },
  reducers: {
    saveType (state: any, {payload}) {
      
      if ( !Array.isArray(payload) ) {
        console.log('服务器返回了错误的数据')
        return
      }

      state.valueList = payload.map((item: {id: number, name: string, status: number}) => ({one: item.name, id: item.id}))

      return {
        ...state
      }
    }
  },
  effects: {
    *getType(_, { put, call }) {
      const back = yield call(getOnlinePlatform)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveType',
        payload: back.data
      })
    },

    *upType({ payload }, { call, put }) {
      const back = yield call(upOnlinePlatform, payload)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveType',
        payload: back.data
      })
      message.success('创建成功')
    }
  }
}

export default onlinePlatformModel