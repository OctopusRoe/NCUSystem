//注册审批  model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { RegisterApprovalState } from './data';

import { queryRegisterapproval } from './service';

export interface PersonType {
  namespace: string;
  state: RegisterApprovalState;
  reducers: {
    saveCount: Reducer<RegisterApprovalState>;
    saveRegisterApproval: Reducer<RegisterApprovalState>;
    loading: Reducer<RegisterApprovalState>;
    cleanState: Reducer<RegisterApprovalState>;
  };
  effects: {
    queryRegisterapproval: Effect;
  };
}

const registerapprovalModel: PersonType = {
  namespace: 'communityRegisterApproval',
  state: {
    RegisterApprovalList: [],
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

    saveRegisterApproval(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.RegisterApprovalList = payload;

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
        RegisterApprovalList: [],
        count: 0,
        loading: true,
      };

      return {
        ...state,
      };
    },
  },
  effects: {
    *queryRegisterapproval({ payload }, { call, put }) {
      const params = {
        // Name: ,
        // Status: ,
      };
      const data = new FormData();
      data.append('PageSize', payload.PageSize ? payload.PageSize : 20);
      data.append('PageIndex', payload.PageIndex ? payload.PageIndex : 1);

      const back = yield call(queryRegisterapproval, params, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      yield put({
        type: 'saveCount',
        payload: back.count,
      });

      yield put({
        type: 'saveRegisterApproval',
        payload: back.data,
      });

      yield put({
        type: 'loading',
        payload: false,
      });
    },
  },
};

export default registerapprovalModel;
