// 专业设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createSpecial, searchSpecial } from '../../service'

import { SpecialtyState } from '../../data'

export interface SpecialtyModel {
  namespace: string
  state: SpecialtyState
  reducers: {
    saveCount: Reducer<SpecialtyState>
    saveSpecial: Reducer<SpecialtyState>
  }
  effects: {
    addSpecial: Effect
    searchSpecial: Effect
  }
}

const specialtyModel: SpecialtyModel = {
  namespace: 'baseSpecialty',
  state: {
    specialtyList: [],
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

    saveSpecial (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.specialtyList = payload
      return {
        ...newState
      }
    }
  },
  effects: {
    *addSpecial ({ payload }, { call }) {

    },
    
    *searchSpecial ({ payload }, { call, put}) {

    }
  }
}

export default specialtyModel