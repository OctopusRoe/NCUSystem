//用户管理  model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { PersonState } from './data';

import {
  getPerson,
  createUser,
  deleteUser,
  resetPassword,
  getPersonTemplate,
  upLoadPerson,
  updateUserStatus,
  editPerson,
} from './service';

export interface PersonType {
  namespace: string;
  state: PersonState;
  reducers: {
    saveCount: Reducer<PersonState>;
    savePerson: Reducer<PersonState>;
    loading: Reducer<PersonState>;
    cleanState: Reducer<PersonState>;
  };
  effects: {
    searchPerson: Effect;
    addPerson: Effect;
    deleteUser: Effect;
    resetPassword: Effect;
    getTemplate: Effect;
    upLoad: Effect;
    updateUserStatus: Effect;
    updateUser: Effect;
  };
}

const personModel: PersonType = {
  namespace: 'settingPerson',
  state: {
    personList: [],
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

    savePerson(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.personList = payload;

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
        personList: [],
        count: 0,
        loading: true,
      };

      return {
        ...state,
      };
    },
  },
  effects: {
    *searchPerson({ payload }, { call, put }) {
      const params = {
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };
      const data = new FormData();
      data.append('Name', payload.Name ? payload.Name : '');
      data.append('PersonId', payload.PersonId ? payload.PersonId : '');
      data.append('Idcard', payload.Idcard ? payload.Idcard : '');
      data.append('Phone', payload.Phone ? payload.Phone : '');

      const back = yield call(getPerson, params, data);
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
        type: 'savePerson',
        payload: back.data,
      });

      yield put({
        type: 'loading',
        payload: false,
      });
    },
    *addPerson({ payload }, { call }) {
      const data = {
        category: payload.category,
        personId: payload.personId,
        name: payload.name,
        idcard: payload.idcard,
        gender: payload.gender,
        phone: payload.phone,
        college: payload.college,
        class: payload.class,
      };

      const back = yield call(createUser, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('添加成功');
    },

    *deleteUser({ payload }, { call }) {
      const params = {
        id: payload,
      };
      const back = yield call(deleteUser, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('删除成功');
    },

    *resetPassword({ payload }, { call }) {
      const params = {
        id: payload,
      };
      const back = yield call(resetPassword, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('密码重置成功');
    },
    *getTemplate({}, { call }) {
      const back = yield call(getPersonTemplate);
      if (back.code && back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      const a = document.createElement('a');
      const reader = new FileReader();
      reader.readAsDataURL(back);
      reader.onload = (e) => {
        a.download = '用户列表模板';
        a.href = e.target?.result as string;
        a.click();
        a.remove();
      };
    },
    *upLoad({ payload }, { call }) {
      const data = new FormData();
      data.append('file', payload);
      const back = yield call(upLoadPerson, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success(back.msg);
    },
    *updateUserStatus({ payload }, { call }) {
      const params = {
        id: payload.id,
        Status: payload.Status,
      };
      const back = yield call(updateUserStatus, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      if (params.Status === 1) message.success('用户已锁定');
      else if (params.Status === 0) message.success('锁定已解除');
    },
    *updateUser({ payload }, { call }) {
      const data = {
        id: payload.id,
        category: payload.category,
        personId: payload.personId,
        name: payload.name,
        idcard: payload.idcard,
        gender: payload.gender,
        phone: payload.phone,
        college: payload.college,
        class: payload.class,
      };
      const back = yield call(editPerson, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('编辑成功');
    },
  },
};

export default personModel;
