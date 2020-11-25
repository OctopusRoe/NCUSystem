// 指导单位设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createDepartment, searchDepartment } from '../../service'

import { DepartmentState } from '../../data'

export interface DepartmentType {
  namespace: string
  state: DepartmentState
  reducers: {
    saveCount: Reducer<DepartmentState>
    saveDepartment: Reducer<DepartmentState>
    loading: Reducer<DepartmentState>
    cleanState: Reducer<DepartmentState>
  }
  effects: {
    addDepartment: Effect
    searchDepartment: Effect
  }
}

const departmentModel: DepartmentType = {
  namespace: 'baseDepartment',
  state: {
    departmentList: [],
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

    saveDepartment (state, { payload }) {

      const newState = JSON.parse(JSON.stringify(state))
      newState.departmentList = payload

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
        departmentList: [],
        count: 0,
        loading: true
      }
      
      return {
        ...state
      }
    }
  },
  effects: {
    *addDepartment ({ payload }, { call }) {
      
      const data = {
        id: 0,
        number: payload.number,
        name: payload.name,
        shortName: payload.shortName,
        organizationType: payload.type,
        level: parseInt(payload.level),
        childrenIds: []
      }

      const back = yield call(createDepartment, data)
      if (back.code !== 0) {
        console.log(back.message)
        return
      }
      
      message.success('创建成功')
    },

    *searchDepartment ({ payload }, { call, put }) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchDepartment, params)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }

      yield put({
        type: 'saveDepartment',
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

export default departmentModel