import { Subscription, Reducer, Effect, history } from 'umi';

import { message } from 'antd'

import { 
  renewalToken,
  getAssociationBaseInfo,
  getAssociationLevel,
  getAssociationType,
  getDepartment
} from '@/services/user';

export interface GlobalModelState {
  token: any
  baseInfo: any
  SelectValue: any
  association: any
  reload: number
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    renewalToken: Effect;
    baseInfo: Effect;
    associationInfo: Effect;
  };
  reducers: {
    reload: Reducer<GlobalModelState>
    handleToken: Reducer<GlobalModelState>
    saveBaseInfo: Reducer<GlobalModelState>
    saveAssociationInfo: Reducer<GlobalModelState>
    saveAssociation: Reducer<GlobalModelState>
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    token: {},
    baseInfo: {},
    SelectValue: {},
    association: {},
    reload: 0
  },

  effects: {
    // 续期Token
    *renewalToken ({ payload }, { call }) {

      const params = {
        personId: payload
      }

      const back = yield call(renewalToken, params)
      if (back.code === -1) {
        history.push('/user/login')
        console.error(back.msg)
        return
      }
    },
    // 获取基本信息
    *baseInfo (_, { call, put }) {
      const back = yield call(getAssociationBaseInfo)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      yield put({
        type: 'saveBaseInfo',
        payload: back.data.personInfo
      })

      yield put({
        type: 'saveAssociation',
        payload: back.data.communityList.filter((item: any) => item.isResponsible)[0]
      })
      
      yield put({
        type: 'reload',
        payload: 1
      })
    },

    // 部分下拉列表的信息
    *associationInfo ({ payload }, { call, put }) {

      const level = yield call(getAssociationLevel)
      const type = yield call(getAssociationType)
      const department = yield call(getDepartment)

      switch (true) {
        case level.code !== 0:
          message.error(level.msg)
          console.error(level.msg)
          return
        case type.code !== 0:
          message.error(type.msg)
          console.error(type.msg)
          return
        case department.code !== 0:
          message.error(department.msg)
          console.error(department.msg)
          return
        default:

      }

      const data = {
        level: level.data,
        type: type.data,
        department: department.data,
      }

      yield put({
        type: 'saveAssociationInfo',
        payload: data
      })
    },
  },

  reducers: {
    reload (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.reload = payload
      return {
        ...newState
      }
    },
    
    // 处理储层在本地的token
    handleToken (state, { payload }) {
      const tokenValue = document.cookie.split(';').filter((item: string) => item.indexOf('NCUAssociation') > -1)
      const newState = JSON.parse(JSON.stringify(state))
      if ( tokenValue.length === 0  ) {
        history.push('/user/login')
        return {
          ...newState
        }
      }
      const token = JSON.parse(tokenValue[0].split('=')[1])
      const now = new Date()
      const time = new Date(token.time)

      if (time.getTime() < now.getTime()) {
        history.push('/user/login')
        return {
          ...newState
        }
      }
      newState.token = token

      return {
        ...newState
      }
    },

    saveBaseInfo(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.baseInfo = payload
      return {
        ...newState
      }
    },

    saveAssociationInfo (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.SelectValue = payload
      return {
        ...newState
      }
    },

    saveAssociation (state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.association = payload
      return {
        ...newState
      }
    }
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
