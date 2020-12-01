//系统设置 用户组管理  Model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { UserGroupState } from './data';

import { getUserGroup, addUserGroup, deleteUserGroup, downLoadUserGroup } from './service';

export interface UserGroupType {
  namespace: string;
  state: UserGroupState;
  reducers: {
    saveCount: Reducer<UserGroupState>;
    saveUserGroup: Reducer<UserGroupState>;
    loading: Reducer<UserGroupState>;
    cleanState: Reducer<UserGroupState>;
  };
  effects: {
    addUserGroup: Effect;
    searchUserGroup: Effect;
    deleteUserGroup: Effect;
    downLoad: Effect;
  };
}

const userGroupModel: UserGroupType = {
  namespace: 'settingUserGroup',
  state: {
    userGroupList: [],
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
    saveUserGroup(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userGroupList = payload;
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
        userGroupList: [],
        count: 0,
        loading: true,
      };
      return {
        ...state,
      };
    },
  },
  effects: {
    *searchUserGroup({ payload }, { call, put }) {
      const params = {
        groupName: payload.groupName ? payload.groupName : '',
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };
      const back = yield call(getUserGroup, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      yield put({
        type: 'saveUserGroup',
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

    *addUserGroup({ payload }, { call }) {
      const data = {
        gid: payload.id ? payload.id : 0,
        groupName: payload.groupName,
        remark: payload.remark,
      };
      const back = yield call(addUserGroup, data);
      console.log(data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      if (data.gid === 0) message.success('创建成功');
      else message.success('编辑成功');
    },
    *deleteUserGroup({ payload }, { call }) {
      const params = {
        id: payload,
      };
      const back = yield call(deleteUserGroup, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('删除成功');
    },
    *downLoad({}, { call }) {
      const back = yield call(downLoadUserGroup);
      if (back.code && back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      const a = document.createElement('a');
      const reader = new FileReader();
      reader.readAsDataURL(back);
      reader.onload = (e) => {
        a.download = '用户组列表';
        a.href = e.target?.result as string;
        a.click();
        a.remove();
      };
    },
  },
};

export default userGroupModel;
