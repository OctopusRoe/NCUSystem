//社团管理   大事件  model
import { Effect, Reducer } from 'umi';

import { message } from 'antd';

import { searchChronicle, deleteChronicle, addChronicle } from './service';

import { ChronicleState } from './data';

export interface ChronicleProps {
  namespace: string;
  state: ChronicleState;
  reducers: {
    saveChronicle: Reducer<ChronicleState>;
    loading: Reducer<ChronicleState>;
  };
  effects: {
    searchChronicle: Effect;
    deleteChronicle: Effect;
    addChronicle: Effect;
  };
}

const chronicleModel: ChronicleProps = {
  namespace: 'communityMemorabilia',
  state: {
    loading: true,
    chronicleList: [],
  },
  reducers: {
    saveChronicle(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.chronicleList = payload;
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
  },
  effects: {
    *searchChronicle({}, { call, put }) {
      const back = yield call(searchChronicle);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      yield put({
        type: 'saveChronicle',
        payload: back.data,
      });
      yield put({
        type: 'loading',
        payload: false,
      });
    },

    *deleteChronicle({ payload }, { call }) {
      const params = {
        Id: payload,
      };

      const back = yield call(deleteChronicle, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      message.success('删除成功');
    },

    *addChronicle({ payload }, { call }) {
      const data = new FormData();
      data.append('Title', payload.title);
      data.append('Time', payload.time);
      data.append('Content', payload.content);
      for (var i = 0; i < payload.img.length; i++) {
        data.append('Images', payload.img[i]);
      }

      const back = yield call(addChronicle, data);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }

      message.success('添加成功');
    },
  },
};

export default chronicleModel;
