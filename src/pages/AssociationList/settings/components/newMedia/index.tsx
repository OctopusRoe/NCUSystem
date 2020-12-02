// 网络平台 组件

import React, { useState } from 'react';
import { Input, Divider, Popconfirm, message,Image } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi';

import { NewMediaState } from '../../data'

interface NewMediaProps {
  count: number
  loading: boolean
  dataSorce: any
  dispatch: Dispatch
}

const { Search } = Input;

const NewMedia: React.FC<NewMediaProps> = (props) => {

  const { count, loading, dataSorce, dispatch } = props

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState<any>({});

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
              onClick={() => document.getElementById(record.name)?.click()}
            />
            <Image
              src={
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605588696780&di=b350f01e6ef6896f4dae07890d382d6c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F42%2F51%2F90573d7eb6115f6.jpg'
              }
              style={{ display: 'none' }}
              id={record.name}
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
          <Popconfirm title="是否要删除？" onConfirm={confirm}>
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

  //搜索框 search 事件
  const onSearch = (value: any) => {
    console.log(value);
  };

  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'associationNewMedia/searchNewMedia',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'associationNewMedia/loading',
      payload: true,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        headerTitle={'网络平台'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入'} onSearch={onSearch} />,
        ]}
        dataSource={dataSorce}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
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

export default connect(
  ({associationNewMedia}: {associationNewMedia: NewMediaState}) => (
    {
      count: associationNewMedia.count,
      loading: associationNewMedia.loading,
      dataSorce: associationNewMedia.newMediaList
    }
  )
)(NewMedia);
