// 社团指导 注销审批 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { searchList, searchInfo } from './service'

import { logoutApprovalState } from './data'

interface LogoutApprovalType {
  namespace: string
  state: logoutApprovalState
  reducers: {
    saveCount: Reducer<logoutApprovalState>
    saveList: Reducer<logoutApprovalState>
    loading: Reducer<logoutApprovalState>
    saveInfo: Reducer<logoutApprovalState>
    infoLoading: Reducer<logoutApprovalState>
    cleanInfo: Reducer<logoutApprovalState>
    clean: Reducer<logoutApprovalState>
  }
  effects: {
    searchList: Effect
    searchInfo: Effect
  }
}

const LogoutApprovalModel: LogoutApprovalType = {
  namespace: 'logoutApproval',
  state: {
    list: [],
    loading: true,
    count: 0,
    info: {},
    infoLoading: true,
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
    saveInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.info = payload
      return {
        ...newState
      }
    },
    infoLoading (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.infoLoading = payload
      return {
        ...newState
      }
    },
    cleanInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.infoLoading = true
      newState.info = {}
      return {
        ...newState
      }
    },
    clean () {
      return {
        list: [],
        loading: true,
        count: 0,
        info: {},
        infoLoading: true,
      }
    }
  },
  effects: {
    *searchList ({ payload }, { put, call }) {

      const params = {
        Name: payload.name ? payload.Name : '',
        Status: payload.status ? payload.status : null,
        PageSize: payload.pageSize ? payload.pageSize : 20,
        PageIndex: payload.pageIndex ? payload.pageIndex : 1
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

    *searchInfo ({ payload }, { put, call }) {
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
        type: 'infoLoading',
        payload: false
      })

    }
  }
}

export default LogoutApprovalModel
