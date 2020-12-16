// 升级申请 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { validationTCode, validationDCode } from '@/services/globalServices'

import { upAssociationLevel } from './service'

import { UpgradeState } from './data.d'

interface UpgradeType {
  namespace: string
  state: UpgradeState
  reducers: {

  },
  effects: {
    validationCode: Effect;
  }
}

const upgradeModel: UpgradeType = {
  namespace: 'associationUpgrade',
  state: {
  },
  reducers: {
    
  },

  effects: {

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

      const back = yield call(upAssociationLevel, payload.form)
      if (back.code !== 0) {
        message.error(back.msg)
        return
      }
      
      message.success('更新成功')

    }
  }
}

export default upgradeModel
