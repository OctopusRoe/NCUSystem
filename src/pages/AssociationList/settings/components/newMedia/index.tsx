// 网络平台 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message,Image } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const showImage = () => {
  document.getElementById('control-table-QRCode')?.click();
};

const NewMedia: React.FC<{}> = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '平台名称',
      dataIndex: 'platformName',
      width: '20%',
      key: 'platformName',
      hideInSearch: true,
    },
    {
      title: '类别',
      dataIndex: 'typeOf',
      width: '15%',
      key: 'typeOf',
      hideInSearch: true,
    },
    {
      title: '二维码',
      dataIndex: 'QRCode',
      width: '15%',
      key: 'QRCode',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <>
            <img
              src={
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605588696780&di=b350f01e6ef6896f4dae07890d382d6c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F42%2F51%2F90573d7eb6115f6.jpg'
              }
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onClick={showImage}
            />
            <Image
              src={
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605588696780&di=b350f01e6ef6896f4dae07890d382d6c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F42%2F51%2F90573d7eb6115f6.jpg'
              }
              style={{ display: 'none' }}
              id={'control-table-QRCode'}
            />
          </>
        );
      },
    },
    {
      title: '访问地址',
      dataIndex: 'URLPath',
      width: '25%',
      key: 'URLPath',
      hideInSearch: true,
    },
    {
      title: '发布内容范围',
      dataIndex: 'publish',
      width: '15%',
      key: 'publish',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={confirm} onCancel={cancel}>
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

  //搜索框 search 事件
  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'网络平台'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入'} />,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <EditModal
        modalVisible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        formValue={stepFormValues}
      />
      <AddModal modalVisible={addModalVisible} onCancel={() => setAddModalVisible(false)} />
    </div>
  );
};

export default NewMedia;
