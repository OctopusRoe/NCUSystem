export interface TagType {
  key: string;
  label: string;
}

export interface GeographicItemType {
  name: string;
  id: string;
}

export interface GeographicType {
  province: GeographicItemType;
  city: GeographicItemType;
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface CurrentUser {
  name: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
}

// 指导单位设置的 state
export interface DepartmentState {
  departmentList?: {
    id: number,
    name: string,
    shortName: string,
    organizationType: number,
    organizationTypeName: null,
    level: number,
    childrens: []
  }[]
  count: number
  loading: boolean
}

// 学年设置的 state
export interface AcademicYearState {
  academicYearList?: {
    id: number,
    schoolYearName: string,
    schoolYearShortName: string,
    startDate: string,
    endDate: string,
    currentYear: string
  }[]
  count: number
  loading: boolean
}

// 专业设置的 state
export interface SpecialtyState {
  specialtyList?: {}[]
  count: number
  loading: boolean
}

// 班级设置的 state
export interface SetClassState {
  classList?: {}[]
  count: number
  loading: boolean
}

// 网络平台类型的 state
export interface OnlinePlatformState {
  valueList: {one: string,id: number}[]
}

// 社团级别的 state
export interface AssociationGradeState {
  valueList: {one: string,id: number}[]
}

// 社团类别的 state
export interface AssociationTypeState {
  valueList: {one: string,id: number}[]
}

// 单位类别的 state
export interface DepartmentTypeState {
  valueList: {one: string,id: number}[]
}
