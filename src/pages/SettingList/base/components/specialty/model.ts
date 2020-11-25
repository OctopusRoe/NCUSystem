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
    loading: Reducer<SpecialtyState>
    cleanState: Reducer<SpecialtyState>
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
    count: 0,
    loading: true
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
    },

    loading (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.loading = payload
      return {
        ...newState
      }
    },

    cleanState () {
      const state = {
        specialtyList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addSpecial ({ payload }, { call }) {

    },
    
    *searchSpecial ({ payload }, { call, put}) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchSpecial, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }

      yield put({
        type: 'saveSpecial',
        payload: back.data
      })

      yield put({
        type: 'saveCount',
        payload: back.count
      })

      yield put({
        type: 'loading',
        payload: false
      })
    }
  }
}

export default specialtyModel