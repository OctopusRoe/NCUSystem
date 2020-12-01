// 短信统计 组件

import React, { useEffect, useRef } from 'react';
import { Card, Row, Col, Divider, Typography, Input } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { PaginationProps } from 'antd/lib/pagination';
import { SttingsMessage } from './data';
import { connect, Dispatch } from 'umi';

const { Title } = Typography;
const { Search } = Input;

interface MessageProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
}

const MessageCom: React.FC<MessageProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const { count, dataSorce, loading, dispatch } = props;

  //Search 搜索框
  const onSearch = (value: any) => {
    const data = {
      Phone: value,
    };
    dispatch({
      type: 'settingsMessage/searchMessage',
      payload: data,
    });

    //修改 table 的loading 值
    dispatch({
      type: 'settingsMessage/loading',
      payload: true,
    });
  };

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
      render: (text, record) => {
        return (
          <span>
            {record.sendTime.slice(0, 10)}&nbsp;&nbsp;{record.sendTime.slice(11, 16)}
          </span>
        );
      },
    },
    {
      title: '短信内容',
      dataIndex: 'content',
      key: 'content',
      hideInSearch: true,
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'settingsMessage/searchMessage',
      payload: {},
    });
    //退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'settingsMessage/cleanState',
      });
    };
  }, []);

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'settingsMessage/searchMessage',
      payload: data,
    });

    //修改 table 的loading 值
    dispatch({
      type: 'settingsMessage/loading',
      payload: true,
    });
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
                <p style={{ textAlign: 'center' }}>{count}条</p>
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
        dataSource={dataSorce}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
    </>
  );
};

export default connect(({ settingsMessage }: { settingsMessage: SttingsMessage }) => {
  return {
    dataSorce: settingsMessage.messageList,
    count: settingsMessage.count,
    loading: settingsMessage.loading,
  };
})(MessageCom);
