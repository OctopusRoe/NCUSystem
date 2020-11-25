// 社团类别 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getAssociationType, upAssociationType } from '../../service'

import { AssociationTypeState } from '../../data'

export interface AssociationTypeType {
  namespace: string
  state: AssociationTypeState
  reducers: {
    saveType: Reducer<AssociationTypeState>
  }
  effects: {
    getType: Effect
    upType: Effect
  }
}

const associationTypeModel: AssociationTypeType = {
  namespace: 'baseAssociationType',
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
      const back = yield call(getAssociationType)
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
    *upType ({ payload }, { call, put }) {
      const back = yield call(upAssociationType, payload)
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

export default associationTypeModel