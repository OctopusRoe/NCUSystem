// 用户管理页面

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider} from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import ChangePerson from './components/ChangePerson';
import { TableListItem } from './data';
import { queryRule } from './service';

const UserGroup: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [changePersonVisible, handleChangePersonVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户组名称',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      fixed: 'left',
    },
    {
      title: '权限详情',
      dataIndex: 'infomation',
      width: 250,
      key: 'infomation',
      hideInSearch: true,
      // 使用 antd Tree 组件
      render: () => <></>,
    },
    {
      title: '用户组人数',
      dataIndex: 'userGroup',
      width: 150,
      key: 'userGroup',
      hideInSearch: true,
      render: () => <></>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 550,
      hideInSearch: true,
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 180,
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleChangePersonVisible(true);
              setStepFormValues(record);
            }}
          >
            人员
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            权限
          </a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle="权限列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, {}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />

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
