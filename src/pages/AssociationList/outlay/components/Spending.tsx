//支出管理

import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const Spending: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '项目名称',
      dataIndex: 'projectname',
      key: 'projectname',
      hideInSearch: true,
    },
    {
      title: '支出明细',
      children: [
        { title: '品名', dataIndex: 'goodsname', key: 'goodsname' },
        { title: '单价', dataIndex: 'price', key: 'price' },
        { title: '数量', dataIndex: 'count', key: 'count' },
        { title: '金额', dataIndex: 'amount', key: 'amount' },
      ],
    },
    {
      title: '合计',
      dataIndex: 'combined',
      key: 'combined',
      hideInSearch: true,
    },
    {
      title: '经手人',
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
        headerTitle={'支出管理'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton />,
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

export default Spending;
