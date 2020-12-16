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

export interface BaseInfoState {
}

export interface OrganizationState {
  valueList: {one: string, id: number}[]
}

export interface AssociationPositionState {
  positionList?: {

  }[]
  count: number
  loading: boolean
}

export interface NewMediaState {
  newMediaList?: {

  }[]
  count: number
  loading: boolean
}