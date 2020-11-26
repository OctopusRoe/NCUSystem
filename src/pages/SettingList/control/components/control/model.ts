// 应用管理 组件 model

import { Effect, Reducer } from 'umi'

import { message } from 'antd'

import { createControl, searchControl, deleteControl } from '../../service'

import { ControlListState } from '../../data'

import getPort from '@/services/global'

export interface ControlModel {
  namespace: string,
  state: ControlListState,
  reducers: {
    saveCount: Reducer<ControlListState>
    saveControl: Reducer<ControlListState>
    loading: Reducer<ControlListState>
    cleanState: Reducer<ControlListState>
  },
  effects: {
    addControl: Effect
    searchControl: Effect
    deleteControl: Effect
  }
}

const controlModel: ControlModel = {
  namespace: 'controlList',
  state: {
    controlList: [],
    count: 0,
    loading: true,
  },
  reducers: {
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },

    saveControl (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.controlList = payload
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
        controlList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addControl ({ payload }, { call }) {

      const data = new FormData()

      const back = yield call(createControl, data)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('新增成功')
    },

    *searchControl ({ payload }, { call, put }) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1
      }

      const back = yield call(searchControl, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      back.data.forEach((item: any) => {
        item.src = getPort('image/') + escape(item.appIco)
      })

      yield put({
        type: 'saveControl',
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

    *deleteControl ({ payload }, { call }) {
      
      const params = {
        id: payload
      }

      const back = yield call(deleteControl, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('删除成功')
    }
  }
}

export default controlModel