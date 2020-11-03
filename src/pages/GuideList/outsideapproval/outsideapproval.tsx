// 外出审批 组件

import { Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

const OutsideApproval: React.FC<{}> = () => {
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '外出编号',
      dataIndex: 'number',
      key: 'number',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, record) => {
        return (
          <>
            <a
              onClick={() => {
                setDetailsModalVisible(true);
              }}
            >
              {record.name}
            </a>
          </>
        );
      },
    },
    {
      title: '社团类别',
      dataIndex: 'category',
      key: 'category',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
      ],
    },
    {
      title: '社团级别',
      dataIndex: 'level',
      key: 'level',
      hideInSearch: true,
      filters: [
        {
          text: '一级社团',
          value: 'one',
        },
        {
          text: '二级社团',
          value: 'two',
        },
        {
          text: '三级社团',
          value: 'three',
        },
      ],
    },
    {
      title: '指导单位',
      dataIndex: 'unit',
      key: 'unit',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
      ],
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      hideInSearch: false,
      key: 'status',
      valueEnum: {
        2: { text: '已审批', status: 'Success' },
        3: { text: '未审批', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_) => (
        <>
          <a
            onClick={() => {
              setApprovalDrawerVisible(true);
            }}
          >
            审核
          </a>
          <Divider type="vertical" />
          <a>删除</a>
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
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <DetailsModal
        modalVisible={DetailsModalVisible}
        onCancel={() => {
          setDetailsModalVisible(false);
        }}
      />
    </div>
  );
};

export default OutsideApproval;
