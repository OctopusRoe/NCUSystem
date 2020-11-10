export default {
  namespace: 'association-outregistration',
  state: {
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1
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
