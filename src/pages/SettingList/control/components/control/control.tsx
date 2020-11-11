// 应用管理组件

import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Image, message, Popconfirm } from 'antd';
import { TableListItem } from './data.d';
import { connect } from 'umi';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { queryRule } from '../service';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

const { Search } = Input;

const showImage = () => {
  document.getElementById('control-table-logo')?.click();
};

const Control: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [addmodalVisible, handAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图标',
      dataIndex: 'logo',
      key: 'logo',
      render: (text, record) => {
        return (
          <>
            <img
              src={
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg'
              }
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onClick={showImage}
            />
            <Image
              src={
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg'
              }
              style={{ display: 'none' }}
              id={'control-table-logo'}
            />
          </>
        );
      },
    },
    {
      title: '应用名称',
      dataIndex: 'appname',
      key: 'appname',
    },
    {
      title: '应用类别',
      dataIndex: 'apptype',
      key: 'apptype',
    },
    {
      title: '链接地址',
      dataIndex: 'linkaddress',
      key: 'linkaddress',
    },

    {
      title: '操作',
      width: '10%',
      dataIndex: 'option',
      valueType: 'option',
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

  //Search  搜索框事假
  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        headerTitle="应用列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder="请输入应用名称" onSearch={onSearch} />,
          <Button type="primary" onClick={() => handAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <AddModal onCancel={() => handAddmodalVisible(false)} modalVisible={addmodalVisible} />
      <EditModal modalVisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
    </div>
  );
};

export default connect()(Control);
