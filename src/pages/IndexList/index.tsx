// 首页 页面

import React from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

import UserPage from './components/userPage'

const HomeList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer><UserPage /></PageContainer>
}

export default connect()(HomeList)