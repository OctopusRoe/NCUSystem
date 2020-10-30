// 短信统计 组件

import React, { useState, useRef } from 'react';

import { Card, Row, Col, Divider, Typography, Input  } from 'antd'
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule  } from './service';

const { Title } = Typography
const { Search } = Input

const columns: ProColumns<TableListItem>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    hideInSearch: true,
  },
  {
    title: '申请人姓名',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
  },
  {
    title: '学院/单位',
    dataIndex: 'college',
    key: 'college',
    hideInSearch: true,
  },
  {
    title: '验证码',
    dataIndex: 'code',
    key: 'code',
    hideInSearch: true,
  }
];

const MessageCom: React.FC<{}> = (props) => {

  const actionRef = useRef<ActionType>();
  
  return (
    <>
      <Card>
        <Row>
          <Col span={1} />
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
              <div>
                <Title level={5}>短信套餐数量</Title>
                <p style={{textAlign: 'center'}}>{'10000'}条</p>
              </div>
            </Row>
          </Col>
          <Col span={2}><Divider type={'vertical'} /></Col>
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
              <div>
                <Title level={5}>已使用数量</Title>
                <p style={{textAlign: 'center'}}>{'10000'}条</p>
              </div>
            </Row>
          </Col>
          <Col span={2}><Divider type={'vertical'} /></Col>
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
                <div>
                  <Title level={5}>未使用数量</Title>
                  <p style={{textAlign: 'center'}}>{'10000'}条</p>
                </div>
            </Row>
          </Col>
          <Col span={1} />
        </Row>
      </Card>
      <ProTable<TableListItem>
        style={{marginTop: '24px'}}
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'短信列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入手机号'} />,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />

    </>
  )
}

export default MessageCom