export interface TableListItem {
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

//社团指导  注册审批 state
export interface RegisterApprovalState {
  RegisterApprovalList: {
    id: string;
    number: string;
    nameZh: string;
    category: string;
    level: string;
    organization: string;
    status: number;
  }[];
  count: number;
  loading: boolean;
  DetailInfoList?: {
    nameZh: string;
    nameEn: string;
    guidance: string;
    memberCount: number;
    category: string;
    level: string;
    constitution: string;
    front: string;
    opposite: string;
    members: [
      {
        personId: string;
        name: string;
        college: string;
      },
    ];
  }[];
}

//社团指导  注册审批  申请详情
export interface DetailInfoState {
  DetailInfoList: {
    nameZh: string;
    nameEn: string;
    guidance: string;
    memberCount: number;
    category: string;
    level: string;
    constitution: string;
    front: string;
    opposite: string;
    members: [
      {
        personId: string;
        name: string;
        college: string;
      },
    ];
  }[];
}
