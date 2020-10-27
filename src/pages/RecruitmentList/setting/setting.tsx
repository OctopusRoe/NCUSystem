// 招新设置 组件

import React, { useRef } from 'react';

import { Button, Input, Divider, DatePicker } from 'antd';
import { connect } from 'umi';
import { DownloadOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const Statistic: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '招新要求',
      dataIndex: 'requirements',
      key: 'requirements',
      hideInSearch: true,
    },
    {
      title: '招新人数',
      dataIndex: 'count',
      key: 'count',
      hideInSearch: true,
    },
    {
      title: '报名人数',
      dataIndex: 'registrationnumber',
      key: 'registrationnumber',
      hideInSearch: true,
    },
    {
      title: '录取人数',
      dataIndex: 'enrollmentnumber',
      key: 'enrollmentnumber',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
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
          headerTitle={''}
          toolBarRender={(action, {}) => [
            // <Search enterButton />,
            <DatePicker picker="year" />,
            <Button type="primary">
              <SettingOutlined />
              设置
            </Button>,
            <Button type="default">
              <QrcodeOutlined />
              二维码
            </Button>,
          ]}
          request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
          columns={columns}
        />
    </div>
  );
};

export default connect()(Statistic);
