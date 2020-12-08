// 等待组件

import React from 'react';
import { Card, Result } from 'antd';

import { LoadingOutlined } from '@ant-design/icons'

import { GridContent } from '@ant-design/pro-layout';

const WaitView: React.FC<{}> = () => {
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          icon={<LoadingOutlined style={{fontSize: 56}} />}
          status='info'
          title={'请稍后'}
          subTitle={'请稍后'}
          style={{ marginTop: 48, marginBottom: 16 }}
        >
          {/* {Content} */}
        </Result>
      </Card>
    </GridContent>
  )
}

export default WaitView