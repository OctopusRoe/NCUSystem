// 录用管理 组件

import React, { useState, useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Switch, message, } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import DetailsModal from '@/components/DetailsModal/DetailsModal'
import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

const { Search } = Input;

const Admin: React.FC<{}> = () => {

  message.config({
    maxCount: 1
  })

  const [ visible, setVisible ] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={()=>{setVisible(true)}}>{text}</Button>
        )
      }
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (e, record) => (
        <>
          <Switch checkedChildren="已报送" unCheckedChildren="未报送" onChange={(bool: boolean) => {agree(bool, record)}}  />
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  // 录用的方法
  const agree = (bool: boolean, record: any) => {
    if (!bool) {
      message.warning({
        content: '未录用',
        duration: 5
      })
      return
    }

    message.success({
      content: '已录用',
      duration: 5
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'报名列表'}
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入'} />,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <DetailsModal modalVisible={visible} onCancel={()=>{setVisible(false)}} />
    </div>
  );
};

export default connect()(Admin)
