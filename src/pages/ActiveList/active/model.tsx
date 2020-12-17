import { Reducer, Effect } from 'umi'
import { message } from 'antd'
import { activeApply, getApplyDetail, getApplyList } from './service'




export interface CreateActiveState {
  typeList: string[]
  applyList: {
    id: string,
    name: string,
    type: number,
    progress: number,
    reason: string,
    result: number,
  }[],
  count: number,
  loading: boolean,
}

export interface CreateActiveType {
  namespace: string
  state: CreateActiveState
  reducers: {

  }
  effects: {
    activeApply: Effect;
    getApplyList: Effect;
    getApplyDetail: Effect;
  }
}

const CreateActiveModel: CreateActiveType = {
  namespace: 'createActive',
  state: {
    typeList: ['类型1', '类型2', '类型3', '类型4', '类型5'],
    applyList: [],
    count: 0,
    loading:true,
  },
  reducers: {

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

      message.success('保存成功')
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
    },

    *getApplyDetail({ }, { }) {

    }

  }
}

export default CreateActiveModel