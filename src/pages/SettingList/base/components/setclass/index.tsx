// 班级设置 组件

import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi'

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { SetClassState } from '../../data';

interface SetClassProps {
  count: number
  dataSorce: any
  loading: boolean
  dispatch: Dispatch
}

const { Search } = Input;

const SetClass: React.FC<SetClassProps> = (props) => {

  const { count, dataSorce, loading, dispatch } = props

  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '班级号',
      dataIndex: 'classNo',
      key: 'classNo',
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '专业号',
      dataIndex: 'majorNo',
      key: 'majorNo',
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
  const onSearch = (value: any) => {
    const data = {
      query: value
    }
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSetClass/loading',
      payload: true
    })
  };

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSetClass/loading',
      payload: true
    })
  }

  useEffect(() => {
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {}
    })

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseSetClass/cleanState'
      })
    }
  }, [])

  return (
    <div>
      <ProTable<TableListItem>
        onExpandedRowsChange={(e) => {
          console.log(e);
        }}
        rowKey="id"
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
        dataSource={dataSorce}
        pagination={{total: count}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} />
    </div>
  );
};

export default connect(
  ({ baseSetClass }: { baseSetClass: SetClassState}) => {
    return {
      count: baseSetClass.count,
      dataSorce: baseSetClass.classList,
      loading: baseSetClass.loading
    }
  }
)(SetClass);
