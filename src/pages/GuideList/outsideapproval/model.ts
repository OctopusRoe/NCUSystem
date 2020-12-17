//外出审批  model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { OutRegistrationApprovalState } from './data';

import { queryOutRegistrationApproval, deleteOutRegistrationApproval, getDetail } from './service';

export interface OutRegistrationType {
  namespace: string;
  state: OutRegistrationApprovalState;
  reducers: {
    saveCount: Reducer<OutRegistrationApprovalState>;
    saveOutRegistration: Reducer<OutRegistrationApprovalState>;
    loading: Reducer<OutRegistrationApprovalState>;
    cleanState: Reducer<OutRegistrationApprovalState>;
    detailLoading: Reducer<OutRegistrationApprovalState>;
    saveDetailInfoList: Reducer<OutRegistrationApprovalState>;
    cleanDetail: Reducer<OutRegistrationApprovalState>;
  };
  effects: {
    queryOutRegistrationApproval: Effect;
    deleteOutRegistrationApproval: Effect;
    getDetail: Effect;
  };
}

const outRegistrationModel: OutRegistrationType = {
  namespace: 'communityOutRegistration',
  state: {
    OutRegistrationApprovalList: [],
    count: 0,
    loading: true,
    DetailInfoList: [],
    detailLoading: true,
  },
  reducers: {
    saveCount(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.count = payload;

      return {
        ...newState,
      };
    },

    saveDetailInfoList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.DetailInfoList = payload;

      return {
        ...newState,
      };
    },

    saveOutRegistration(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.OutRegistrationApprovalList = payload;

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

    detailLoading(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.detailLoading = payload;

      return {
        ...newState,
      };
    },
    cleanDetail(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.detailLoading = payload;
      newState.detailLoading = {};
      const sa = {
        DetailInfoList: [],
      };
      return {
        ...newState,
        ...sa,
      };
    },
    cleanState() {
      const state = {
        OutRegistrationApprovalList: [],
        DetailInfoList: [],
        count: 0,
        loading: true,
        detailLoading: true,
      };

      return {
        ...state,
      };
    },
  },

  effects: {
    *queryOutRegistrationApproval({ payload }, { call, put }) {
      const params = {
        Name: payload.Name ? payload.Name : '',
        Status: payload.Status ? payload.Status : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };

      const back = yield call(queryOutRegistrationApproval, params);
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
        type: 'saveOutRegistration',
        payload: back.data,
      });

      yield put({
        type: 'loading',
        payload: false,
      });
    },

    *deleteOutRegistrationApproval({ payload }, { call }) {
      const params = {
        Id: payload,
      };

      const back = yield call(deleteOutRegistrationApproval, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('删除成功');
    },

    *getDetail({ payload }, { call, put }) {
      const params = {
        Id: payload,
      };
      const back = yield call(getDetail, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      yield put({
        type: 'saveDetailInfoList',
        payload: back.data,
      });
      yield put({
        type: 'detailLoading',
        payload: false,
      });
    },
  },
};

export default outRegistrationModel;
