// 指导老师管理 页面

import React from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
// import { } from './index.d'

const Teacher: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect((state:any)=>{
  return {
    dve: state.user
  }
})(Teacher);