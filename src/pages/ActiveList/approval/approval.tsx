// 活动审批 组件

// 外出审批 组件

import { Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import DetailsModal from '@/components/DetailsModal/DetailsModal';
import ApprovalDrawer from './components/ApprovalDrawer';

const Approval: React.FC<{}> = () => {
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '活动名称',
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
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
      ],
    },
    {
      title: '主办单位',
      dataIndex: 'unit',
      key: 'unit',
      hideInSearch: true,
    },
    {
      title: '活动时间',
      dataIndex: 'time',
      key: 'time',
      hideInSearch: true,
    },
    {
      title: '活动地点',
      dataIndex: 'place',
      hideInSearch: false,
      key: 'place',
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
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
      />
    </div>
  );
};

export default Approval;
