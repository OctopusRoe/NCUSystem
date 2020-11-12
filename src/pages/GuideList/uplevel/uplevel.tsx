// 升级审批 组件

import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import CardInfo from '@/components/CardInfo/index';

const UpLevel: React.FC<{}> = () => {
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const [cardInfo, setcardInfo] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '升级编号',
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
          <Button type={'link'} size={'small'} onClick={() => setcardInfo(true)}>
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
        2: { text: '已审批', status: 'Success' },
        3: { text: '未审批', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
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
          <Popconfirm title="是否要删除？" onCancel={cancel} onConfirm={confirm}>
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
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="升级列表"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
      />
      <CardInfo visible={cardInfo} onCancel={() => setcardInfo(false)} />
    </div>
  );
};

export default UpLevel;
