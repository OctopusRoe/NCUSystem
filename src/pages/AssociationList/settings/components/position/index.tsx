// 职务设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import DeatilsModal from '@/components/DetailsModal/DetailsModal';

const { Search } = Input;

const Position: React.FC<{}> = () => {
  const [addMOdalVisible, setAddModalViaible] = useState(false);
  const [editMOdalVisible, setEditModalViaible] = useState(false);
  const [deatilsModal, setDeatilsModal] = useState(false);
  const [stepFormValues, setStepFormValues] = useState<any>({});
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
      render: (text) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setDeatilsModal(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '社团骨干',
      dataIndex: 'communityBackbone',
      width: '20%',
      key: 'communityBackbone',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'number',
      width: '15%',
      key: 'number',
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
              setEditModalViaible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
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

  //搜索框 Search事件
  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'职务设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton onSearch={onSearch} />,
          <Button type="primary" onClick={() => setAddModalViaible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <AddModal modalVisible={addMOdalVisible} onCancel={() => setAddModalViaible(false)} />
      <DeatilsModal modalVisible={deatilsModal} onCancel={() => setDeatilsModal(false)} />
      <EditModal
        modalVisible={editMOdalVisible}
        onCancel={() => setEditModalViaible(false)}
        formValue={stepFormValues}
      />
    </div>
  );
};

export default Position;
