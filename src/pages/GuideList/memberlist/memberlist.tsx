// 社团成员列表 组件

import React, { useRef, useState } from 'react';
import { Button, Divider } from 'antd';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';

const Member: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [infomodalVisible, setinfomodalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'period',
      key: 'period',
      valueEnum: {
        0: { text: '2017', status: '2017' },
        1: { text: '2018', status: '2018' },
        2: { text: '2019', status: '2019' },
        3: { text: '2020', status: '2020' },
      },
    },
    {
      title: '姓名',
      dataIndex: 'chinesename',
      key: 'chinesename',
    },
    {
      title: '学号',
      dataIndex: 'logo',
      key: 'logo',
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
      title: '所在社团',
      dataIndex: 'unit',
      key: 'unit',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'initiator',
      key: 'initiator',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '社团骨干',
      dataIndex: 'memberVIP',
      key: 'memberVIP',
      hideInSearch: true,
      filters: [
        { text: '是', value: 'True' },
        { text: '否', value: 'False' },
      ],
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
      hideInSearch: true,
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="key"
        rowClassName={(record, index) => {
          let className = 'light-row';
          if (index % 2 === 1) className = 'dark-row';
          return className;
        }}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button type="default">
              <DownloadOutlined /> 批量导出
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
    </>
  );
};

export default Member;
