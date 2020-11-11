// 学年设置 组件

import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

const AcademicYear: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setaddmodalVisible] = useState(false);
  const [editmodalVisible, seteditmodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学年全称',
      dataIndex: 'academicfull',
      key: 'academicfull',
    },
    {
      title: '学年简称',
      dataIndex: 'academicsyssimple',
      key: 'academicsyssimple',
    },
    {
      title: '时间段',
      dataIndex: 'academictime',
      key: 'academictime',
    },
    {
      title: '当前学年',
      dataIndex: 'defaulttime',
      key: 'defaulttime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a onClick={() => seteditmodalVisible(true)}>编辑</a>
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

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'学年设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setaddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setaddmodalVisible(false)} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => seteditmodalVisible(false)} />
    </div>
  );
};

export default AcademicYear;
