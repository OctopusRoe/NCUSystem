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

//社团指导  外出审批 state
export interface OutRegistrationApprovalState {
  OutRegistrationApprovalList: {
    id: string;
    number: string;
    communityId: string;
    communityName: string;
    category: string;
    level: string;
    guidanceUnit: string;
    status: number;
  }[];
  count: number;
  loading: boolean;
  DetailInfoList?: {
    id: string;
    nameZh: string;
    nameEn: string;
    guidanceUnit: string;
    personNum: number;
    category: string;
    level: string;
    setUpDate: string;
    name: string;
    approvalTeacher: string;
    reason: string;
    place: string;
    responsible: string;
    memberPersonId: string;
    members: [
      {
        personId: string;
        name: string;
        college: string;
      },
    ];
  }[];
}
