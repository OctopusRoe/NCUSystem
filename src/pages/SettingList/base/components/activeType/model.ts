// 活动类别 model

import { Effect, Reducer } from 'umi'

import { message } from 'antd'

import { getActiveType, upActiveType } from '../../service'

import { ActiveTypeState } from '../../data'

interface ActiveTypeType {
  namespace: string
  state: ActiveTypeState
  reducers: {
    saveType: Reducer<ActiveTypeState>
  }
  effects: {
    getType: Effect
    upType: Effect
  }
}

const acitveTypeModel: ActiveTypeType = {
  namespace: 'baseActiveType',
  state: {
    valueList: []
  },
  reducers: {
    saveType (state: any, { payload }) {
      
      if ( !Array.isArray(payload) ) {
        message.error('服务器返回了错误的数据')
        console.log('服务器返回了错误的数据')
        return
      }
      const newState = JSON.parse(JSON.stringify(state))
      newState.valueList = payload.map((item: {id: number, name: string, status: number}) => ({one: item.name, id: item.id}))

      return {
        ...newState
      }
    }
  },
  effects: {
    *getType (_, { call, put }) {
      const back = yield call(getActiveType)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put ({
        type: 'saveType',
        payload: back.data
      })
    },
    *upType ({ payload }, { call, put}) {
      const back = yield call(upActiveType, payload)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveType',
        payload: back.data
      })

      message.success('更新成功')
    }
  }
}

export default acitveTypeModel