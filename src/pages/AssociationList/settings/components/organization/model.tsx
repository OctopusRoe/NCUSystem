// 社团部门设置组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd'

import { getOrganization, upOrganization } from '../../service'

import { OrganizationState } from '../../data'

export interface OrganizationModel {
  namespace: string
  state: OrganizationState
  reducers: {
    saveOrganization: Reducer<OrganizationState>
  }
  effects: {
    getOrganization: Effect
    upOrganization: Effect
  }
}

const organizationModel: OrganizationModel = {
  namespace: 'associationOrganization',
  state: {
    valueList: []
  },
  reducers: {
    saveOrganization (state, { payload }) {

      if ( !Array.isArray(payload) ) {
        message.error('服务器返回了错误的数据')
        console.error('服务器返回了错误的数据')
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
    *getOrganization ({ payload }, { call, put }) {
      const data = new FormData()
      data.append('CommunityId', payload)
      const back = yield call(getOrganization, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'saveOrganization',
        payload: back.data
      })
    },

    *upOrganization ({ payload }, { call, put }) {

      const data = {
        params: payload.params,
        data: payload.data
      }

      const back = yield call(upOrganization, data)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'saveOrganization',
        payload: back.data
      })
      message.success('更新成功')
    }
  }
}

export default organizationModel