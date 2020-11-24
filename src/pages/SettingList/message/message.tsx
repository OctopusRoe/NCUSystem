// 短信统计 组件

import React, { useRef } from 'react';
import { Card, Row, Col, Divider, Typography, Input } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { getTable } from './service';

const { Title } = Typography;
const { Search } = Input;

const columns: ProColumns<TableListItem>[] = [
  {
    title: '发送对象',
    dataIndex: 'personId',
    key: 'personId',
    hideInSearch: true,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
    hideInSearch: true,
  },
  {
    title: '发送时间',
    dataIndex: 'sendTime',
    key: 'sendTime',
    hideInSearch: true,
  },
  {
    title: '短信内容',
    dataIndex: 'content',
    key: 'content',
    hideInSearch: true,
  },
];

const MessageCom: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  //Search 搜索框
  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <>
      <Card>
        <Row>
          <Col span={1} />
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
              <div>
                <Title style={{ textAlign: 'center' }} level={5}>
                  总额度
                </Title>
                <p style={{ textAlign: 'center' }}>{'10000'}条</p>
              </div>
            </Row>
          </Col>
          <Col span={2}>
            <Divider type={'vertical'} />
          </Col>
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
              <div>
                <Title style={{ textAlign: 'center' }} level={5}>
                  已发送
                </Title>
                <p style={{ textAlign: 'center' }}>{'10000'}条</p>
              </div>
            </Row>
          </Col>
          <Col span={2}>
            <Divider type={'vertical'} />
          </Col>
          <Col span={6}>
            <Row justify={'center'} align={'middle'}>
              <div>
                <Title style={{ textAlign: 'center' }} level={5}>
                  余额
                </Title>
                <p style={{ textAlign: 'center' }}>{'10000'}条</p>
              </div>
            </Row>
          </Col>
          <Col span={1} />
        </Row>
      </Card>
      <ProTable<TableListItem>
        style={{ marginTop: '24px' }}
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'短信列表'}
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入手机号'} onSearch={onSearch} />,
        ]}
        request={(params) => getTable(params)}
        columns={columns}
      />
    </>
  );
};

export default MessageCom;
