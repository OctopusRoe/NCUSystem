// 应用管理的 state
export interface ControlListState {
  controlList?: {

  }[],
  count: number,
  loading: boolean
}

// 应用类别的 state
export interface CategoryState {
  valueList: {one: staring, id: number}[]
}