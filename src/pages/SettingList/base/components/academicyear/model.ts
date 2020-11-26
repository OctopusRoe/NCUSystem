// 学年设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createAcademicYear, searchAcademicYear, deleteAcademicYear } from '../../service'

import { AcademicYearState } from '../../data'

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
    deleteAcademicYear: Effect
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

      const data = {
        id: payload.id ? payload.id : 0,
        schoolYearName: payload.academicfull,
        schoolYearShortName: payload.academicsyssimple,
        startDate: payload.academictime[0].format('YYYY-MM-DDThh:mm:ss'),
        endDate: payload.academictime[1].format('YYYY-MM-DDThh:mm:ss'),
        currentYear: `${payload.defaulttime[0].format('YYYY')}-${payload.defaulttime[1].format('YYYY')}`
      }

      const back = yield call(createAcademicYear, data)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
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
        console.error(back.message)
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
    },

    *deleteAcademicYear ({ payload }, { call }) {
      
      const params = {
        id: payload
      }

      const back = yield call(deleteAcademicYear, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('删除成功')
    }
  }
}

export default academicYearModel