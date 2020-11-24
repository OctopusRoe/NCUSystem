// 学年设置 组件

import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi'

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { AcademicYearState } from '../../data';

interface AcademicYearProps {
  count: number
  dataSorce: any
  dispatch: Dispatch
}

const AcademicYear: React.FC<AcademicYearProps> = (props) => {

  const { count, dataSorce, dispatch } = props

  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setaddmodalVisible] = useState(false);
  const [editmodalVisible, seteditmodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学年全称',
      dataIndex: 'schoolYearName',
      key: 'schoolYearName',
    },
    {
      title: '学年简称',
      dataIndex: 'schoolYearShortName',
      key: 'schoolYearShortName',
    },
    {
      title: '时间段',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '当前学年',
      dataIndex: 'currentYear',
      key: 'currentYear',
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

  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {

  }

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  useEffect(()=>{
    dispatch({
      type: 'baseAcademicYear/searchAcademicYear',
      payload: {}
    })
  }, [])

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'学年设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => setaddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{total: count}}
        onChange={onChange}
        columns={columns}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setaddmodalVisible(false)} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => seteditmodalVisible(false)} />
    </div>
  );
};

export default connect(
  ({ baseAcademicYear }: { baseAcademicYear: AcademicYearState }) => {
    return {
      count: baseAcademicYear.count,
      dataSorce: baseAcademicYear.academicYearList
    }
  }
)(AcademicYear);
