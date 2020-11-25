// 用户组管理页面

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm, Input } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import ChangePerson from './components/ChangePerson';
import { TableListItem } from './data';

import EditModal from './components/EditModal';

const { Search } = Input;

const UserGroup: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [changePersonVisible, handleChangePersonVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户组名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限详情',
      dataIndex: 'infomation',
      key: 'infomation',
      hideInSearch: true,
      // 使用 antd Tree 组件
      render: () => <></>,
    },
    {
      title: '用户组人数',
      dataIndex: 'userGroup',
      key: 'userGroup',
      hideInSearch: true,
      render: () => <></>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '250px',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditmodalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleChangePersonVisible(true);
            }}
          >
            人员
          </a>
          <Divider type="vertical" />
          <a>权限</a>
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

  //Search 搜索框
  const onSearch = (value: any) => {};

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle="用户组列表"
        actionRef={actionRef}
        search={false}
        rowKey="key"
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入用户组名称'} onSearch={onSearch} />,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        // request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
      <ChangePerson
        onCancel={() => handleChangePersonVisible(false)}
        updateModalVisible={changePersonVisible}
        values={stepFormValues}
      />
    </div>
  );
};

export default UserGroup;
