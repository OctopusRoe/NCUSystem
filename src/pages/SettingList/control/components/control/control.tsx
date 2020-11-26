// 应用管理-应用管理 组件

import React, { useRef, useState, useEffect } from 'react';
import { Button, Divider, Input, Image, message, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi';

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { ControlListState, CategoryState } from '../../data'

interface ControlProps {
  dataSorce: any
  count: number
  loading: boolean
  typeValue: {one: string, id: number}[]
  dispatch: Dispatch
}

const { Search } = Input;

const Control: React.FC<ControlProps> = (props) => {

  const { dataSorce, count, loading, typeValue, dispatch } = props
  
  const actionRef = useRef<ActionType>();
  const [addmodalVisible, handAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图标',
      dataIndex: 'src',
      key: 'src',
      render: (text, record: any) => {
        console.log(record)
        return (
          <>
            <img
              src={record.src}
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onClick={() => document.getElementById('control-table-logo')?.click()}
            />
            <Image
              src={record.src}
              style={{ display: 'none' }}
              id={'control-table-logo'}
            />
          </>
        );
      },
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
    },
    {
      title: '应用类别',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '链接地址',
      dataIndex: 'appURI',
      key: 'appURI',
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

  useEffect(() => {
    dispatch({
      type: 'controlList/searchControl',
      payload: {}
    })
  },[])

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'controlList/searchControl',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'controlList/loading',
      payload: true
    })
  }

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
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder="请输入应用名称" onSearch={onSearch} />,
          <Button type="primary" onClick={() => handAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{total: count}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal onCancel={() => handAddmodalVisible(false)} modalVisible={addmodalVisible} typeValue={typeValue} />
      <EditModal modalVisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
    </div>
  );
};

export default connect(
  ({ controlList, controlCategory }: { controlList: ControlListState, controlCategory: CategoryState }) => {
    return {
      dataSorce: controlList.controlList,
      count: controlList.count,
      loading: controlList.loading,
      typeValue: controlCategory.valueList
    }
  }
)(Control);
