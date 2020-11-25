//违纪管理组件  model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { queryPunish } from './service';

import { PunishState } from './data';

export interface PunishType {
  namespace: string;
  state: PunishState;
  reducers: {
    saveCount: Reducer<PunishState>;
    savePunish: Reducer<PunishState>;
    loading: Reducer<PunishState>;
    cleanState: Reducer<PunishState>;
  };
  effects: {
    searchPunish: Effect;
  };
}

const punishModel: PunishType = {
  namespace: 'settingPunish',
  state: {
    punishList: [],
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
    savePunish(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.punishList = payload;
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
        punishList: [],
        count: 0,
        loading: true,
      };
      return {
        ...state,
      };
    },
  },
  effects: {
    *searchPunish({ payload }, { call, put }) {
      const params = {
        PersonId: payload.PersonId ? payload.PersonId : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };
      const back = yield call(queryPunish, params);
      if (back.code !== 0) {
        message.error(back.message);
        console.log(back.message);
        return;
      }
      yield put({
        type: 'savePunish',
        payload: back.data,
      });
      yield put({
        type: 'saveCount',
        payload: back.count,
      });
      yield put({
        type: 'loading',
        payload: false,
      });
    },
  },
};

export default punishModel;
