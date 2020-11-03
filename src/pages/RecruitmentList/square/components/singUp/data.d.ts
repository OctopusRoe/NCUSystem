import { ReactNode } from "react";

export interface TableListItem {
  title: string
  dataIndex: string
  width?: number | string
  key: string
  render?: (e: any, a: ListItem) => ReactNode
}

export interface ListItem {
  key: number
  department: string
  position: string
  requirement: string
  recruit: string
  report: string
  option: boolean
}