// 注销审批 组件


import { Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

const LogoutApproval: React.FC<{}> = () => {
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注销编号',
      dataIndex: 'number',
      // width: 120,
      key: 'number',
      fixed: 'left',
      // sorter: true,  //升降序
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      // width: 150,
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
      // width: 100,
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
      // width: 100,
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
      title: '业务指导单位',
      dataIndex: 'unit',
      // width: 120,
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
      // width: 100,
      valueEnum: {
        // 0: { text: '毕业', status: 'Default' },
        // 1: { text: '休学', status: 'Processing' },
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
        headerTitle="社团列表"
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

export default LogoutApproval;
