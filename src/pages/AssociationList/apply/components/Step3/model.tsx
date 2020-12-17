import { getStudentInfo, getTeacherInfo } from '../../service';
import { Effect, Reducer } from 'umi';
import { message } from 'antd';

export interface StateType {
  teacherValueList: [],
  memberValueList: [],
  count: string
}

export interface Type {
  namespace: string;
  state: StateType,
  effects: {
    getStudentInfo: Effect;
    getTeacherInfo: Effect
  };
  reducers: {
    setTeacherValueList: Reducer<StateType>;
    rmTeacherValueList: Reducer<StateType>;
    setMemberValueList: Reducer<StateType>;
    rmMemberValueList: Reducer<StateType>;
    cleanAll: Reducer<StateType>;
    saveCount: Reducer<StateType>
  };
}



const Model: Type = {
  namespace: 'associationApplyStep3',
  state: {
    teacherValueList: [],
    memberValueList: [],
    count: ''
  },
  reducers: {

    // 设置指导老师列表的方法
    setTeacherValueList(state: any, { payload }: any) {
      state.teacherValueList.splice(payload[0], 1, { one: payload[1].personId, two: payload[1].name, three: payload[1].college })
      return {
        ...state
      }
    },

    // 删除指导老师列表的方法
    rmTeacherValueList(state: any, { payload }: any) {
      state.teacherValueList.splice(payload, 1)
      return {
        ...state
      }
    },

    // 设置成员列表的方法
    setMemberValueList(state: any, { payload }: any) {
      console.log(payload[1].personId);
      
      state.memberValueList.splice(payload[0], 1, { one: payload[1].personId, two: payload[1].name, three: payload[1].college })
      console.log(state.memberValueList)
      return {
        ...state
      }
    },

    // 删除成员列表的方法
    rmMemberValueList(state: any, { payload }: any) {
      state.memberValueList.splice(payload, 1)
      return {
        ...state
      }
    },

    // 清除全部的方法
    cleanAll() {
      return {
        teacherValueList: [],
        memberValueList: [],
        count: ''
      }
    },

    saveCount(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.count = payload
      return {
        ...newState
      }
    }
  },

  effects: {
    *getStudentInfo({ payload }, { call, put }) {
      const params = { PersonId: payload[1] }
      const back = yield call(getStudentInfo, params)
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      var newAry = new Array();
      newAry[0] = payload[0]
      newAry[1] = back.data
      yield put({
        type: 'setMemberValueList',
        payload: newAry,
      });

      yield put({
        type: 'saveCount',
        payload: back.data.toString()
      })
    },

    *getTeacherInfo({ payload }, { call, put }) {
      const params = { PersonId: payload[1] }
      const back = yield call(getTeacherInfo, params)
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      var newAry = new Array();
      newAry[0] = payload[0]
      newAry[1] = back.data
      yield put({
        type: 'setTeacherValueList',
        payload: newAry,
      });

      yield put({
        type: 'saveCount',
        payload: back.data.toString()
      })
    }

  }

}

export default Model