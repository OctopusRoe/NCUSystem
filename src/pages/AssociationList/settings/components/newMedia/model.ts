// 社团管理 信息变更 网络平台组件 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { searchNewMedia } from '../../service'

import { NewMediaState } from '../../data'

export interface NewMediaType {
  namespace: string
  state: NewMediaState
  reducers: {
    saveCount: Reducer<NewMediaState>
    saveNewMedia: Reducer<NewMediaState>
    loading: Reducer<NewMediaState>
    cleanState: Reducer<NewMediaState>
  },
  effects: {
    searchNewMedia: Effect
    fixNewMedia: Effect
    deleteNewMedia: Effect
  }
}


const newMediaModel: NewMediaType = {
  namespace: 'associationNewMedia',
  state: {
    newMediaList: [],
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

    saveNewMedia (state, { payload }) {

      const newState = JSON.parse(JSON.stringify(state))
      newState.newMediaList = payload

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
        newMediaList: [],
        count: 0,
        loading: true
      }
      
      return {
        ...state
      }
    }
  },
  effects: {
    *searchNewMedia ({ payload }, { call, put }) {

      const data = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1
      }

      const back = yield call(searchNewMedia, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveNewMedia',
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

    *fixNewMedia ({ payload }, { call, put }) {

    },

    *deleteNewMedia ({ payload }, { call, put }) {

    }
  }
}

export default newMediaModel
