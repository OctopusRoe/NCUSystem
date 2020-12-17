// 招新管理 招新设置 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { searchList, setting, getSetInfo, addFunc, getOrganization, searchPosition, upData, deletePostion } from './service'

import { RecruitmentSettingState } from './data'

interface RecruitmentSettingType {
  namespace: string
  state: RecruitmentSettingState
  reducers: {
    saveList: Reducer<RecruitmentSettingState>
    saveCount: Reducer<RecruitmentSettingState>
    loading: Reducer<RecruitmentSettingState>
    clean: Reducer<RecruitmentSettingState>
    saveSetInfo: Reducer<RecruitmentSettingState>
    saveDepartment: Reducer<RecruitmentSettingState>
    savePosition: Reducer<RecruitmentSettingState>
  }
  effects: {
    searchList: Effect
    getInfo: Effect
    setFunc: Effect
    getSetInfo: Effect
    create: Effect
    upData: Effect
    deletPosition: Effect
  }
}

const RecruitmentSettingModel: RecruitmentSettingType = {
  namespace: 'recruitmentSetting',
  state: {
    list: [],
    count: 0,
    loading: true,
    setInfo: {},
    department: [],
    position: []
  },
  reducers: {
    saveList (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.list = payload
      return {
        ...newState
      }
    },
    saveCount (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
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
    clean () {
      return {
        list: [],
        loading: true,
        count: 0,
        setInfo: {},
        department: [],
        position: []
      }
    },
    saveSetInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.setInfo = payload
      return {
        ...newState
      }
    },
    saveDepartment (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.department = payload
      return {
        ...newState
      }
    },
    savePosition (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.position = payload
      return {
        ...newState
      }
    }
  },
  effects: {
    *searchList ({ payload }, { put, call }) {

      const params = {
        PageSize: payload.pageSize ? payload.pageSize : 20,
        PageIndex: payload.pageIndex ? payload.pageIndex : 1,
        Year: payload.year ? payload.year : new Date().getFullYear()
      }

      const back = yield call(searchList, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveList',
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
    *getInfo (_, { put, call }) {
      const department = yield call(getOrganization)
      const position = yield call(searchPosition, {PageSize: 50, PageIndex: 1})

      switch (true) {
        case department.code !== 0:
          message.error(department.msg)
          console.error(department.msg)
          return
        case position.code !== 0:
          message.error(position.msg)
          console.error(position.msg)
          return
      }

      yield put ({
        type: 'saveDepartment',
        payload: department.data
      })

      yield put ({
        type: 'savePosition',
        payload: position.data
      })


    },
    *setFunc ({ payload }, { put, call }) {

      console.log(payload)

      const form = new FormData()
      form.append('State', payload.state)
      form.append('Poster', payload.poster)
      form.append('Slogan', payload.slogan)
      form.append('EndDate', payload.endDate)
      form.append('QQ', payload.qq)

      const back = yield call(setting, form)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('设置成功')
    },
    *getSetInfo (_, { put, call }) {

      const back = yield call(getSetInfo)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveSetInfo',
        payload: back.data
      })
    },
    *create ({ payload }, { put, call }) {

      const form = new FormData()
      form.append('Department', payload.department)
      form.append('Position', payload.position)
      form.append('Request', payload.request)
      form.append('Number', parseInt(payload.number) as any)

      const back = yield call(addFunc, form)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('添加成功')
    },
    *upData ({ payload }, { put , call }) {

      const form = new FormData()
      form.append('Id', payload.Id)
      form.append('Request', payload.request)
      form.append('Number', parseInt(payload.number) as any)

      const back = yield call(upData, form)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('修改成功')
    },
    *deletPosition ({ payload }, { put, call }) {

      const params = {
        Id: payload
      }

      const back = yield call(deletePostion, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('删除成功')
    }
  }
}

export default RecruitmentSettingModel