// 我的报名 组件

import React, { useEffect } from 'react';

import { Card, Table, Popover, Tag, Switch, message, Badge } from 'antd';
import { TableListItem } from './data';
import { connect, Dispatch } from 'umi'
import { ActiveListState } from '../../data'

interface SingUpProps {
  activeList: ActiveListState
  dispatch: Dispatch
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer',
};

const SingUp: React.FC<SingUpProps> = ({
  activeList: { list = [], loading, count},
  dispatch
}) => {
  const columns: TableListItem[] = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '活动时间',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '活动地点',
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: '活动详情',
      dataIndex: 'requirement',
      key: 'requirement',
      render: (_, record) => {
        const text = (
          <div>
            <p style={{ width: '200px' }}>{record.requirement}</p>
          </div>
        );

        return (
          <div>
            <Popover content={text} trigger={'click'}>
              <Tag color={'blue'} style={changeMouseStyle}>
                查看
              </Tag>
            </Popover>
          </div>
        );
      },
    },
    {
      title: '活动规模',
      dataIndex: 'recruit',
      key: 'recruit',
    },
    {
      title: '报名人数',
      dataIndex: 'report',
      key: 'report',
    },
    {
      title: '录取状态',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      render: (e, record) => {
        switch (e) {
          case 0:
            return <Badge status={'success'} text={'已录取'} />;
            break;
          default:
            return <Badge status={'default'} text={'未录取'} />;
            break;
        }
      },
    },
    {
      title: '报名',
      dataIndex: 'option',
      width: '10%',
      key: 'option',
      render: (e, record) => (
        <>
          <Switch
            checkedChildren="已报名"
            unCheckedChildren="未报名"
            onChange={(event) => {
              sginUp(event, e, record);
            }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'activeList/searchList',
      payload: {}
    })
  }, [])

  // Switch 组件的报名方法
  const sginUp = (event: boolean, e: any, record: any) => {
    if (!event) {
      message.warning({
        content: '取消成功',
        duration: 5,
      });
      return;
    }
  };

  return (
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          size: 'small',
          showSizeChanger: false,
          pageSize: 20,
          showTotal: (a, b) => false,
        }}
      />
    </Card>
  );
};

export default connect(
  ( {activeList}: {activeList: ActiveListState}) => ({
    activeList
  })
)(SingUp)
