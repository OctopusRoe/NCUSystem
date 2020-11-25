// 学年设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createAcademicYear, searchAcademicYear } from '../../service'

import { AcademicYearState } from '../../data'

import moment from 'moment'

export interface AcademicYearModel {
  namespace: string,
  state: AcademicYearState,
  reducers: {
    saveCount: Reducer<AcademicYearState>
    saveAcademicYear: Reducer<AcademicYearState>
    loading: Reducer<AcademicYearState>
    cleanState: Reducer<AcademicYearState>
  },
  effects: {
    addAcademicYear: Effect
    searchAcademicYear: Effect
  }

}

const academicYearModel: AcademicYearModel = {
  namespace: 'baseAcademicYear',
  state: {
    academicYearList: [],
    count: 0,
    loading: true
  },
  reducers:{
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },

    saveAcademicYear (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.academicYearList = payload
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
        academicYearList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addAcademicYear ({ payload }, { call }) {
      const back = yield call(createAcademicYear, payload)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      message.success('创建成功')
    },

    *searchAcademicYear ({ payload }, { call, put }) {

      const params = {
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchAcademicYear, params)
      if (back.code !== 0 ) {
        message.error(back.message)
        console.log(back.message)
        return
      }

      yield put({
        type: 'saveAcademicYear',
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

export default academicYearModel