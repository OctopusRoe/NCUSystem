export interface OutregistrationFormState {
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  leaderValueList: []
  memberValueList: []
  count: string
  tGUID: string
  dGUID: string
}

export interface OutregistrationListState {
  list: {}[]
  count: number
  loading: boolean
  info: {}
  isquery: boolean
}