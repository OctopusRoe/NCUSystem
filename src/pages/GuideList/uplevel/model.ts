//升级审批  model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { UpgradeApprovalState } from './data';

import { queryUpgradeApproval, getDetail, deleteUpgradeApproval } from './service';

export interface UpgradeApprovalType {
  namespace: string;
  state: UpgradeApprovalState;
  reducers: {
    saveCount: Reducer<UpgradeApprovalState>;
    saveUpgradeApproval: Reducer<UpgradeApprovalState>;
    loading: Reducer<UpgradeApprovalState>;
    cleanState: Reducer<UpgradeApprovalState>;
    saveDetailInfoList: Reducer<UpgradeApprovalState>;
    detailLoading: Reducer<UpgradeApprovalState>;
    cleanDetail: Reducer<UpgradeApprovalState>;
  };
  effects: {
    queryUpgradeApproval: Effect;
    getDetail: Effect;
    deleteUpgradeApproval: Effect;
  };
}

const upgradeApprovalModel: UpgradeApprovalType = {
  namespace: 'communityUpgradeApproval',
  state: {
    UpgradeApprovalList: [],
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

    saveUpgradeApproval(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.UpgradeApprovalList = payload;

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
        UpgradeApprovalList: [],
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
    *queryUpgradeApproval({ payload }, { call, put }) {
      const params = {
        Name: payload.Name ? payload.Name : '',
        Status: payload.Status ? payload.Status : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };

      const back = yield call(queryUpgradeApproval, params);
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
        type: 'saveUpgradeApproval',
        payload: back.data,
      });

      yield put({
        type: 'loading',
        payload: false,
      });
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

    *deleteUpgradeApproval({ payload }, { call }) {
      const params = {
        Id: payload,
      };

      const back = yield call(deleteUpgradeApproval, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('删除成功');
    },
  },
};

export default upgradeApprovalModel;
