// 单位设置 组件

import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi'

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { DepartmentState, DepartmentTypeState } from '../../data';

interface DepartmentProps {
  count: number;
  dataSorce: any;
  typeValue: {one: string, id: number}[];
  dispatch: Dispatch;
}

const { Search } = Input;

const Department: React.FC<DepartmentProps> = (props) => {
  
  const { count, typeValue, dataSorce, dispatch } = props
  
  const [addmodalviaible, setaddmodalvisible] = useState(false);
  const [editmodla, seteditmodal] = useState(false);
  const actionRef = useRef<ActionType>();
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位号',
      dataIndex: 'number',
      width: '10%',
      key: 'number',
    },
    {
      title: '单位全称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '单位简称',
      dataIndex: 'shortName',
      key: 'shortName',
    },
    {
      title: '单位类别',
      dataIndex: 'organizationTypeName',
      key: 'organizationTypeName',
    },
    {
      title: '子单位',
      dataIndex: 'test',
      key: 'test',
    },
    {
      title: '排序号',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a onClick={() => seteditmodal(true)}>编辑</a>
          <Divider type="vertical" />
          <a>子单位</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(()=>{
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: {}
    })
  },[])

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  //Search 搜索框事件
  const onSearch = (value: any) => {
    const data = {
      query: value
    }
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: data
    })
  };

  
  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: data
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'单位列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入单位名称'} onSearch={onSearch} />,
          <Button
            type="primary"
            onClick={() => {
              setaddmodalvisible(true);
            }}
          >
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
      />
      <AddModal modalvisible={addmodalviaible} onCancel={() => setaddmodalvisible(false)} typeValue={typeValue} />
      <EditModal modalvisible={editmodla} onCancel={() => seteditmodal(false)} />
    </div>
  );
};

export default connect(
  ({ baseDepartment, baseDepartmentType }: { baseDepartment: DepartmentState, baseDepartmentType: DepartmentTypeState }) => {
    return {
      typeValue: baseDepartmentType.valueList,
      dataSorce: baseDepartment.departmentList,
      count: baseDepartment.count
    }
  }
)(Department);
