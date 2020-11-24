// 违纪管理 组件

import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { getTable } from './service';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Punish: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'personId',
      key: 'personId',
      fixed: 'left',
    },
    {
      title: '处分名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '处分日期',
      dataIndex: 'punishDate',
      key: 'punishDate',
      hideInSearch: true,
    },
    {
      title: '处分文号',
      dataIndex: 'number',
      hideInSearch: true,
      key: 'number',
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle=""
        actionRef={actionRef}
        // search={}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Button type="default">
            <UploadOutlined /> 导入
          </Button>,
        ]}
        request={(params) => getTable(params)}
        columns={columns}
      />
    </div>
  );
};

export default Punish;
