import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { message } from 'antd'

import { fakeAccountLogin, baseLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { ClockCircleOutlined } from '@ant-design/icons';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    autoLogin: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // 手动登录的方法
    *login ({ payload }, { call, put }) {
      const data = new FormData()
      data.append('uname', payload.uname)
      data.append('pwd', payload.pwd)
      const back = yield call(baseLogin, data)
      if (back.code !== 0) {
        message.error(back.msg)
        return
      }
      const time = new Date()
      time.setTime(time.getTime() + 5 * 24 * 60 * 60 * 1000 )

      const value = {
        token: back.data,
        personId: payload.uname,
        pwd: payload.pwd,
        time: time.toString()
      }

      document.cookie = `NCUAssociation=${JSON.stringify(value)};expires=${time.toString()}`
      history.push('/index')
    },

    // 自动登录的方法
    *autoLogin (_, { call, put }) {
      const tokenValue = document.cookie.split(';').filter((item: string) => item.indexOf('NCUAssociation') > -1)
      if ( tokenValue.length === 0 ) {
        return
      }
      const token = JSON.parse(tokenValue[0].split('=')[1])
      const now = new Date()
      const time = new Date(token.time)

      if (time.getTime() < now.getTime()) {
        return
      }

      const data = {
        uname: token.personId,
        pwd: token.pwd
      }

      yield put({
        type: 'login',
        payload: data
      })
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    }
  },
};

export default Model;
