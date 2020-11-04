// 活动管理 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

import ActiveInfoModal from '@/components/ActiveInfoModal/ActiveInfoModal'
import CreateActive from './components/createActive'

const { Search } = Input;

const Admin: React.FC<{}> = () => {

  // set message component config at this component, in the same time just can show one message
  message.config({
    maxCount: 1
  })

  // control ActiveInfoModal component show or not
  const [ infoVisible, setInfoVisible ] = useState<boolean>(false)

  // set witch info can show on the ActiveInfoModal component
  const [ activeInfo, setActiveInfo ] = useState<any>()

  // control CreateActive component show or not
  const [ createVisible, setCreateVisible ] = useState<boolean>(false)

  const actionRef = useRef<ActionType>();

  // set ProTable component colums attribule info
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={()=> showInfoModal(record)}>{text}</Button>
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

  // open AcitveInfoModal component function
  const showInfoModal = (info: any) => {
    const testValue = {
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604483398656&di=fd62903774f27486cc86935a48c4480e&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F44%2F30172%2F39bb32ae796d398e.jpg',
      data: [
        [{title: '活动名称', value: '测试活动名'},{title: '活动类型', value: '类型1'},{title: '活动时间', value: new Date().toLocaleDateString()}],
        [{title: '主办单位', value: '测试用主办单位名'},{title: '承办单位', value: '测试用承办单位'}, {title: '活动规模', value: '100人'}],
        [{title: '活动地点', value: '测试用活动地点长度长度长度长度长度'}],
        [{title: '活动详情', value: '测试活动规则1,测试活动规则2,测试活动规则3,测试活动规则4,测试活动规则5,测试活动规则6'}]
      ]
    }
    setInfoVisible(true)
    setActiveInfo(testValue)
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
          <Button type={'primary'} onClick={() => setCreateVisible(true)} >
            <PlusOutlined /> 发布
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateActive visible={createVisible} onClose={() => setCreateVisible(false)} typeList={['类型1','类型2','类型3','类型4','类型5']} />
      <ActiveInfoModal visible={infoVisible} onCancel={() => setInfoVisible(false)} info={activeInfo} />
    </div>
  );
};

export default connect()(Admin)