export default {
  namespace: 'base-online-platform',
  state: {
    valueList: [
      {one: '腾讯'},
      {one: '网易'}
    ]
  },
  reducers: {
    // 删除指定的valueList
    rmFormValue(state: any, action: any) {
      state.valueList.splice(action.payload, 1)
      return {
        ...state
      }
    },
  }
}