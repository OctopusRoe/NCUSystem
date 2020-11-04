// 登记列表 组件

import React, { useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data';
import { queryRule } from './service';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InfoDrawer from './components/infoDrawer';

const Outregistrationlist: React.FC<{}> = () => {
  const [drawervisible, setdrawervisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    // {
    //   title: '申请人',
    //   dataIndex: 'name',
    //   key: 'name',
    //   fixed: 'left',
    // },
    {
      title: '离/返校时间',
      dataIndex: 'infomation',
      key: 'infomation',
      hideInSearch: true,
    },
    // {
    //   title: '外出事由',
    //   dataIndex: 'userGroup',
    //   key: 'userGroup',
    //   hideInSearch: true,
    // },
    {
      title: '外出地点',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
    },
    {
      title: '外出负责人',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
      render: () => {
        return (
          <>
            <a onClick={()=>setdrawervisible(true)}>详情</a>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle="登记列表"
        search={false}
        actionRef={actionRef}
        rowKey="key"
        // toolBarRender={(action, {}) => [
        //   <Button type="default">
        //     <UploadOutlined /> 导入
        //   </Button>,
        // ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <InfoDrawer drawervisible={drawervisible} onCancel={() => setdrawervisible(false)} />
    </div>
  );
};

export default Outregistrationlist;
