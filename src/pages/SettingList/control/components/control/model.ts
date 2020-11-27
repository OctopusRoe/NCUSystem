// 应用管理 组件 model

import { Effect, Reducer } from 'umi'

import { message } from 'antd'

import { createControl, searchControl, deleteControl, downloadControl } from '../../service'

import { ControlListState } from '../../data'

import getPort from '@/services/global'

export interface ControlModel {
  namespace: string,
  state: ControlListState,
  reducers: {
    saveCount: Reducer<ControlListState>
    saveControl: Reducer<ControlListState>
    loading: Reducer<ControlListState>
    cleanState: Reducer<ControlListState>
  },
  effects: {
    addControl: Effect
    searchControl: Effect
    deleteControl: Effect
    downLoad: Effect
  }
}

const controlModel: ControlModel = {
  namespace: 'controlList',
  state: {
    controlList: [],
    count: 0,
    loading: true,
  },
  reducers: {
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    },

    saveControl (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.controlList = payload
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
        controlList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addControl ({ payload }, { call }) {

      const data = new FormData()
      data.append('Id', payload.id ? payload.id : 0)
      data.append('Ico', payload.appIco.originFileObj)
      data.append('AppName', payload.appName)
      data.append('AppURI', payload.appURI)
      data.append('MenuId', payload.menuName)

      const back = yield call(createControl, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('上传成功')
    },

    *searchControl ({ payload }, { call, put }) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1
      }

      const back = yield call(searchControl, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      back.data.forEach((item: any) => {
        item.src = getPort('image/') + escape(item.appIco)
      })

      yield put({
        type: 'saveControl',
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

    *deleteControl ({ payload }, { call }) {
      
      const params = {
        id: payload
      }

      const back = yield call(deleteControl, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('删除成功')
    },

    *downLoad ({}, { call }) {

      const back = yield call(downloadControl)
      if (back.code && back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = '应用列表'
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }
    }
  }
}

export default controlModel