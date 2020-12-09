// 社团指导 成员列表 model

import { Reducer, Effect } from 'umi'

import { message } from 'antd'

import { MemberListState } from './data'

import {  } from './service'

interface MemberListType {
  namespace: string
  state: MemberListState
  reducers: {

  }
  effects: {

  }
}

const MemberListModel: MemberListType = {
  namespace: 'memberListModel',
  state: {
    list: [],
    loading: true,
    count: 0
  },
  reducers: {

  },
  effects: {

  }
}

export default MemberListModel