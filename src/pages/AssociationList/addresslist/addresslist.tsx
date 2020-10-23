// 社团通讯录页面

import React from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout'
import AddressListCom from './components'



const AddressList: React.FC<{}> = () => {
  return <PageHeaderWrapper><AddressListCom  /></PageHeaderWrapper>;
};

export default AddressList;
