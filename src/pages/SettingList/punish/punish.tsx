// 违纪管理 组件

import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data';
import { queryRule } from './service';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Punish: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '处分名称',
      dataIndex: 'infomation',
      key: 'infomation',
      hideInSearch: true,
    },
    {
      title: '处分日期',
      dataIndex: 'userGroup',
      key: 'userGroup',
      hideInSearch: true,
    },
    {
      title: '处分文号',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle=""
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, {}) => [
          <Button type="default">
            <UploadOutlined /> 导入
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </div>
  );
};

export default Punish;
