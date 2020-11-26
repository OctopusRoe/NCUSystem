// 专业设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createSpecial, searchSpecial, deleteSpecial, downLoadSpecial } from '../../service'

import { SpecialtyState } from '../../data'

export interface SpecialtyModel {
  namespace: string
  state: SpecialtyState
  reducers: {
    saveCount: Reducer<SpecialtyState>
    saveSpecial: Reducer<SpecialtyState>
    loading: Reducer<SpecialtyState>
    cleanState: Reducer<SpecialtyState>
  }
  effects: {
    addSpecial: Effect
    searchSpecial: Effect
    deleteSpecial: Effect
    downLoad: Effect
  }
}

const specialtyModel: SpecialtyModel = {
  namespace: 'baseSpecialty',
  state: {
    specialtyList: [],
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

    saveSpecial (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.specialtyList = payload
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
        specialtyList: [],
        count: 0,
        loading: true
      }
      return {
        ...state
      }
    }
  },
  effects: {
    *addSpecial ({ payload }, { call }) {
      
      const data = {
        id : payload.id ? payload.id : 0,
        majorNo: payload.majorNo,
        majorName: payload.majorName,
        college: payload.college,
        lengthOfSchooling: payload.lengthOfSchooling
      }

      const back = yield call(createSpecial, data)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('创建成功')
    },
    
    *searchSpecial ({ payload }, { call, put}) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchSpecial, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      yield put({
        type: 'saveSpecial',
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

    *deleteSpecial ({ payload }, { call }) {

      const params = {
        id : payload
      }

      const back = yield call(deleteSpecial, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      message.success('删除成功')
    },

    *downLoad ({}, { call }) {

      const back = yield call(downLoadSpecial)
      if (back.code && back.code !== 0) {
        message.error(back.message)
        console.error(back.message)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = '专业列表'
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }
    }
  }
}

export default specialtyModel