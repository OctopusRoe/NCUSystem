// 外出登记 申请登记 组件 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { OutregistrationFormState } from '../data'

import { getStudentInfo, upFormValue } from '../service'

import { getTeacherCode, validationTCode, getDepartmentCode, validationDCode } from '@/services/globalServices'

interface OutregistrationFormType {
  namespace: string
  state: OutregistrationFormState
  reducers: {
    setMemberValueList: Reducer<OutregistrationFormState>
    rmMemberValueList: Reducer<OutregistrationFormState>
    cleanAll: Reducer<OutregistrationFormState>
    setCount: Reducer<OutregistrationFormState>
  }
  effects: {
    getStudentName: Effect;
    getTeacherCode: Effect;
    getDepartmentCode: Effect;
    validationCode: Effect;
  }
}

const outregistrationFormModel: OutregistrationFormType = {
  namespace: 'outregistrationForm',
  state: {
    leaderValueList: [],
    memberValueList: [],
    count: '',
  },
  reducers: {
    // 设置成员列表的方法
    setMemberValueList(state: any, {payload}:any) {
      state.memberValueList.splice(payload[0],1,{one: payload[1], two: payload[2], three: payload[3]})
      return {
        ...state
      }
    },
    // 移除成员列表的方法
    rmMemberValueList(state: any, {payload}:any) {
      state.memberValueList.splice(payload[0],1)
      return {
        ...state
      }
    },
    // 清除成员列表的方法
    cleanAll(state: any, {payload}: any) {
      state.memberValueList = payload
      state.leaderValueList = payload
      return {
        ...state
      }
    },

    // 设置count计数器
    setCount(state, payload) {

      const newState = JSON.parse(JSON.stringify(state))
      newState.count = `${new Date().getTime()}${payload}`
      return {
        ...newState
      }
    }
  },
  effects: {
    *getStudentName ({ payload }, { call, put }) {

      const params = {
        PersonId: payload[1]
      }

      const back = yield call(getStudentInfo, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'setMemberValueList',
        payload: [...payload, back.data.name, back.data.name]
      })

      yield put({
        type: 'setCount',
        payload: back.data.name
      })
    },
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

      console.log(payload)
      
      const tParams = {
        GUID: payload.tGUID,
        Code: payload.teacherCode
      }

      const dParams = {
        GUID: payload.dGUID,
        Code: payload.departmentCode
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

      const back = yield call(upFormValue, payload.form)
      if (back.code !== 0) {
        message.error(back.msg)
        return
      }
      
      message.success('申请成功')

    }
  }
}

export default outregistrationFormModel