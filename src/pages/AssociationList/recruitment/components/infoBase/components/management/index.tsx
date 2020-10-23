// 部门设置 组件

import React, { useState, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const Management: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [] = useState<boolean>(false);
  const [] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '证件照',
      dataIndex: 'photo',
      key: 'photo',
      hideInSearch: true,
      render: () => {
        return (
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width="30PX"
            height="30px"
          />
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      key: 'stuid',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
    },
    {
      title: '学院',
      dataIndex: 'college',
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '申请部门',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
      key: 'reason',
      hideInSearch: true,
    },
    {
      title: '报名状态',
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
          <a>录用</a>
          <Divider type="vertical" />
          <a >删除</a>
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
        headerTitle={'报名列表'}
        toolBarRender={(action, {}) => [
          <Search enterButton />,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
    </div>
  );
};

export default Management;
