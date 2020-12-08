// 注销社团组件的 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { DeleteState } from './data'

import { getStudentName, deleteAssociation } from './service'

import { getTeacherCode, validationTCode, getDepartmentCode, validationDCode } from '@/services/globalServices'

interface DeleteType {
  namespace: string
  state: DeleteState
  reducers: {
    setTeacherCount: Reducer<DeleteState>
    setDepartmentCount: Reducer<DeleteState>
    setNewFormValue: Reducer<DeleteState>
    cleanAll: Reducer<DeleteState>
    rmFormValue: Reducer<DeleteState>
    setCount: Reducer<DeleteState>
    saveTGUID: Reducer<DeleteState>
    saveDGUID: Reducer<DeleteState>
  }
  effects: {
    getStudentName: Effect;
    getTeacherCode: Effect;
    getDepartmentCode: Effect;
    validationCode: Effect;
  }
}

const DeleteModel: DeleteType = {
  namespace: 'deleteModel',
  state: {
    // formValue: {
      // 'apply-name': '碇源堂',
      // 'association-name': 'NEVR',
      // 'association-type': '测试类型1',
      // 'association-grade': '测试级别6',
      // 'department': 'SEELE',
      // 'time': '1990-01-01',
      // 'student-member-list': []
    // },
    valueList: [],
    count: '',
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1,
    tGUID: '',
    dGUID: ''
  },
  reducers: {
    setNewFormValue(state: any, action: any) {
      state.valueList.splice(action.payload[0], 1, {one: action.payload[1], two: action.payload[2]})
      return {
        ...state
      }
    },
    // 清除formValue中成员列表的全部数据
    cleanAll(state: any, action: any) {
      state.valueList = action.payload
      return {
        ...state
      }
    },
    // 删除指定的formValue
    rmFormValue(state: any, action: any) {
      state.valueList.splice(action.payload, 1)
      return {
        ...state
      }
    },
    // 设置老师倒计时
    setTeacherCount(state: any, action: any) {
      state.teacherCount = action.payload[0]
      state.canTeacherUse = action.payload[1]
      return {
        ...state
      }
    },
    // 设置部门倒计时
    setDepartmentCount(state: any, action: any) {
      state.departmentCount = action.payload[0]
      state.canDepartmentUse = action.payload[1]
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
    *getStudentName ({ payload }, { call, put }) {

      const params = {
        PersonId: payload[1]
      }

      const back = yield call(getStudentName, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'setNewFormValue',
        payload: [...payload, back.data.name]
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

      const back = yield call(deleteAssociation, payload.form)
      if (back.code !== 0) {
        message.error(back.msg)
        return
      }
      
      message.success('更新成功')

    }
  }
}

export default DeleteModel
