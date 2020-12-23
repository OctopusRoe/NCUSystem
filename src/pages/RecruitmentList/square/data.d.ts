export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface Position {
  id: string;
  department: string;
  position: string;
  request: string;
  number: number;
  entryNumber: number;
  isEnter: boolean
}

export interface ListItemDataType {
  id: string;
  poster: string;
  name: string;
  communityId: string;
  slogan: string;
  endDate: string;
  category: number;
  createDate: string;
  level: number;
  responsible: string;
  qq: string;
  guidanceUnit: string;
  instructor: string;
  entryNumber: number;
  position: Position[]
}

export interface SquareState {
  list: ListItemDataType[]
  count: number
  loading: boolean
  joinNumber: number
}

export interface MysignUpState {
  list: [],
  count: number
  loading: boolean
}