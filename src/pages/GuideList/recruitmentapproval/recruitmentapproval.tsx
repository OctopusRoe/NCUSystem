// 招新审批 页面

import React, { useRef, useState } from 'react';
import { Button, Divider } from 'antd';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';
import DetailsModal from '@/components/DetailsModal/DetailsModal'

const RecruitmentApproval: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [Visible, setVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (<Button type={'link'} size={'small'} onClick={()=>{setVisible(true)}}>{text}</Button>)
    },
    {
      title: '学号',
      dataIndex: 'studentID',
      key: 'studentID',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
    },
    {
      title: '届数',
      dataIndex: 'numberOf',
      key: 'numberOf',
      hideInSearch: true,
    },
    {
      title: '所在社团',
      dataIndex: 'association',
      key: 'association',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
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
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '政治面貌',
      dataIndex: 'political',
      key: 'political',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
        { text: 'E', value: 'e' },
      ],
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a>审批</a>
          <Divider type="vertical" />
          <a>撤销</a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button size={'middle'}>
              <DownloadOutlined /> 批量导出
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <DetailsModal
        modalVisible={Visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default RecruitmentApproval;
