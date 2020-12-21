// 招新广场 我的报名 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { MysignUpState } from '../../data'

import { getMySginUpList, cancelAssociation } from '../../service'

interface MySignUpType {
  namespace: string
  state: MysignUpState
  reducers: {
    saveList: Reducer<MysignUpState>
    saveCount: Reducer<MysignUpState>
    loading: Reducer<MysignUpState>
    clean: Reducer<MysignUpState>
  }
  effects: {
    searchList: Effect
    cancelAssociation: Effect
  }
}

const MysignUpModel: MySignUpType = {
  namespace: 'mySignUp',
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
    // 搜索列表
    *searchList ({ payload }, { put, call }) {

      const params = {
        PageSize: payload.pageSize || 20,
        PageIndex: payload.pageIndex || 1,
        Year: payload.year || new Date().getFullYear()
      }

      const back = yield call(getMySginUpList, params)
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

    *cancelAssociation ({ payload }, { call }) {
      
      const params = {
        Id: payload
      }

      const back = yield call(cancelAssociation, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('取消成功')
    }
  }
}

export default MysignUpModel