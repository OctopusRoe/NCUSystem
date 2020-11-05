// 职务设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const Position: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
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
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
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
        headerTitle={'职务设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton />,
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'middle'}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
    </div>
  );
};

export default Position;
