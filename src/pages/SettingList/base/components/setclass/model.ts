// 班级设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createClass, searchClass, deleteClass, downLoadClass } from '../../service'

import { SetClassState } from '../../data'

export interface SetClassModel {
  namespace: string
  state: SetClassState
  reducers: {
    saveCount: Reducer<SetClassState>
    saveClass: Reducer<SetClassState>
    loading: Reducer<SetClassState>
    cleanState: Reducer<SetClassState>
  }
  effects: {
    addClass: Effect
    searchClass: Effect
    deleteClass: Effect
    downLoad: Effect
  }
}

const setClassModel: SetClassModel = {
  namespace: 'baseSetClass',
  state: {
    classList: [],
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

    saveClass (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.classList = payload
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
        classList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addClass ({ payload }, { call }) {

      const data = {
        id: payload.id ? payload.id : 0,
        classNo: payload.classNo,
        className: payload.className,
        majorNo: payload.majorNo,
        majorName: payload.majorName ? payload.majorName : ''
      }

      const back = yield call(createClass, data)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('创建成功')

    },

    *searchClass ({ payload }, { call, put }) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchClass, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }

      yield put({
        type: 'saveClass',
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

    *deleteClass ({ payload }, { call }) {

      const params = {
        id: payload
      }

      const back = yield call(deleteClass, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('删除成功')
    },

    *downLoad ({}, { call }) {

      const back = yield call(downLoadClass)
      if (back.code && back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = '班级列表'
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }
    }
  }
}

export default setClassModel