export default {
  namespace: 'associationApplyStep3',
  state: {
    teacherValueList: [],
    memberValueList: []
  },
  reducers: {
    
    // 设置指导老师列表的方法
    setTeacherValueList(state: any, {payload}: any) {
      state.teacherValueList.splice(payload[0],1,{one: payload[1], two: payload[1], three: payload[1]})
      return {
        ...state
      }
    },
    
    // 删除指导老师列表的方法
    rmTeacherValueList(state: any, {payload}: any) {
      state.teacherValueList.splice(payload,1)
      return {
        ...state
      }
    },

    // 设置成员列表的方法
    setMemberValueList(state: any, {payload}: any) {
      state.memberValueList.splice(payload[0],1,{one: payload[1], two: payload[1], three: payload[1]})
      return {
        ...state
      }
    },

    // 删除成员列表的方法
    rmMemberValueList(state: any, {payload}: any) {
      state.memberValueList.splice(payload,1)
      return {
        ...state
      }
    },

    // 清除全部的方法
    cleanAll(state: any, {payload}: any) {
      state.teacherValueList = payload
      state.memberValueList = payload
      return {
        ...state
      }
    }
  }
}