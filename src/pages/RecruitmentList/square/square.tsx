// 招新广场 组件

import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ShowImgView from '@/components/ShowImgView'

import SginUpModal from './components/sginupModal'

import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

const Square: React.FC<{}> = () => {
  const [sginUpModalVisible, setSginUpModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '社团Logo',
      dataIndex: 'associationLogo',
      hideInSearch: true,
      key: 'associationLogo',
      width: '10%',
      render: (text, record) => {
        return (
          <ShowImgView id={record.name} src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'} style={{width: '30px', height: '30px'}} />
        )
      }
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      width: '',
      key: 'name',
      render: (text, record) => {
        return (
          <div onClick={()=>{setSginUpModalVisible(true)}}>{record.name}</div>
        )
      }
    },
    {
      title: '社团类别',
      dataIndex: 'type',
      width: '',
      key: 'type',
      hideInSearch: true,
    },
    {
      title: '社团级别',
      dataIndex: 'grade',
      width: '',
      key: 'grade',
      valueEnum: {
        0: {text: '级别1'},
        1: {text: '级别2'},
        2: {text: '级别3'},
        3: {text: '级别4'},
        4: {text: '级别5'},
        5: {text: '级别6'},
      }
    },
    {
      title: '业务指导单位',
      dataIndex: 'department',
      width: '',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '成立时间',
      dataIndex: 'startTime',
      hideInSearch: true,
      key: 'startTime',
      width: '',
    },
    {
      title: '报名状态',
      dataIndex: 'status',
      hideInSearch: true,
      key: 'status',
      width: '',
      
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a onClick={()=>{setSginUpModalVisible(true)}}>报名</a>
          {/* <Divider type="vertical" /> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <SginUpModal visible={sginUpModalVisible} onCancel={()=>{setSginUpModalVisible(false)}} />
    </div>
  );
};

export default connect()(Square)
