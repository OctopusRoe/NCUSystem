// 单位类型 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getDepartmentType, upDepartmentType } from '../../service'

import { DepartmentTypeState } from '../../data'

export interface DepartmentTypeType {
  namespace: string
  state: DepartmentTypeState
  reducers: {
    saveType: Reducer<DepartmentTypeState>
  }
  effects: {
    getType: Effect
    upType: Effect
  }
}

const departmentTypeModel: DepartmentTypeType = {
  namespace: 'baseDepartmentType',
  state: {
    valueList: []
  },
  reducers: {
    saveType (state: any, { payload }) {
      
      if ( !Array.isArray(payload) ) {
        message.error('服务器返回了错误的数据')
        console.log('服务器返回了错误的数据')
        return
      }
      const newState = JSON.parse(JSON.stringify(state))
      newState.valueList = payload.map((item: {id: number, name: string, status: number}) => ({one: item.name, id: item.id}))

      return {
        ...newState
      }
    }
  },
  effects: {
    *getType (_, { call, put }) {
      const back = yield call(getDepartmentType)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveType',
        payload: back.data
      })
    },

    *upType ({ payload }, { call, put }) {
      const back = yield call(upDepartmentType, payload)
      if (back.code !== 0) {
        message.error(back.message)
        console.log(back.message)
        return
      }
      yield put({
        type: 'saveType',
        payload: back.data
      })
      message.success('更新成功')
    }
  }

}

export default departmentTypeModel