// 班级设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import AddModal from './components/AddMOdal';
import EditModal from './components/EditModal';

const { Search } = Input;

const SetClass: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '班级号',
      dataIndex: 'classID',
      key: 'classID',
    },
    {
      title: '班级名称',
      dataIndex: 'classname',
      key: 'classname',
    },
    {
      title: '专业号',
      dataIndex: 'specialtyID',
      key: 'specialtyID',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a onClick={() => setEditmodalVisible(true)}>编辑</a>
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

  //搜索框 search方法
  const onSearch = (vlaue: any) => {
    console.log(vlaue);
  };

  return (
    <div>
      <ProTable<TableListItem>
        onExpandedRowsChange={(e) => {
          console.log(e);
        }}
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'班级设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入班级名称'} onSearch={onSearch} />,
          <Button type="primary" onClick={() => setAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button>
            <UploadOutlined />
            导入
          </Button>,
          <Button>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
    </div>
  );
};

export default SetClass;
