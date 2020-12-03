// 社团通讯录 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { searchAddreList, downLoadAddressList } from './service';

import { AddressListState } from './data';

export interface DepartmentType {
  namespace: string;
  state: AddressListState;
  reducers: {
    saveCount: Reducer<AddressListState>;
    saveAddressList: Reducer<AddressListState>;
    loading: Reducer<AddressListState>;
    cleanState: Reducer<AddressListState>;
  };
  effects: {
    searchAddressList: Effect;
    downLoad: Effect;
  };
}

const addressListModel: DepartmentType = {
  namespace: 'communityAddressList',
  state: {
    addressList: [],
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

    saveAddressList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.departmentList = payload;

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
        departmentList: [],
        count: 0,
        loading: true,
      };

      return {
        ...state,
      };
    },
  },
  effects: {
    *searchAddressList({ payload }, { call, put }) {
      const params = {
        Phone: payload.Phone ? payload.Phone : '',
        Name: payload.Name ? payload.Name : '',
        PresonId: payload.PersonId ? payload.PersonId : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };

      const back = yield call(searchAddreList, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      yield put({
        type: 'saveAddressList',
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

    *downLoad({ payload }, { call }) {
      const params = {
        PersonId: payload.id,
      };
      console.log(params);

      const back = yield call(downLoadAddressList, params);
      if (back.code && back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      const a = document.createElement('a');
      const reader = new FileReader();
      reader.readAsDataURL(back);
      reader.onload = (e) => {
        a.download = '社团通讯录';
        a.href = e.target?.result as string;
        a.click();
        a.remove();
      };
    },
  },
};

export default addressListModel;
