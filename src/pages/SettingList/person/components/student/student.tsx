// 用户管理页面

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Switch } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import InfoModal from '@/components/InfoModal/Infomodal';
import CreateForm from '@/components/CreateForm/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';
import ModalForm from './components/ModalForm'

const Student: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [infomodalModalVisible, handleinfomodalModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户类别',
      dataIndex: 'category',
      hideInSearch: true,
      key: 'category',
      width: 150,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: 80,
      key: 'userName',
      fixed: 'left',
    },
    {
      title: '学号/工号',
      dataIndex: 'studentId',
      width: 120,
      key: 'studentId',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      width: 100,
      key: 'sex',
    },
    {
      title: '身份证号',
      dataIndex: 'IdCard',
      hideInSearch: false,
      key: 'IdCard',
      width: 150,
    },
    {
      title: '学院/单位',
      dataIndex: 'college',
      hideInSearch: true,
      key: 'college',
      width: 200,
    },
    {
      title: '班级',
      dataIndex: 'class',
      hideInSearch: true,
      key: 'class',
      width: 200,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: false,
      key: 'phone',
      width: 150,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => {}}>密码重置</a>
          <Divider type="vertical" />
          <Switch checkedChildren="锁定" unCheckedChildren="解除" defaultChecked />
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        // rowSelection={{}}
      />
      <InfoModal
        onCancel={() => handleinfomodalModalVisible(false)}
        modalVisible={infomodalModalVisible}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} form={<ModalForm/>}/>
    </div>
  );
};

export default Student;
