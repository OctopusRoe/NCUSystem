import { Subscription, Reducer, Effect, history } from 'umi';

import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices, renewalToken } from '@/services/user';
import { ConnectState } from './connect.d';


export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
  token: any
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    renewalToken: Effect;
  };
  reducers: {
    handleToken: Reducer<GlobalModelState>
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    token: {},
    
  },

  effects: {
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
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: ConnectState) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map((item) => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter((item) => !item.read).length,
        },
      });
    },
  },

  reducers: {
    handleToken(state, { payload }) {
      const tokenValue = document.cookie.split(';').filter((item: string) => item.indexOf('NCUAssociation') > -1)
      if ( tokenValue.length === 0  ) {
        history.push('/user/login')
        return {
          collapsed: false,
          notices: [],
          token: {},
        }
      }
      const token = JSON.parse(tokenValue[0].split('=')[1])
      const now = new Date()
      const time = new Date(token.time)

      if (time.getTime() < now.getTime()) {
        history.push('/user/login')
        return {
          collapsed: false,
          notices: [],
          token: {},
        }
      }

      return {
        collapsed: false,
        notices: [],
        token: token,
      }
    },
    changeLayoutCollapsed(state = { notices: [], collapsed: true, token: {} }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
        token: null
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true, token: {} }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
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
