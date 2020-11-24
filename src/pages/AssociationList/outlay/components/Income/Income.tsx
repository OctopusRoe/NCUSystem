//赞助管理

import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from '../data';
import { queryRule } from '../service';

const { Search } = Input;

const Income: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '赞助类型',
      dataIndex: 'projectname',
      key: 'projectname',
      hideInSearch: true,
    },
    {
      title: '赞助单位',
      dataIndex: 'combined',
      key: 'combined',
      hideInSearch: true,
    },
    {
      title: '赞助单位联系人',
      children: [
        { title: '姓名', dataIndex: 'goodsname', key: 'goodsname' },
        { title: '手机号', dataIndex: 'price', key: 'price' },
      ],
    },
    {
      title: '赞助协议',
      dataIndex: 'combined',
      key: 'combined',
      hideInSearch: true,
    },
    {
      title: '审批人',
      dataIndex: 'handlers',
      key: 'handlers',
      hideInSearch: true,
    },
    {
      title: '校团委审批',
      dataIndex: 'handlers',
      key: 'handlers',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
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
        headerTitle={'赞助管理'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder='请输入'/>,
          <Button type="primary">
            <PlusOutlined /> 新增 
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </div>
  );
};

export default Income;
