// 招新统计 组件

import React, { useRef } from 'react';

import { Button, Input, Divider } from 'antd';
import { connect } from 'umi'
import { DownloadOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const Statistic: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '职务名称',
      dataIndex: 'positionName',
      width: '30%',
      key: 'positionName',
      hideInSearch: true,
    },
    {
      title: '社团负责人',
      dataIndex: 'positionLeader',
      width: '25%',
      key: 'positionLeader',
      hideInSearch: true,
    },
    {
      title: '社团骨干',
      dataIndex: 'positionVIP',
      width: '20%',
      key: 'positionVIP',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'srot',
      width: '15%',
      key: 'srot',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'报名统计'}
        toolBarRender={(action, {}) => [
          <Search enterButton />,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </div>
  );
};

export default connect()(Statistic)
