// 活动管理 活动广场 model

import { Effect, Reducer } from 'umi';
import { message } from 'antd'

import { SquareState } from './data.d';
import { searchPosterList, getInfo, singnUp } from './service';

interface SquareType {
  namespace: string
  state: SquareState
  reducers: {
    saveList: Reducer<SquareState>
    saveCount: Reducer<SquareState>
    loading: Reducer<SquareState>
    saveInfo: Reducer<SquareState>
    clean: Reducer<SquareState>
  }
  effects: {
    searchPosterList: Effect
    signActive: Effect
    getInfo: Effect
  }
}

const SquareModel: SquareType = {
  namespace: 'activeSquare',
  state: {
    list: [],
    count: 0,
    loading: true,
    info: {}
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
    // 保存详细信息
    saveInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.info = payload
      return {
        ...newState
      }
    },
    // 清除数据
    clean () {
      return {
        list: [],
        count: 0,
        loading: true,
        info: {}
      }
    }
  },
  effects: {
    // 搜索数据
    *searchPosterList ({ payload }, { put, call }) {

      const data = {
        page: {
          pageSize: payload.pageSize ? payload.pageSize : 8,
          pageIndex: payload.pageIndex ? payload.pageIndex : 1,
        },
        key: payload.key || '',
        sponsor: payload.sponsor || null,
        orderby: payload.orderby || '',
        type: payload.type || []
      }

      const back = yield call(searchPosterList, data)
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
    *signActive ({ payload }, { put, call }) {

      const params = {
        Id: payload.Id,
        Status: payload.status
      }

      console.log(params)

      const back = yield call(singnUp, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      payload.status === 0 ? message.success('报名成功') : message.success('取消成功')

    },
    *getInfo ({ payload }, { put, call }) {
      
      const params = {
        Id: payload
      }

      const back = yield call(getInfo, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveInfo',
        payload: back.data
      })
    }
  }
}

export default SquareModel