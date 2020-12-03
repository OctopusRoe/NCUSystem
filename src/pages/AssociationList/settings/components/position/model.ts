// 职位设置 model

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
      newState.positionList = payload
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
        positionList: [],
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
        Id: payload.id ? payload.id : '0',
        Name: payload.name,
        Responsible: payload.responsible === '1' ? true : false,
        Backbone: payload.backbone === '1' ? true : false,
        rank: parseInt(payload.rank)
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

      const data = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1
      }

      const back = yield call(searchPosition, data)
      if (back.code !== 0 ) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'savePosition',
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