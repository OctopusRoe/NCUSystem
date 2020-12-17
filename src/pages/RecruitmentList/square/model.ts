// 招新管理 招新广场 model

import { Effect, Reducer } from 'umi';
import { message } from 'antd'

import { SquareState } from './data.d';
import { searchPosterList } from './service';

interface SquareType {
  namespace: string;
  state: SquareState
  reducers: {
    saveList: Reducer<SquareState>
    loading: Reducer<SquareState>
  }
  effects: {
    searchPosterList: Effect
  }
}

const SquareModel: SquareType = {
  namespace: 'recruitmentSquare',
  state: {
    list: [],
    loading: true
  },
  reducers: {
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
    }
  },
  effects: {
    *searchPosterList ({ payload }, { put, call}) {

      const data = {
        page: {
          pageSize: payload.pageSize ? payload.pageSize : 8,
          pageIndex: payload.pageIndex ? payload.pageIndex : 1,
        },
        key: payload.key || '',
        category: payload.category || [],
        guidance: payload.guidance || null,
        orderby: payload.orderby || '',
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
        type: 'loading',
        payload: false
      })
    }
  }
}

export default SquareModel