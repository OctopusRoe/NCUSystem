// 招新管理 招新广场 model

import { Effect, Reducer } from 'umi';
import { message } from 'antd'

import { SquareState } from './data.d';
import { searchPosterList, downLoadFile, getJoinNumber, signAssociation, cancelAssociation } from './service';

interface SquareType {
  namespace: string;
  state: SquareState
  reducers: {
    saveList: Reducer<SquareState>
    saveCount: Reducer<SquareState>
    loading: Reducer<SquareState>
    saveSignResult: Reducer<SquareState>
    saveJoinNumber: Reducer<SquareState>
    clean: Reducer<SquareState>
  }
  effects: {
    searchPosterList: Effect
    downFile: Effect
    signAssociation: Effect
    cancelAssociation: Effect
    getJoinNumber: Effect
  }
}

const SquareModel: SquareType = {
  namespace: 'recruitmentSquare',
  state: {
    list: [],
    count: 0,
    loading: true,
    signResult: false,
    joinNumber: 0,
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
    // 保存报名结果
    saveSignResult (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.signResult = payload
      return {
        ...newState
      }
    },
    // 保存已加入社团数
    saveJoinNumber (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.joinNumber = payload
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
        signResult: false,
        joinNumber: 0,
      }
    }
  },
  effects: {
    // 搜索数据
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
        type: 'saveCount',
        payload: back.count
      })

      yield put({
        type: 'loading',
        payload: false
      })
    },

    // 下载文件
    *downFile ({ payload }, { put, call }) {

      const back = yield call(downLoadFile, payload.url)
      if (back.code && back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = `${payload.name}.docx`
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }
    },

    // 报名
    *signAssociation ({ payload }, { put, call }) {

      const back = yield call(signAssociation, payload)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveSignResult',
        payload: true
      })

      message.success('报名成功')
    },

    // 取消报名
    *cancelAssociation ({ payload }, { call }) {
      const back = yield call(cancelAssociation, payload)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.warning('取消成功')
    },

    // 得到加入社团数量
    *getJoinNumber (_, { put, call }) {
      const back = yield call(getJoinNumber)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveJoinNumber',
        payload: back.data
      })
    }
  }
}

export default SquareModel