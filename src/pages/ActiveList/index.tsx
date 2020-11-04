// 活动管理 页面

import React from 'react'

import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

interface ActiveListProps {
  location: any
  children: React.ReactNode
}

const ActiveList: React.FC<ActiveListProps> = (props) => {
  const { children, location } = props
  if (location.pathname === '/active/square') {
    return <>{children}</>
  }
  return <PageContainer>{children}</PageContainer>
}

export default connect()(ActiveList)