//短信统计 model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { queryMessage } from './service';

import { SttingsMessage } from './data';

export interface MessageType {
  namespace: string;
  state: SttingsMessage;
  reducers: {
    saveCount: Reducer<SttingsMessage>;
    saveMessage: Reducer<SttingsMessage>;
    loading: Reducer<SttingsMessage>;
    cleanState: Reducer<SttingsMessage>;
  };
  effects: {
    searchMessage: Effect;
  };
}

const messageModel: MessageType = {
  namespace: 'settingsMessage',
  state: {
    messageList: [],
    count: 0,
    loading: true,
  },
  reducers: {
    saveCount(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.count = payload;
      return {
        ...newState,
      };
    },
    saveMessage(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.messageList = payload;
      return {
        ...newState,
      };
    },
    loading(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = payload;
      return {
        ...newState,
      };
    },
    cleanState() {
      const state = {
        messageList: [],
        count: 0,
        loading: true,
      };
      return {
        ...state,
      };
    },
  },
  effects: {
    *searchMessage({ payload }, { call, put }) {
      const params = {
        Phone: payload.Phone ? payload.Phone : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };

      const back = yield call(queryMessage, params);
      console.log(back);
      if (back.code != 0) {
        message.error(back.message);
        console.log(back.message);
        return;
      }
      yield put({
        type: 'saveMessage',
        payload: back.data,
      });
      yield put({
        type: 'savecount',
        payload: back.count,
      });
      yield put({
        type: 'loading',
        payload: false
      })
    },
  },
};

export default messageModel;
