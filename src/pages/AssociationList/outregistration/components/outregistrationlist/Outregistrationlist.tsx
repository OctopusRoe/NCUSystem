// 登记列表 组件

import React, { useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data';
import { queryRule } from './service';
import { Popover, Tag, Divider } from 'antd';

import InfoDrawer from './components/infoDrawer';

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const Outregistrationlist: React.FC<{}> = () => {
  const [drawervisible, setdrawervisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '离/返校时间',
      dataIndex: 'infomation',
      key: 'infomation',
      hideInSearch: true,
    },
    {
      title: '外出事由',
      dataIndex: 'case',
      key: 'case',
      render: (_, record) => {
        const text = (
          <div>
            <p style={{width: '200px'}}>
              {record.case}
            </p>
          </div>
        )

        return (
          <div>
            <Popover content={text} trigger={'click'}>
              <Tag color={"blue"} style={changeMouseStyle}>查看</Tag>
            </Popover>
          </div>
        )
      }
    },
    {
      title: '外出地点',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
    },
    {
      title: '审批状态',
      dataIndex: 'apply',
      key: 'apply',
    },
    // {
    //   title: '外出负责人',
    //   dataIndex: 'desc',
    //   hideInSearch: true,
    //   key: 'desc',
    // },
    {
      title: '操作',
      dataIndex: 'desc',
      hideInSearch: true,
      key: 'desc',
      width: '10%',
      render: () => {
        return (
          <>
            <a onClick={()=>setdrawervisible(true)}>详情</a>
            <Divider type="vertical" />
            <a onClick={()=>setdrawervisible(true)}>编辑</a>
            <Divider type="vertical" />
            <a >删除</a>
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
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <InfoDrawer drawervisible={drawervisible} onCancel={() => setdrawervisible(false)} />
    </div>
  );
};

export default Outregistrationlist;
