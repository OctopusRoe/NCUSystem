import { Reducer, Effect } from 'umi'
import { message } from 'antd'
import { activeApply, getProcessList, getTeacherList, applyGuidance, getApplyList, deleteApply } from './service'

export interface CreateActiveState {
  typeList: {}[]
  applyList: {
    id: string,
    name: string,
    type: number,
    progress: number,
    createTime: string,
    approvalUnit: number,
    examinedId: string
  }[],
  count: number,
  loading: boolean,
  DetailLoading: boolean,
  DetailInfoList?: {
    id: string;
    name: string;
    type: number;
    sponsor: string;
    organizer: string;
    startTime: string;
    endTime: string;
    place: string;
    scale: string;
    detail: string;
    posters: string
  }[],
  TeacherList?: {
    id: string;
    name: string
  }[]
}




export interface CreateActiveType {
  namespace: string
  state: CreateActiveState
  reducers: {
    saveCount: Reducer<CreateActiveState>;
    saveApplyList: Reducer<CreateActiveState>;
    loading: Reducer<CreateActiveState>;
    cleanState: Reducer<CreateActiveState>;
    saveDetailInfoList: Reducer<CreateActiveState>;
    DetailLoading: Reducer<CreateActiveState>;
    saveTeacherList: Reducer<CreateActiveState>;
    cleanDetailList: Reducer<CreateActiveState>;
  }
  effects: {
    activeApply: Effect;
    getApplyList: Effect;
    deleteApply: Effect;
    applyGuidance: Effect;
    getTeacherList: Effect;
    getProcessList: Effect;
  }
}

const CreateActiveModel: CreateActiveType = {
  namespace: 'createActive',
  state: {
    typeList: [{ id: 1, value: 'test1' }, { id: 2, value: 'test2' }, { id: 3, value: 'test3' }],
    applyList: [],
    count: 0,
    loading: true,
    DetailInfoList: [],
    DetailLoading: true
  },
  reducers: {
    saveCount(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.count = payload;

      return {
        ...newState,
      };
    },

    saveApplyList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.applyList = payload;

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

    saveTeacherList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.TeacherList = payload;

      return {
        ...newState,
      };
    },

    DetailLoading(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.DetailLoading = payload;

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
        applyList: [],
        count: 0,
        loading: true,
        typeList: [],
        DetailLoading: true
      };
      return {
        ...state,
      };
    },


    cleanDetailList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.DetailLoading = true;
      const sa = {
        DetailInfoList: [],
      };
      return {
        ...newState,
        ...sa,
      };
    },

  },
  effects: {
    *activeApply({ payload }, { call }) {
      const formData = new FormData();
      formData.append('Id', payload.Id);
      formData.append('Name', payload.Name);
      formData.append('Type', payload.Type);
      formData.append('Sponsor', payload.Sponsor);
      formData.append('Organizer', payload.Organizer);
      formData.append('Posters', payload.Posters);
      formData.append('StartTime', payload.StartTime);
      formData.append('EndTime', payload.EndTime);
      formData.append('Place', payload.Place);
      formData.append('Detail', payload.Detail);
      formData.append('Scale', payload.Scale);
      const back = yield call(activeApply, formData)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      message.success('保存成功,请前往申请列表中提交')
    },

    *getApplyList({ payload }, { call, put }) {
      const params = {
        PageSize: payload.PageSize ? payload.PageSize : 20,
        PageIndex: payload.PageIndex ? payload.PageIndex : 1,
        Name: payload.Name ? payload.Name : '',
      }

      const back = yield call(getApplyList, params)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }

      yield put({
        type: 'saveCount',
        payload: back.count,
      });

      yield put({
        type: 'saveApplyList',
        payload: back.data,
      });

      yield put({
        type: 'loading',
        payload: false,
      });
    },


    *deleteApply({ payload }, { call }) {
      const params = {
        Id: payload,
      };
      const back = yield call(deleteApply, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('删除成功');
    },


    *getProcessList({ payload }, { call, put }) {
      const params = {
        Id: payload,
      };
      const back = yield call(getProcessList, params);
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
        type: 'DetailLoading',
        payload: false,
      });
    },

    *applyGuidance({ payload }, { call }) {
      const formData = new FormData();
      formData.append('Id', payload.Id);
      formData.append('TeacherId', payload.TeacherId);
      formData.append('DepartmentId', payload.DepartmentId);

      const back = yield call(applyGuidance, formData)
      if (back.code !== 0) {
        message.error(back.msg)
        console.error(back.msg)
        return
      }
      message.success('提交成功')
    },

    *getTeacherList({ payload }, { call, put }) {
      const params = {
        CommunityId: payload,
      };
      const back = yield call(getTeacherList, params);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      yield put({
        type: 'saveTeacherList',
        payload: back.data,
      });
    },



  }
}

export default CreateActiveModel