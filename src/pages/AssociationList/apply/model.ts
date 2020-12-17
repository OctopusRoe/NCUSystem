import { message } from 'antd';
import { Effect, Reducer } from 'umi';

import { registerApply } from './service';

export interface StateType {
  current?: string;
  step?: {
    NameZh: string;
    NameEn: string;
    Category: any; //number
    Level: any; //number
    OrganizationId: any; //number
    ApplicantPersonId: string;
    PersonNum: string;
    Constitution: string;
    FailSubject: any; //boolean
    AchievementRank: any; //number
    ApplicantHonor: string;
    Instructor: [];
    Members: [];
    Front: string;
    Opposite: string;
    TeacherGuid: string;
    TeacherCode: string;
    DepartmentGuid: string;
    DepartmentCode: string;
  };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    step: {
      NameZh: '',
      NameEn: '',
      Category: undefined,
      Level: undefined,
      OrganizationId: undefined,
      ApplicantPersonId: '',
      PersonNum: '',
      Constitution: '',
      FailSubject: '',
      AchievementRank: '',
      ApplicantHonor: '',
      Instructor: [],
      Members: [],
      Front: '',
      Opposite: '',
      TeacherGuid: '',
      TeacherCode: '',
      DepartmentGuid: '',
      DepartmentCode: '',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      console.log(payload);
      const formData = new FormData();
      formData.append('NameZh', payload.NameZh);
      formData.append('NameEn', payload.NameEn);
      formData.append('Category', payload.Category);
      formData.append('Level', payload.Level);
      formData.append('OrganizationId', payload.OrganizationId);
      formData.append('ApplicantPersonId', payload.ApplicantPersonId);
      formData.append('PersonNum', payload.PersonNum);
      formData.append('Constitution', payload.Constitution.file.originFileObj);
      formData.append('FailSubject', payload.FailSubject);
      formData.append('AchievementRank', payload.AchievementRank);
      formData.append('ApplicantHonor', payload.ApplicantHonor);
      formData.append('Instructor', payload.Instructor);
      formData.append('Members', payload.Members);
      formData.append('Front', payload.Front.originFileObj);
      formData.append('Opposite', payload.Opposite.originFileObj);

      const back = yield call(registerApply, formData);
      if (back.code !== 0) {
        message.error(back.msg);
        console.error(back.msg);
        return;
      }
      message.success('提交成功');
      yield put({
        type: 'saveStepFormData',
        payload,
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
