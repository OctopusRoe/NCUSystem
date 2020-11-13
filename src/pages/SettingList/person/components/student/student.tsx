// 用户管理页面

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm, Switch } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

const Student: React.FC<{}> = () => {
  const [addmodalVisible, setAddmodalVisible] = useState<boolean>(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const [detailsmodalVisible, setDetailmodalVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setDetailmodalVisible(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '学号/工号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '身份证号',
      dataIndex: 'IdCard',
      key: 'IdCard',
    },
    {
      title: '学院/单位',
      dataIndex: 'college',
      key: 'college',
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_) => (
        <>
          <a onClick={() => setEditmodalVisible(true)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定要密码重置吗？" onConfirm={pwdConfirm} onCancel={pwdCancel}>
            <a>密码重置</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Switch
            checkedChildren="锁定"
            unCheckedChildren="解除"
            defaultChecked
            onChange={switchChange}
          />
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //switch 开关
  const switchChange = (checked: any) => {
    console.log(checked);
  };

  //密码重置成功
  const pwdConfirm = () => {
    message.success('密码重置成功');
  };

  //取消密码重置
  const pwdCancel = () => {
    message.error('取消重置');
  };
  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, {}) => [
          <Button type="primary" onClick={() => setAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        //rowSelection={{}}
      />
      <AddModal modalVisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
      <DetailsModal
        modalVisible={detailsmodalVisible}
        onCancel={() => setDetailmodalVisible(false)}
      />
    </div>
  );
};

export default Student;
