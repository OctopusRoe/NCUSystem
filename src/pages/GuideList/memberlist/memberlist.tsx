// 社团成员列表 组件

import React, { useRef, useState, useEffect } from 'react';
import { Button, Tag, Input, Select } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableListItem } from './data';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';
import { GlobalModelState } from '@/models/global'

import { MemberListState } from './data'

import { Dispatch, connect } from 'umi'
import { downLoad } from './service';

interface MemberProps {
  dataSource: any
  schoolYear: any
  loading: boolean
  count: number
  dispatch: Dispatch
}

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.schoolYearShortName} key={item.schoolYearName}>{item.schoolYearName}</Option>
  ))
}

const {Option} = Select

const Member: React.FC<MemberProps> = (props) => {

  const { dataSource, schoolYear, loading, count, dispatch } = props

  const [current, setCurrent] = useState<number>(0)

  const [searchValue, setSearchValue] = useState<{session?: string, name?: string, personId?: string}>({})
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'session',
      key: 'session',
      renderFormItem: () => {
        return (
          <Select placeholder={'请选择'}>
            {getOption(schoolYear)}
          </Select>
        )
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      renderFormItem: () => {
        return <Input placeholder={'请输入姓名'} autoComplete={'off'} />
      }
    },
    {
      title: '学号',
      dataIndex: 'personId',
      key: 'personId',
      renderFormItem: () => {
        return <Input placeholder={'请输入学号'} autoComplete={'off'} />
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
    },
    {
      title: '所在社团',
      dataIndex: 'community',
      key: 'community',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '社团骨干',
      dataIndex: 'backbone',
      key: 'backbone',
      hideInSearch: true,
      render: (text, record) => {
        return (
          <>
            {text ? <Tag color={'success'}> 是 </Tag> : <Tag color={'red'}> 否 </Tag> }
          </>
        )
      },
      filters: [
        { text: '是', value: 'True' },
        { text: '否', value: 'False' },
      ],
    },
    {
      title: '政治面貌',
      dataIndex: 'politicalFace',
      key: 'politicalFace',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
        { text: 'E', value: 'e' },
      ],
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
  ];

   // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {

    const data = {
      session: searchValue.session && searchValue.session,
      name: searchValue.name && searchValue.name,
      personId: searchValue.personId && searchValue.personId,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current
    }

    dispatch({
      type: 'memberListModel/loading',
      payload: true
    })

    dispatch({
      type: 'memberListModel/searchList',
      payload: data
    })

    setCurrent(pagination.current as number)

  }

  useEffect(() => {
    dispatch({
      type: 'memberListModel/searchList',
      payload: {}
    })
  }, [])

  const onSubmit = (e: any) => {

    setSearchValue(e)

    const data = {
      session: e.session,
      name: e.name,
      personId: e.personId
    }

    dispatch({
      type: 'memberListModel/searchList',
      payload: data
    })

    dispatch({
      type: 'memberListModel/loading',
      payload: true
    })
  }

  const onReset = () => {

    setSearchValue({})

    dispatch({
      type: 'memberListModel/searchList',
      payload: {}
    })

    dispatch({
      type: 'memberListModel/loading',
      payload: true
    })

    setCurrent(1)
  }

  const downLoad = (e: any) => {

    let data = []
    if (e.length !== 0) {
      data = e.map((item: any) => item.id)
    }

    dispatch({
      type: 'memberListModel/downLoad',
      payload: data
    })
  }

  return (
    <>
      <ProTable<TableListItem>
        onSubmit={onSubmit}
        onReset={onReset}
        headerTitle="成员列表"
        rowKey="id"
        toolBarRender={(_action, { selectedRows }) => {
          
          return [
            <Button type="default" onClick={() => downLoad(selectedRows)}>
              <DownloadOutlined /> { selectedRows && selectedRows.length > 0 ? '批量导出' : '导出' }
            </Button>
          ]
        }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={{ total: count, current: current}}
        rowSelection={{}}
      />
    </>
  );
};

export default connect(
  ({memberListModel, global}: {memberListModel: MemberListState, global: GlobalModelState}) => ({
    dataSource: memberListModel.list,
    loading: memberListModel.loading,
    count: memberListModel.count,
    schoolYear: global.SelectValue.schoolYear
  })
)(Member);
