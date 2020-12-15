// 学生负责人 组件

import React, { useState, useEffect } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { Button, Select } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { DownloadOutlined } from '@ant-design/icons';
import _ from 'lodash'

import DetailsModal from '@/components/DetailsModal/DetailsModal'

import { Dispatch, connect } from 'umi'

import { StudentLeaderState } from './data'

import { GlobalModelState } from '@/models/global'

interface StudentLeaderProps {
  dataSource: any
  schoolYear: any
  loading: boolean
  count: number
  selectedRowKeys: any
  selectedRows: any
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

const StudentLeader: React.FC<StudentLeaderProps> = (props) => {

  const { dataSource, schoolYear, loading, count, selectedRowKeys, selectedRows, dispatch } = props

  const [visible, setVisible] = useState<boolean>(false)

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
      title: '社团名称',
      dataIndex: 'community',
      key: 'community'
    },
    {
      title: '社团类别',
      dataIndex: 'type',
      key: 'type',
      hideInSearch: true,
    },
    {
      title: '社团等级',
      dataIndex: 'grade',
      key: 'grade',
      hideInSearch: true,
    },
    {
      title: '指导单位',
      dataIndex: 'department',
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '学生负责人',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text, record) => {
        return (<Button type={'link'} size={'small'} onClick={()=>{setVisible(true)}}>{text}</Button>)
      }
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      key: 'QQ',
      hideInSearch: true
    },
    {
      title: '政治面貌',
      dataIndex: 'politicalFace',
      key: 'politicalFace',
      hideInSearch: true,
    }
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
      type: 'studentLeader/loading',
      payload: true
    })

    dispatch({
      type: 'studentLeader/searchList',
      payload: data
    })

    setCurrent(pagination.current as number)

  }

  useEffect(() => {
    dispatch({
      type: 'studentLeader/searchList',
      payload: {}
    })

    return () => {
      dispatch({
        type: 'studentLeader/clean'
      })
    }
  },[])

  const onSubmit = (e: any) => {
    
    setSearchValue(e)

    const data = {
      session: e.session,
      name: e.name
    }

    dispatch({
      type: 'studentLeader/searchList',
      payload: data
    })

    dispatch({
      type: 'studentLeader/loading',
      payload: true
    })

  }

  const onReset = () => {

    setSearchValue({})

    dispatch({
      type: 'studentLeader/searchList',
      payload: {}
    })

    dispatch({
      type: 'studentLeader/loading',
      payload: true
    })

    setCurrent(1)
  }

  // 单选方法
  const onSelect = (record: any, selected: boolean) => {

    const newSelectRows = selectedRows
    if (selected) {
      newSelectRows.push(record)
    } else {
      _.remove(newSelectRows, (item: any) => (item.id === record.id))
    }

    const selectedRowKeys = _.map(newSelectRows, 'id')
    dispatch({
      type: 'studentLeader/saveSelectRowKeys',
      payload: {
        selectedRowKeys,
        selectedRows: newSelectRows
      }
    })
  }

  // 全选方法
  const onSelectAll = (selected: boolean, changeRows: any) => {
    let newSelectRows = selectedRows
    const changeRowKeys = _.map(changeRows, 'id')
    if (selected) {
      const sa = _.uniqBy(_.concat(newSelectRows, changeRows), 'id')
      newSelectRows = sa.filter((item: any) => item !== undefined)
    } else {
      _.remove(newSelectRows, (item: any) => (_.includes(changeRowKeys, item.id)))
    }
    const selectedRowKeys = _.map(newSelectRows, 'id')
    dispatch({
      type: 'studentLeader/saveSelectRowKeys',
      payload: {
        selectedRowKeys,
        selectedRows: newSelectRows
      }
    })
  }

  const selectChange = (selectedRowKeys: any, selectedRows: any) => {
    if (selectedRowKeys.length === 0 && selectedRows.length === 0) {
      (() => {
        return () => {
          dispatch({
            type: 'studentLeader/saveSelectRowKeys',
            payload: {
              selectedRowKeys: [],
              selectedRows: []
            }
          })
        }
      })()()
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onSelect,
    onSelectAll,
    onChange: selectChange
  }

  const downLoad = (e: any) => {
    console.log(e)
    let data = []
    if (e.length !== 0) {
      data = e.map((item: any) => item.id)
    }

    dispatch({
      type: 'studentLeader/downLoad',
      payload: data
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="负责人列表"
        rowKey="id"
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default" onClick={() => downLoad(selectedRows)}>
            <DownloadOutlined /> { selectedRows && selectedRows.length > 0 ? '批量导出' : '导出' }
          </Button>
        ]}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={{ total: count, current: current }}
        rowSelection={rowSelection}
        onSubmit={onSubmit}
        onReset={onReset}
      />
      {/* <DetailsModal modalVisible={visible} onCancel={()=>{setVisible(false)}} /> */}
    </div>
  );
}

export default connect(
  ({studentLeader, global}: {studentLeader: StudentLeaderState, global: GlobalModelState}) => ({
    dataSource: studentLeader.list,
    loading: studentLeader.loading,
    count: studentLeader.count,
    selectedRowKeys: studentLeader.selectedRowKeys,
    selectedRows: studentLeader.selectedRows,
    schoolYear: global.SelectValue.schoolYear
  })
)(StudentLeader)