// 学年设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { searchPosition, createPosition, deletePosition } from '../../service'

import { AssociationPositionState } from '../../data'

export interface AcademicYearModel {
  namespace: string,
  state: AssociationPositionState,
  reducers: {
    saveCount: Reducer<AssociationPositionState>
    savePosition: Reducer<AssociationPositionState>
    loading: Reducer<AssociationPositionState>
    cleanState: Reducer<AssociationPositionState>
  },
  effects: {
    addPosition: Effect
    searchPosition: Effect
    deletePosition: Effect
  }

}

const academicYearModel: AcademicYearModel = {
  namespace: 'associationPosition',
  state: {
    positionList: [],
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

    savePosition (state, { payload }) {
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
    *addPosition ({ payload }, { call }) {

      const data = {
        id: payload.id ? payload.id : 0,
        schoolYearName: payload.academicfull,
        schoolYearShortName: payload.academicsyssimple,
        startDate: payload.academictime[0].format('YYYY-MM-DDThh:mm:ss'),
        endDate: payload.academictime[1].format('YYYY-MM-DDThh:mm:ss'),
        currentYear: `${payload.defaulttime[0].format('YYYY')}-${payload.defaulttime[1].format('YYYY')}`
      }

      const back = yield call(createPosition, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      message.success('成功')
    },

    *searchPosition ({ payload }, { call, put }) {

      const data = new FormData()
      data.append('PageSize', payload.PageSize ? payload.PageSize : 20)
      data.append('PageIndex', payload.PageIndex ? payload.PageIndex : 1)
      // data.append('query', payload.query ? payload.query : '')

      const back = yield call(searchPosition, data)
      if (back.code !== 0 ) {
        message.error(back.msg)
        console.error(back.msg)
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

    *deletePosition ({ payload }, { call }) {
      
      const params = {
        id: payload
      }

      const back = yield call(deletePosition, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('删除成功')
    }
  }
}

export default academicYearModel