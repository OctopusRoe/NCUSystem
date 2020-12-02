// 基本信息组件 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { BaseInfoState } from '../../data'

import { upBaseInfo } from '../../service'

import { getTeacherCode, validationTCode, getDepartmentCode, validationDCode } from '@/services/globalServices'

export interface BaseInfoModelType {
  namespace: string
  state: BaseInfoState
  reducers: {
    setTeacherCount: Reducer<BaseInfoState>
    setDepartmentCount: Reducer<BaseInfoState>
    saveTGUID: Reducer<BaseInfoState>
    saveDGUID: Reducer<BaseInfoState>
  },
  effects: {
    getTeacherCode: Effect;
    getDepartmentCode: Effect;
    validationCode: Effect;
  }
}

const baseInfoModel: BaseInfoModelType = {
  namespace: 'associationBaseInfo',
  state: {
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1,
    tGUID: '',
    dGUID: ''
  },
  reducers: {
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
    },

    saveTGUID (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.tGUID = payload
      return {
        ...newState
      }
    },

    saveDGUID (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.dGUID = payload
      return {
        ...newState
      }
    }
  },
  effects: {
    *getTeacherCode ({ payload }, { call , put }) {
      
      const params = {
        PersonId: payload
      }

      const back = yield call(getTeacherCode, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveTGUID',
        payload: back.data.guid
      })
    },

    * getDepartmentCode ({ payload }, { call, put }) {

      const params = {
        PersonId: payload
      }

      const back = yield call(getDepartmentCode, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveDGUID',
        payload: back.data.guid
      })
    },

    *validationCode ({ payload }, { call, put } ) {
      
      const tParams = {
        GUID: payload.teacher.guid,
        Code: payload.teacher.code
      }

      const dParams = {
        GUID: payload.department.guid,
        Code: payload.department.code
      }

      console.log(tParams, dParams, payload)

      const tBack = yield call(validationTCode, tParams)
      const dBack = yield call(validationDCode, dParams)
      
      switch (true) {
        case tBack.code !== 0:
          message.error(tBack.msg)
          return
        case dBack.code !== 0:
          message.error(dBack.msg)
          return
      }



      const back = yield call(upBaseInfo, payload.form)
      if (back.code !== 0) {
        message.error(back.msg)
        return
      }
      
      message.success('更新成功')

    }

  }
}

export default baseInfoModel