// 社团指导 成员列表 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { MemberListState } from './data'

import { searchList, downLoad } from './service'

interface MemberListType {
  namespace: string
  state: MemberListState
  reducers: {
    saveList: Reducer<MemberListState>
    loading: Reducer<MemberListState>
    saveCount: Reducer<MemberListState>
    saveSelectRowKeys: Reducer<MemberListState>
    clean: Reducer<MemberListState>
  }
  effects: {
    searchList: Effect
    downLoad: Effect
  }
}

const MemberListModel: MemberListType = {
  namespace: 'memberListModel',
  state: {
    list: [],
    loading: true,
    count: 0,
    selectedRowKeys: [],
    selectedRows: []
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
    },

    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },

    saveSelectRowKeys (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.selectedRowKeys = payload.selectedRowKeys
      newState.selectedRows = payload.selectedRows
      return {
        ...newState
      }
    },

    clean () {
      return {
        list: [],
        loading: true,
        count: 0,
        selectedRowKeys: [],
        selectedRows: []
      }
    }
  },
  effects: {
    *searchList ({ payload }, { call, put }) {

      const params = {
        Session: payload.session ? payload.session : '',
        Name: payload.name ? payload.name : '',
        PersonId: payload.personId ? payload.personId : '',
        PageSize: payload.pageSize ? payload.pageSize : 20,
        PageIndex: payload.pageIndex ? payload.pageIndex : 1,
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

    *downLoad ({ payload }, { call, put}) {

      const back = yield call(downLoad, payload)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = '成员数据'
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }

      message.success(back.msg)
    }
  }
}

export default MemberListModel