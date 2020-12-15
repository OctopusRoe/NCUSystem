// 注销审批 组件
import React, { useState, useEffect } from 'react';
import { Button, Divider, message, Popconfirm, Input } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { TableListItem } from './data';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import CardInfo from '@/components/CardInfo/index';

import { logoutApprovalState } from './data'

import { connect, Dispatch } from 'umi'

import { GlobalModelState } from '@/models/global'

interface LogoutApprovalProps {
  dataSource: any
  loading: boolean
  count: number
  level: any
  type: any
  department: any
  dispatch: Dispatch
}

const LogoutApproval: React.FC<LogoutApprovalProps> = (props) => {
  
  const { dataSource, loading, count, level, type, department, dispatch } = props

  const [current, setCurrent] = useState<number>(0)

  const [searchValue, setSearchValue] = useState<{name?: string, status?: number}>({})
  
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const [cardInfo, setcardInfo] = useState(false);

  const [assoctionId, setAssoctionId] = useState<string>('')
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注销编号',
      dataIndex: 'number',
      key: 'number',
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'communityName',
      key: 'communityName',
      renderFormItem: () => {
        return (
          <>
            <Input placeholder={'请输入'} autoComplete={'off'} />
          </>
        )
      },
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setcardInfo(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '社团类别',
      dataIndex: 'category',
      key: 'category',
      hideInSearch: true,
      filters: (() => {
        const typeList = type && type.map((item: any) => ({text: item.name, value: item.name}))
        return typeList
      })(),
    },
    {
      title: '社团级别',
      dataIndex: 'level',
      key: 'level',
      hideInSearch: true,
      filters: (() => {
        const levelList = level && level.map((item: any) => ({text: item.name, value: item.name}))
        return levelList
      })(),
    },
    {
      title: '业务指导单位',
      dataIndex: 'guidanceUnit',
      key: 'guidanceUnit',
      hideInSearch: true,
      filters: (() => {
        const departmentList = department && department.map((item: any) => ({text: item.name, value: item.name}))
        return departmentList
      })(),
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      hideInSearch: false,
      key: 'status',
      valueEnum: {
        0: { text: '未审批', status: 'default' },
        1: { text: '同意', status: 'Success' },
        2: { text: '拒绝', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, item) => (
        <>
          <a
            onClick={() => {
              setAssoctionId(item.id)
              setApprovalDrawerVisible(true)
              setTimeout(() => {
                dispatch({
                  type: 'logoutApproval/searchInfo',
                  payload: item.id
                })
              }, 0.5 * 1000)
            }}
          >
            审核
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };
  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    
    const data = {
      name: searchValue.name && searchValue.name,
      status: searchValue.status && searchValue.status,
      pageSize: pagination.pageSize,
      pageIndex: pagination.current
    }

    dispatch({
      type: 'logoutApproval/loading',
      payload: true
    })

    dispatch({
      type: 'logoutApproval/searchList',
      payload: data
    })

    setCurrent(pagination.current as any)
  }

  useEffect(() => {
    dispatch({
      type: 'logoutApproval/searchList',
      payload: {}
    })
    // 退出清除 model 中的数据
    return () => {
      dispatch({
        type: 'logoutApproval/clean'
      })
    }
  }, [])

  // 表单提交功能
  const onSubmit = (e: any) => {

    // 把搜索数据保存，点击分页的时候进行调用
    setSearchValue(e)

    const data = {
      name: e.name,
      status: e.status
    }

    dispatch({
      type: 'logoutApproval/searchList',
      payload: true
    })

    dispatch({
      type: 'logoutApproval/searchList',
      payload: data
    })

  }

  // 重置列表
  const onReset = () => {

    // 把搜索数据重置为空值
    setSearchValue({})

    dispatch({
      type: 'logoutApproval/searchList',
      payload: {}
    })

    dispatch({
      type: 'logoutApproval/loading',
      payload: true
    })

    setCurrent(1)
  }

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={{ total: count, current: current}}
        onSubmit={onSubmit}
        onReset={onReset}
      />
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
      />
      <CardInfo visible={cardInfo} onCancel={() => setcardInfo(false)} />
    </div>
  );
};

export default connect(
  ({logoutApproval, global}: {logoutApproval: logoutApprovalState, global: GlobalModelState}) => ({
    dataSource: logoutApproval.list,
    loading: logoutApproval.loading,
    count: logoutApproval.count,
    level: global.SelectValue.level,
    type: global.SelectValue.type,
    department: global.SelectValue.department
  })
)(LogoutApproval)
