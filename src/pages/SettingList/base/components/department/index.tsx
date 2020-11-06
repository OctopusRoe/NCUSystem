// 单位设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import AddModal from './components/AddModal';

const { Search } = Input;

const Department: React.FC<{}> = () => {
  const [addmodalviaible, setaddmodalvisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位号',
      dataIndex: 'departmentID',
      width: '10%',
      key: 'departmentID',
      hideInSearch: true,
    },
    {
      title: '单位全称',
      dataIndex: 'departmentfull',
      width: '25%',
      key: 'departmentfull',
    },
    {
      title: '单位简称',
      dataIndex: 'academicsyssimple',
      width: '15%',
      key: 'academicsyssimple',
      hideInSearch: true,
    },
    {
      title: '单位类别',
      dataIndex: 'departmenttype',
      width: '10%',
      key: 'departmenttype',
      hideInSearch: true,
    },
    {
      title: '子单位',
      dataIndex: 'departmentchild',
      width: '15%',
      key: 'departmentchild',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      width: '10%',
      key: 'sort',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a href="">子单位</a>
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
        headerTitle={'单位列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入部门名称'} />,
          <Button
            type="primary"
            onClick={() => {
              setaddmodalvisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <AddModal
        modalvisible={addmodalviaible}
        onCancel={() => {
          setaddmodalvisible(false);
        }}
      />
    </div>
  );
};

export default Department;
