import { Reducer } from 'umi'

export interface CreateActiveState {
  typeList: string[]
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  teacherValue: {name:string,phone:string}[]
}

export interface CreateActiveType {
  namespace: string
  state: CreateActiveState
  reducers: {
    setTeacherCount: Reducer<CreateActiveState>
    setDepartmentCount: Reducer<CreateActiveState>
  }
}

const CreateActiveModel: CreateActiveType = {
  namespace: 'createActive',
  state: {
    typeList: ['类型1','类型2','类型3','类型4','类型5'],
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1,
    teacherValue: [{name: '姓名1', phone: '123123'},{name: '姓名2', phone: '123123123'}],
  },
  reducers: {
    // 设置老师倒计时
    setTeacherCount(state: any, action: any) {
      state.teacherCount = action.payload[0]
      state.canTeacherUse = action.payload[1]
      return {
        ...state
      }
    },
    // 设置部门倒计时
    setDepartmentCount(state: any, action: any) {
      state.departmentCount = action.payload[0]
      state.canDepartmentUse = action.payload[1]
      return {
        ...state
      }
    }
  }
}

export default CreateActiveModel