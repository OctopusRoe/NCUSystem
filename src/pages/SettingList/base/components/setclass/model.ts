// 班级设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createClass, searchClass } from '../../service'

import { SetClassState } from '../../data'

export interface SetClassModel {
  namespace: string
  state: SetClassState
  reducers: {
    saveCount: Reducer<SetClassState>
    saveClass: Reducer<SetClassState>
  }
  effects: {
    addClass: Effect
    searchClass: Effect
  }
}

const setClassModel: SetClassModel = {
  namespace: 'baseSetClass',
  state: {
    classList: [],
    count: 0
  },
  reducers: {
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },

    saveClass (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.classList = payload
      return {
        ...newState
      }
    }
  },
  effects: {
    *addClass ({ payload }, { call }) {

    },

    *searchClass ({ payload }, { call, put }) {

    }
  }
}

export default setClassModel