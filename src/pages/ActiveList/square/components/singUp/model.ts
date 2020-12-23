// 活动管理 活动广场 报名列表 model

import { Reducer, Effect } from 'umi'
import { message } from 'antd'
import { searchList } from '../../service'
import { ActiveListState } from '../../data'

interface ActiveListType {
  namespace: string
  state: ActiveListState
  reducers: {
    saveList: Reducer<ActiveListState>
    saveCount: Reducer<ActiveListState>
    loading: Reducer<ActiveListState>
    clean: Reducer<ActiveListState>
  }
  effects: {
    searchList: Effect
  }
}

const ActiveListModel: ActiveListType = {
  namespace: 'activeList',
  state: {
    list: [],
    count: 0,
    loading: true
  },
  reducers: {
     // 保存列表
     saveList (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.list = payload
      return {
        ...newState
      }
    },
    // 保存总数
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },
    // 保存 loading
    loading (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.loading = payload
      return {
        ...newState
      }
    },
    // 清除数据
    clean () {
      return {
        list: [],
        count: 0,
        loading: true
      }
    }
  },
  effects: {
    *searchList ({ payload }, { call, put }) {

      const params = {
        PageSize: payload.pageSize ? payload.pageSize : 20,
        PageINdex: payload.pageIndex ? payload.pageIndex : 1,
        Name: payload.name || ''
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
    }
  }
}

export default ActiveListModel