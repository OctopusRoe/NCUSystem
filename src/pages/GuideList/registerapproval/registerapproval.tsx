// 注册审批页面
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {} from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import CardInfo from '@/components/CardInfo/index';
import { connect, Dispatch } from 'umi';

interface RegisterApprovalProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
}

const RegisterApproval: React.FC<RegisterApprovalProps> = (props) => {
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const actionRef = useRef<ActionType>();
  // const { count, dataSource, loading, dispatch } = props;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注册编号',
      dataIndex: 'number',
      key: 'number',
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
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
      title: '业务指导单位',
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
        1: { text: '已审批', status: 'Success' },
        0: { text: '未审批', status: 'Error' },
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
          <Popconfirm title="是否要删除？" onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
      />
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
      />
      <CardInfo visible={cardInfo} onCancel={() => setCardInfo(false)} />
    </div>
  );
};

export default RegisterApproval;
