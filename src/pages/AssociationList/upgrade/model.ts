// 升级申请 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import {  } from './service'

import { UpgradeState } from './data.d'

interface UpgradeType {
  namespace: string
  state: UpgradeState
  reducers: {

  },
  effects: {

  }
}

const upgradeModel: UpgradeType = {
  namespace: 'associationUpgrade',
  state: {
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1
  },
  reducers: {
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
    }
  },

  effects: {

  }
}

export default upgradeModel
