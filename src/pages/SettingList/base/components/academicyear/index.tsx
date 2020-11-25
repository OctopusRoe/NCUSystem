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

import moment from 'moment'

interface AcademicYearProps {
  count: number
  dataSorce: any
  loading: boolean
  dispatch: Dispatch
}

const AcademicYear: React.FC<AcademicYearProps> = (props) => {

  const { count, dataSorce, loading, dispatch } = props

  const actionRef = useRef<ActionType>();
  const [addmodalVisible, setaddmodalVisible] = useState(false);
  const [editmodalVisible, seteditmodalVisible] = useState(false);

  const [ rowValue, setRowValue ] = useState<any>({})
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
      render: (_, record: any) => (
        <>
          <a onClick={() => {
            seteditmodalVisible(true)
            setRowValue(
              {
                id: record.id,
                academicfull: record.schoolYearName,
                academicsyssimple: record.schoolYearShortName,
                academictime: [moment(record.date.split('~')[0], 'YYYY-MM-DD'), moment(record.date.split('~')[1], 'YYYY-MM-DD')],
                defaulttime: [moment(record.currentYear.split('-')[0], 'YYYY'), moment(record.currentYear.split('-')[1], 'YYYY')]
              }
            )
          }}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'baseAcademicYear/searchAcademicYear',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseAcademicYear/loading',
      payload: true
    })
  }

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'baseAcademicYear/searchAcademicYear',
      payload: {}
    })

    dispatch({
      type: 'baseAcademicYear/loading',
      payload: true
    })
  }

  //删除成功
  const confirm = (id: number) => {
    dispatch({
      type: 'baseAcademicYear/deleteAcademicYear',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000);
  };

  useEffect(()=>{
    dispatch({
      type: 'baseAcademicYear/searchAcademicYear',
      payload: {}
    })

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseAcademicYear/cleanState'
      })
    }
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
        loading={loading}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setaddmodalVisible(false)} afterClose={reloadValue} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => seteditmodalVisible(false)} formValue={rowValue} afterClose={reloadValue} />
    </div>
  );
};

export default connect(
  ({ baseAcademicYear }: { baseAcademicYear: AcademicYearState }) => {
    return {
      count: baseAcademicYear.count,
      dataSorce: baseAcademicYear.academicYearList,
      loading: baseAcademicYear.loading
    }
  }
)(AcademicYear);
