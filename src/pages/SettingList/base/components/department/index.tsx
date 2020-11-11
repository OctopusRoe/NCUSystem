// 单位设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

const { Search } = Input;

const Department: React.FC<{}> = () => {
  const [addmodalviaible, setaddmodalvisible] = useState(false);
  const [editmodla, seteditmodal] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位号',
      dataIndex: 'departmentID',
      width: '10%',
      key: 'departmentID',
    },
    {
      title: '单位全称',
      dataIndex: 'departmentfull',
      key: 'departmentfull',
    },
    {
      title: '单位简称',
      dataIndex: 'academicsyssimple',
      key: 'academicsyssimple',
    },
    {
      title: '单位类别',
      dataIndex: 'departmenttype',
      key: 'departmenttype',
    },
    {
      title: '子单位',
      dataIndex: 'departmentchild',
      key: 'departmentchild',
    },
    {
      title: '排序号',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a onClick={() => seteditmodal(true)}>编辑</a>
          <Divider type="vertical" />
          <a>子单位</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  //Search 搜索框事件
  const Onsearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'单位列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入部门名称'} onSearch={Onsearch} />,
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
      <AddModal modalvisible={addmodalviaible} onCancel={() => setaddmodalvisible(false)} />
      <EditModal modalvisible={editmodla} onCancel={() => seteditmodal(false)} />
    </div>
  );
};

export default Department;
