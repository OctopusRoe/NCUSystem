// 外出登记 登记列表 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { OutregistrationListState } from '../../data'

import { searchList, deleteList, searchInfo } from '../../service'

interface OutregistrationListType {
  namespace: string
  state: OutregistrationListState
  reducers: {
    saveCount: Reducer<OutregistrationListState>
    saveList: Reducer<OutregistrationListState>
    loading: Reducer<OutregistrationListState>
    cleanState: Reducer<OutregistrationListState>
    saveInfo: Reducer<OutregistrationListState>
    cleanInfo: Reducer<OutregistrationListState>
    isquery: Reducer<OutregistrationListState>
  }
  effects: {
    searchList: Effect
    deleteList: Effect
    searchInfo: Effect
  }
}

const OutregistrationListModel: OutregistrationListType = {
  namespace: 'outregistrationList',
  state: {
    list: [],
    count: 0,
    loading: true,
    info: {},
    isquery: true
  },
  reducers: {
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },
    saveList (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.list = payload
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
        list: [],
        count: 0,
        loading: true,
        info: {},
        isquery: true
      }
      return {
        ...state
      }
    },
    saveInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.info = payload
      return {
        ...newState
      }
    },
    cleanInfo (state) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.Info = {}
      newState.isquery = true
      return {
        ...newState
      }
    },
    isquery (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.isquery = payload
      return {
        ...newState
      }
    }
  },
  effects: {
    *searchList ({ payload }, { call, put }) {

      const params = {
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1
      }

      const back = yield call(searchList, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveList',
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

    *deleteList ({ payload }, { call, put }) {

      const params = {
        id: payload
      }

      const back = yield call(deleteList, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('删除成功')
    },

    *searchInfo ({ payload }, { call, put }) {
      const params = {
        Id: payload
      }

      const back = yield call(searchInfo, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveInfo',
        payload: back.data
      })

      yield put({
        type: 'isquery',
        payload: false
      })
    }
  }
}

export default OutregistrationListModel