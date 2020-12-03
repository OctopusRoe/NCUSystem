// 成员管理组件 model

import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { searchMember, downLoadMember, memberUpdata, deleteMember } from './service';

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
    downLoad: Effect;
    memberUpdata: Effect;
    deleteMember: Effect;
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
    *searchMember({ payload }, { call, put }) {
      const params = {
        name: payload.name,
        session: payload.session,
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
      };
      const back = yield call(searchMember, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      yield put({
        type: 'saveMember',
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
        PresonId: payload.id,
      };
      console.log(params);

      const back = yield call(downLoadMember, params);
      if (back.code && back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      const a = document.createElement('a');
      const reader = new FileReader();
      reader.readAsDataURL(back);
      reader.onload = (e) => {
        a.download = '社团成员列表';
        a.href = e.target?.result as string;
        a.click();
        a.remove();
      };
    },

    *memberUpdata({ payload }, { call }) {
      const data = new FormData();
      data.append('edPersonId', payload.personId);
      data.append('Department', payload.department);
      data.append('Positioin', payload.position);

      const back = yield call(memberUpdata, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      message.success('修改成功');
    },

    *deleteMember({ payload }, { call }) {
      const params = {
        dPersonId: payload,
      };

      const back = yield call(deleteMember, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      message.success('删除成功');
    },
  },
};

export default memberModel;
