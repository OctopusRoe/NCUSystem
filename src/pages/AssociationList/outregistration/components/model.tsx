export default {
  namespace: 'association-outregistration',
  state: {
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1,
    leaderValueList: [],
    memberValueList: []
  },
  reducers: {
    // 设置成员列表的方法
    setMemberValueList(state: any, {payload}:any) {
      state.memberValueList.splice(payload[0],1,{one: payload[1], two: payload[1], three: payload[1]})
      return {
        ...state
      }
    },
    // 移除成员列表的方法
    rmMemberValueList(state: any, {payload}:any) {
      state.memberValueList.splice(payload[0],1)
      return {
        ...state
      }
    },
    // 清除成员列表的方法
    cleanAll(state: any, {payload}: any) {
      state.memberValueList = payload
      state.leaderValueList = payload
      return {
        ...state
      }
    },
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
