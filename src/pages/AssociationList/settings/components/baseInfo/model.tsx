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
  },
  reducers: {
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