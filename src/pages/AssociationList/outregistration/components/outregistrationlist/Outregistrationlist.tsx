// 登记列表 组件

import React, { useState, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { GlobalModelState } from '@/models/global'

import { TableListItem } from './data';
import { Popover, Tag, Divider } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import InfoDrawer from './components/infoDrawer';

import { Dispatch, connect } from 'umi'

import { OutregistrationListState } from '../../data'

interface OutregistrationListProps {
  dataSorce: any
  count: number,
  loading: boolean
  association: any
  dispatch: Dispatch
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const Outregistrationlist: React.FC<OutregistrationListProps> = (props) => {

  const { count, dataSorce, loading, association, dispatch } = props

  const [drawervisible, setdrawervisible] = useState(false);

  const [current, setCurrent] = useState<number>(0)

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '离/返校时间',
      dataIndex: 'date',
      key: 'date',
      hideInSearch: true,
    },
    {
      title: '外出事由',
      dataIndex: 'reason',
      key: 'reason',
      render: (_, record) => {
        const text = (
          <div>
            <p style={{width: '200px'}}>
              {record.reason}
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
      dataIndex: 'place',
      hideInSearch: true,
      key: 'place',
    },
    {
      title: '审批状态',
      dataIndex: 'result',
      key: 'result',
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

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'outregistrationList/searchList',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'outregistrationList/loading',
      payload: true
    })
  }

  useEffect(()=>{
    dispatch({
      type: 'outregistrationList/searchList',
      payload: {}
    })
  }, [])

  return (
    <div>
      <ProTable<TableListItem>

        headerTitle="登记列表"
        search={false}
        rowKey="id"
        dataSource={dataSorce}
        pagination={{total: count}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <InfoDrawer drawervisible={drawervisible} onCancel={() => setdrawervisible(false)} />
    </div>
  );
};

export default connect(
  ({outregistrationList, global}: {outregistrationList: OutregistrationListState, global: GlobalModelState}) => ({
    dataSorce: outregistrationList.list,
    count: outregistrationList.count,
    loading: outregistrationList.loading,
    association: global.association
  })
)(Outregistrationlist);
