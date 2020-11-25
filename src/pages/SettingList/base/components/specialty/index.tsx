// 专业设置 组件

import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi'

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { SpecialtyState } from '../../data'

interface SpecialtyProps {
  count: number
  dataSorce: any
  loading: boolean
  dispatch: Dispatch
}

const { Search } = Input;

const Specialty: React.FC<SpecialtyProps> = (props) => {

  const { count, dataSorce, loading, dispatch } = props

  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);

  const [ rowValue, setRowValue ] = useState<any>({})

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '专业号',
      dataIndex: 'majorNo',
      key: 'majorNo',
    },
    {
      title: '专业名称',
      dataIndex: 'majorName',
      key: 'majorName',
    },
    {
      title: '学院/单位',
      dataIndex: 'college',
      key: 'college',
    },
    {
      title: '学制',
      dataIndex: 'lengthOfSchooling',
      key: 'lengthOfSchooling',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record: any) => (
        <>
          <a onClick={() => {
            setEditmodalVisible(true)
            setRowValue(record)
          }}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = (id: number) => {

    dispatch({
      type: 'baseSpecialty/deleteSpecial',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000);

  };

  //搜索框 serach方法
  const onSearch = (value: any) => {
    const data = {
      query: value
    }

    dispatch({
      type: 'baseSpecialty/searchSpecial',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSpecialty/loading',
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
      type: 'baseSpecialty/searchSpecial',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSpecialty/loading',
      payload: true
    })
  }

  useEffect(() => {
    dispatch({
      type: 'baseSpecialty/searchSpecial',
      payload: {}
    })

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseSpecialty/cleanState'
      })
    }
  }, [])

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'baseSpecialty/searchSpecial',
      payload: {}
    })

    dispatch({
      type: 'baseSpecialty/loading',
      payload: true
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'专业设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入专业名称'} onSearch={onSearch} />,
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
      <AddModal modalvisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} afterClose={reloadValue} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} afterClose={reloadValue} formValue={rowValue} />
    </div>
  );
};

export default connect(
  ({ baseSpecialty }: { baseSpecialty: SpecialtyState }) => {
    return {
      count: baseSpecialty.count,
      dataSorce: baseSpecialty.specialtyList,
      loading: baseSpecialty.loading
    }
  }
)(Specialty);
