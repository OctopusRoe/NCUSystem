// 应用类别 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getControl, upControl } from '../../service'

import { CategoryState } from '../../data'

export interface CategoryModelType {
  namespace: string
  state: CategoryState
  reducers: {
    saveCategory: Reducer<CategoryState>
  },
  effects: {
    getCategory: Effect
    upCategory: Effect
  }
}

const categoryModel: CategoryModelType = {
  namespace: 'controlCategory',
  state: {
    valueList: []
  },
  reducers: {
    saveCategory (state, { payload }) {
      
      if ( !Array.isArray(payload) ) {
        message.error('服务器返回了错误的数据')
        console.error('服务器返回了错误的数据')
        return
      }
      const newState = JSON.parse(JSON.stringify(state))
      newState.valueList = payload.map((item: {id: number, name: string}) => ({one: item.name, id: item.id}))

      return {
        ...newState
      }
    }
  },
  effects: {
    *getCategory ({ payload }, { call, put }) {
      const back = yield call(getControl)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'saveCategory',
        payload: back.data
      })
    },

    *upCategory ({ payload }, { call, put }) {
      const back = yield call(upControl, payload)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'saveCategory',
        payload: back.data
      })
      message.success('更新成功')
    }
  }
}

export default categoryModel