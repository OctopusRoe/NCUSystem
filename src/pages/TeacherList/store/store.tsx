// 指导老师库 组件

import React, { useState, useRef } from 'react';
import { Button, message, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import TeachDetailsModal from '@/components/TeachDetailsModal/TeachDetailsModal.tsx';
import { PlusOutlined } from '@ant-design/icons';
import AddModal from './components/AddModal';

const TeacherStore: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [teachDetailsModal, setTeachDetailsModal] = useState(false);
  const [formvalue, setFormValue] = useState<any>({});
  const [addModal, setAddModal] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setTeachDetailsModal(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '工号',
      dataIndex: 'workID',
      key: 'workID',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '添加时间',
      dataIndex: 'addTime',
      key: 'addTime',
      hideInSearch: true,
    },
    {
      title: '聘用期',
      dataIndex: 'includes',
      key: 'includes',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_) => (
        <Popconfirm title="确定要解聘吗？" onCancel={cancel} onConfirm={confirm}>
          <a>解聘</a>
        </Popconfirm>
      ),
    },
  ];

  //删除成功
  const confirm = () => {
    message.success('解聘成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消解聘');
  };

  const onBlur = (value: string) => {
    setFormValue({
      name: value,
      phone: value,
      department: value,
      position: value,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setAddModal(true)}>
            <PlusOutlined />
            新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        //rowSelection={{}}
      />
      <TeachDetailsModal
        modalVisible={teachDetailsModal}
        onCancel={() => setTeachDetailsModal(false)}
      />
      <AddModal
        modalVisible={addModal}
        onCancel={() => setAddModal(false)}
        onBlur={onBlur}
        formValue={formvalue}
      />
    </div>
  );
};

export default TeacherStore;
