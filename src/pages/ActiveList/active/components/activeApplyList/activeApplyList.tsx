// 活动审查进度 组件

import React, { useState, useRef } from 'react';
import { Button, message, Input, Divider, Tag, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { connect } from 'umi'

import { TableListItem } from './data.d';
import { queryRule, updateRule } from './service';
import moment from 'moment'
import ModifyDrawer from './components/modifyDrawer'

import ApplyView from '@/components/ApplyView'

interface ActivApplyListProps {
  
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const { Search } = Input

const valueList = {
  teacher: [1,2,3,4,5,6,7,8,9,0]
}

const ActiveApplyList: React.FC<ActivApplyListProps> = (props) => {

  const [ visible, setVisible ] = useState<boolean>(false)

  const [applyVisible, setApplyVisible] = useState<boolean>(false)

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
      title: '当前审批人',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        0: { text: '未审批', status: 'Error' },
        1: { text: '进行中', status: 'Success' },
        2: { text: '已结束', status: 'default'}
      },
    },
    {
      title: '审批时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '审批单位',
      dataIndex: 'results',
      key: 'results',
      render: (text, record) => {
        return record.results ? <Tag color={'green'}>通过</Tag> : <Tag color={'red'}>未通过</Tag>
      }
    },
    {
      title: '审批结果',
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
            <Popover content={textDom} trigger={'hover'}>
              <Tag color={record.results ? 'green' : 'red'} style={changeMouseStyle}>{record.results ? '通过 (审批意见)' : '未通过 (未通过原因)'}</Tag>
            </Popover>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
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
          <Divider type='vertical' />
          <a
            onClick={() => {
              setApplyVisible(true)
            }}
          >
            审批详情
          </a>
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
      <ApplyView
        visible={applyVisible}
        onClose={() => setApplyVisible(false)}
        valueList={valueList}
        loading={true}
        columns={columns}
        // dataSource={dataSource}

      />
    </div>
  );
};

export default connect()(ActiveApplyList)