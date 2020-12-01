// 成员管理组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { searchMember } from './service';

import { MemberState } from './data';

export interface MemberModelProps {
  namespace: string;
  state: MemberState;
  reducers: {
    saveCount: Reducer<MemberState>;
    saveMember: Reducer<MemberState>;
    loading: Reducer<MemberState>;
    cleanState: Reducer<MemberState>;
  };
  effects: {
    searchMember: Effect;
  };
}

const memberModel: MemberModelProps = {
  namespace: 'associationMember',
  state: {
    memberList: [],
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

    saveMember(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.memberList = payload;

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
        memberList: [],
        count: 0,
        loading: true,
      };

      return {
        ...state,
      };
    },
  },
  effects: {
    *searchMember({ payload }, { call }) {
      const data = {
       
      };

      const back = yield call(searchMember, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      message.success('成功');
    },
  },
};

export default memberModel;
