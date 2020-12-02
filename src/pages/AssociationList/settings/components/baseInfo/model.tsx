// 基本信息组件 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { getAssociationBaseInfo } from '../../service'

import { BaseInfoState } from '../../data'

export interface BaseInfoModelType {
  namespace: string
  state: BaseInfoState
  reducers: {
    savebaseInfo: Reducer<BaseInfoState>
    setTeacherCount: Reducer<BaseInfoState>
    setDepartmentCount: Reducer<BaseInfoState>
  },
  effects: {
    getInfo: Effect
  }
}

const baseInfoModel: BaseInfoModelType = {
  namespace: 'associationBaseInfo',
  state: {
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1
  },
  reducers: {

    savebaseInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.baseInfo = payload
      return {
        ...newState
      }
    },
    // 设置老师倒计时
    setTeacherCount (state: any, action: any) {
      state.teacherCount = action.payload[0]
      state.canTeacherUse = action.payload[1]
      return {
        ...state
      }
    },
    // 设置部门倒计时
    setDepartmentCount (state: any, action: any) {
      state.departmentCount = action.payload[0]
      state.canDepartmentUse = action.payload[1]
      return {
        ...state
      }
    }
  },
  effects: {
    *getInfo (_, { call, put }) {
      const back = yield call(getAssociationBaseInfo)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'savebaseInfo',
        payload: back.data
      })
    }
  }
}

export default baseInfoModel