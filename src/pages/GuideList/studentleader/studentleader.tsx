// 学生负责人 组件

import React, { useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import DetailsModal from '@/components/DetailsModal/DetailsModal'

const StudentLeader: React.FC<{}> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'numberOf',
      key: 'numberOf',
    },
    {
      title: '社团名称',
      dataIndex: 'associationName',
      key: 'associationName'
    },
    {
      title: '社团类别',
      dataIndex: 'type',
      key: 'type',
      hideInSearch: true,
    },
    {
      title: '社团等级',
      dataIndex: 'grade',
      key: 'grade',
      hideInSearch: true,
    },
    {
      title: '指导单位',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '学生负责人',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text, record) => {
        return (<Button type={'link'} size={'small'} onClick={()=>{setVisible(true)}}>{text}</Button>)
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      key: 'QQ',
      hideInSearch: true
    },
    {
      title: '政治面貌',
      dataIndex: 'politics',
      key: 'politics',
      hideInSearch: true,
    }
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="负责人列表"
        pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>
          ]}
      />
      <DetailsModal modalVisible={visible} onCancel={()=>{setVisible(false)}} />
    </div>
  );
}


export default StudentLeader