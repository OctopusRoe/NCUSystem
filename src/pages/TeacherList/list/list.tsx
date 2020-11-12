// 社团指导列表页面

import React, { useState, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import CardInfo from '@/components/CardInfo/index';
import TeachDetailsModal from '@/components/TeachDetailsModal/TeachDetailsModal.tsx';

const List: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [cardInfo, setCardInfo] = useState(false);
  const [teachDetails, setTeachDetails] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '社团名称',
      dataIndex: 'associationName',
      key: 'associationName',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setCardInfo(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '社团类别',
      dataIndex: 'associationType',
      key: 'associationType',
      hideInSearch: true,
    },
    {
      title: '社团级别',
      dataIndex: 'associationGrade',
      key: 'associationGrade',
      valueEnum: {
        0: { text: '级别1' },
        1: { text: '级别2' },
        2: { text: '级别3' },
        3: { text: '级别4' },
        4: { text: '级别5' },
        5: { text: '级别6' },
      },
    },
    {
      title: '业务指导单位',
      dataIndex: 'department',
      key: 'department',
      valueEnum: {
        0: { text: '单位1' },
        1: { text: '单位2' },
        2: { text: '单位3' },
        3: { text: '单位4' },
        4: { text: '单位5' },
        5: { text: '单位6' },
      },
    },
    {
      title: '指导老师',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() =>console.log(record)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '成立时间',
      dataIndex: 'startTime',
      key: 'startTime',
      hideInSearch: true,
    },
    {
      title: '社团成员数(最高)',
      dataIndex: 'persons',
      key: 'persons',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_) => (
        <>
          <a>配置</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <TeachDetailsModal modalVisible={teachDetails} onCancel={() => setTeachDetails(false)} />
      <CardInfo visible={cardInfo} onCancel={() => setCardInfo(false)} />
    </div>
  );
};

export default List;
