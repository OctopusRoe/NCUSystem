// 社团级别 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getAssociationGrade, upAssociationGrade } from '../../service'

export interface AssociationGradeState {
  valueList: {one: string,id: number}[]
}

export interface AssociationGradeType {
  namespace: string
  state: AssociationGradeState
  reducers: {
    saveGrade: Reducer<AssociationGradeState>
  }
  effects: {
    getGrade: Effect
    upGrade: Effect
  }
}

const associationGradeModel: AssociationGradeType = {
  namespace: 'baseAssociationGrade',
  state: {
    valueList: []
  },
  reducers: {
    saveGrade(state: any, { payload }) {

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
    *getGrade({ payload }, { call, put }) {
      const back = yield call(getAssociationGrade)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveGrade',
        payload: back.data
      })
    },

    *upGrade({ payload }, { call, put }) {
      const back = yield call(upAssociationGrade(payload))
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveGrade',
        payload: back.data
      })
    }
  }
}

export default associationGradeModel