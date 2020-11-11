
export default {
  namespace: 'deleteModel',
  state: {
    formValue: {
      'apply-name': '碇源堂',
      'association-name': 'NEVR',
      'association-type': '测试类型1',
      'association-grade': '测试级别6',
      'department': 'SEELE',
      'time': '1990-01-01',
      'student-member-list': []
    },
    canTeacherUse: true,
    teacherCount: 1,
    canDepartmentUse: true,
    departmentCount: 1
  },
  reducers: {
    setNewFormValue(state: any, action: any) {
      state.formValue['student-member-list'].splice(action.payload[0], 1, {one: action.payload[1], two: action.payload[1]})
      return {
        ...state
      }
    },
    // 清除formValue中成员列表的全部数据
    cleanAll(state: any, action: any) {
      state.formValue['student-member-list'] = action.payload
      return {
        ...state
      }
    },
    // 删除指定的formValue
    rmFormValue(state: any, action: any) {
      state.formValue['student-member-list'].splice(action.payload, 1)
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

function deepClone(obj: any) {
  if (!obj){console.log(1)}
  return JSON.parse(JSON.stringify(obj))
}
