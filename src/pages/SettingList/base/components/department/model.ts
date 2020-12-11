// 指导单位设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { createDepartment, searchDepartment, deleteDepartment, downLoadDepartment } from '../../service'

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
    deleteDepartment: Effect
    downLoad: Effect
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
        id: payload.id ? payload.id : 0,
        number: payload.number,
        name: payload.name,
        shortName: payload.shortName,
        organizationType: payload.type,
        level: parseInt(payload.level),
        childrenIds: []
      }

      const back = yield call(createDepartment, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      
      message.success('成功')
    },

    *searchDepartment ({ payload }, { call, put }) {

      const params = {
        query: payload.query ? payload.query : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      }

      const back = yield call(searchDepartment, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
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
    },

    *deleteDepartment ({ payload }, { call }) {

      const params = {
        id : payload
      }

      const back = yield call(deleteDepartment, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('删除成功')
    },

    *downLoad ({},{ call }) {
      
      const back = yield call(downLoadDepartment)
      if (back.code && back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      const a = document.createElement('a')
      const reader = new FileReader()
      reader.readAsDataURL(back)
      reader.onload = (e) => {
        a.download = '单位数据'
        a.href = e.target?.result as string
        a.click()
        a.remove()
      }

      message.success(back.msg)

    }
  }
}

export default departmentModel