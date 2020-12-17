//注册审批  model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { RegisterApprovalState } from './data';

import { queryRegisterapproval, deleteRegisterapproval, getDetail, registerAudit } from './service';

export interface PersonType {
  namespace: string;
  state: RegisterApprovalState;
  reducers: {
    saveCount: Reducer<RegisterApprovalState>;
    saveRegisterApproval: Reducer<RegisterApprovalState>;
    loading: Reducer<RegisterApprovalState>;
    cleanState: Reducer<RegisterApprovalState>;
    saveDetailInfoList: Reducer<RegisterApprovalState>;
    detailLoading: Reducer<RegisterApprovalState>;
    cleanDetail: Reducer<RegisterApprovalState>;
  };
  effects: {
    queryRegisterapproval: Effect;
    deleteRegisterapproval: Effect;
    getDetail: Effect;
    registerAudit: Effect;
  };
}

const registerapprovalModel: PersonType = {
  namespace: 'communityRegisterApproval',
  state: {
    RegisterApprovalList: [],
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
        RegisterApprovalList: [],
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
    *queryRegisterapproval({ payload }, { call, put }) {
      const params = {
        Name: payload.Name ? payload.Name : '',
        Status: payload.Status ? payload.Status : '',
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

    *deleteRegisterapproval({ payload }, { call }) {
      const params = {
        Id: payload,
      };

      const back = yield call(deleteRegisterapproval, params);
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

    *registerAudit({ payload }, { call }) {
      const params = {
        Id: payload.Id,
        Status: payload.Status,
      };
      const back = yield call(registerAudit, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
    },
  },
};

export default registerapprovalModel;
