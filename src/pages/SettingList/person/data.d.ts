export interface TableListItem {
  id: string;
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

//用户管理中的  state
export interface PersonState {
  personList?: {
    id: string;
    category: number;
    name: string;
    personId: string;
    gender: number;
    idcard: string;
    college: string;
    class: string;
    phone: string;
    status: number;
  }[];
  count: number;
  loading: boolean;
}
