// 活动管理 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

import DetailsModal from '@/components/DetailsModal/DetailsModal'
import CreateActive from './components/createActive'

const { Search } = Input;

const Admin: React.FC<{}> = () => {

  message.config({
    maxCount: 1
  })

  const [ visible, setVisible ] = useState<boolean>(false);

  const [ createVisible, setCreateVisible ] = useState<boolean>(false)

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '活动名称',
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
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
      hideInSearch: true,
    },
    {
      title: '主办单位',
      dataIndex: 'sponsor',
      key: 'sponsor',
      hideInSearch: true,
    },
    {
      title: '承办单位',
      dataIndex: 'organizer',
      key: 'organizer',
      hideInSearch: true,
    },
    {
      title: '活动时间',
      dataIndex: 'time',
      key: 'time',
      hideInSearch: true,
    },
    {
      title: '活动地点',
      dataIndex: 'place',
      key: 'place',
      hideInSearch: true,
    },
    {
      title: '活动规模',
      dataIndex: 'scale',
      key: 'scale',
      hideInSearch: true,
    },
    {
      title: '活动详情',
      dataIndex: 'info',
      key: 'info',
      hideInSearch: true,
    },
    {
      title: '审批状态',
      dataIndex: 'approval',
      key: 'approval',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (e, record) => (
        <>
          <a>报名设置</a>
          <Divider type="vertical" />
          <a>报名管理</a>
          <Divider type="vertical" />
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'报名列表'}
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入'} />,
          <Button type={'primary'} onClick={() => setCreateVisible(true)} >
            <PlusOutlined /> 发布
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <DetailsModal modalVisible={visible} onCancel={()=>{setVisible(false)}} />
      <CreateActive visible={createVisible} onCancel={()=> setCreateVisible(false)} />
    </div>
  );
};

export default connect()(Admin)