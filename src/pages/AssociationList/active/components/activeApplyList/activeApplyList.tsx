// 活动审查进度 组件

import React, { useState, useRef } from 'react';
import { Button, message, Input, Divider, Tag, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { connect } from 'umi'

import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';
import moment from 'moment'
import ModifyDrawer from './components/modifyDrawer'

interface ActivApplyListProps {
  
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const { Search } = Input

const ActiveApplyList: React.FC<ActivApplyListProps> = (props) => {

  const [ visible, setVisible ] = useState<boolean>(false)

  const value = {
    name: '测试活动名',
    time: [moment('2020-11-10 12:55:00', 'YYYY-MM-DD h:mm:ss'),moment('2020-11-10 12:55:00', 'YYYY-MM-DD h:mm:ss')]
  }

  const typeList = ['测试类型1','测试类型2','测试类型3','测试类型']

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '活动名称',
      dataIndex: 'platformName',
      key: 'platformName',
    },
    {
      title: '活动类别',
      dataIndex: 'typeOf',
      key: 'typeOf',
    },
    {
      title: '审批进度',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: { text: '未审批', status: 'Error' },
        1: { text: '进行中', status: 'Success' },
        2: { text: '已结束', status: 'default'}
      },
    },
    {
      title: '审批结果',
      dataIndex: 'results',
      key: 'results',
      render: (text, record) => {
        return record.results ? <Tag color={'green'}>通过</Tag> : <Tag color={'red'}>未通过</Tag>
      }
    },
    {
      title: '拒绝原因',
      dataIndex: 'case',
      key: 'case',
      render: (text, record) => {
        // if (!record.case) {
        //   return
        // }
        const textDom = (
          <div>
            <p style={{width: '200px'}}>
              {text}
            </p>
          </div>
        )

        return (
          <div>
            <Popover content={textDom} trigger={'click'}>
              <Tag color={"blue"} style={changeMouseStyle}>查看</Tag>
            </Popover>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setVisible(true)
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
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
        headerTitle={'申请列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入'} />,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <ModifyDrawer visible={visible} value={value} onClose={()=> setVisible(false)} typeList={typeList} />
    </div>
  );
};

export default connect()(ActiveApplyList)