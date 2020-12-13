// 录用管理 组件

import React, { useState, useRef } from 'react';
import {
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Input, Divider, Switch, message, Dropdown, Menu } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import DetailsModal from '@/components/DetailsModal/DetailsModal';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

const { Search } = Input;

const Admin: React.FC<{}> = () => {
  message.config({
    maxCount: 1,
  });

  const [visible, setVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <Button
            type={'link'}
            size={'small'}
            onClick={() => {
              setVisible(true);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      key: 'stuid',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
    },
    {
      title: '学院',
      dataIndex: 'college',
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
      hideInSearch: true,
    },
    {
      title: '申请部门',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '申请职务',
      dataIndex: 'apply',
      key: 'apply',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: '录用状态',
      dataIndex: 'employedState',
      key: 'employedState',
      hideInSearch: true,
      valueEnum: {
        1: { text: '已录用', status: 'Success' },
        0: { text: '未录用', status: 'Error' },
      },
    },
  ];

  const handleMenuClick = (e: any) => {
    console.log(e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" onClick={() => message.success('通过录用')}>
        通过录用
      </Menu.Item>
      <Menu.Item key="2" onClick={() => message.warning('拒接录用')}>
        拒绝录用
      </Menu.Item>
      <Menu.Item>
        发送短信
      </Menu.Item>
      <Menu.Item key="3" onClick={() => message.warn('删除')}>
        删除
      </Menu.Item>
    </Menu>
  );

  const onSearch = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'报名列表'}
        rowSelection={{}}
        rowClassName={(record, index) => {
          let className = 'light-row';
          if (index % 2 === 1) className = 'dark-row';
          return className;
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入'} onSearch={onSearch} />,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown overlay={menu}>
              <Button type="default">
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <DetailsModal
        modalVisible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default connect()(Admin);
