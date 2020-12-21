// 我的报名 组件

import React, { useEffect, useState } from 'react';

import { Card, Popover, Tag, Switch, DatePicker } from 'antd';
import ProTabel, { ProColumns } from '@ant-design/pro-table'
import { TableListItem } from './data';
import { connect, Dispatch } from 'umi'
import { MysignUpState } from '../../data'

import moment from 'moment'

interface SingUpProps {
  mySignUp: MysignUpState
  dispatch: Dispatch
}


// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer',
}

const SingUp: React.FC<SingUpProps> = ({
  mySignUp: { list = [], loading, count},
  dispatch
}) => {

  const [ saveYear, setSaveYear ] = useState<number>(NaN)
  const [ current, setCurrent ] = useState<number>(1)

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'session',
      key: 'session',
    },
    {
      title: '社团名称',
      dataIndex: 'communityName',
      key: 'communityName',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '招新要求',
      dataIndex: 'requirement',
      key: 'requirement',
      render: (_, record) => {
        const text = (
          <div>
            <p style={{ width: '200px' }}>{record.request}</p>
          </div>
        );

        return (
          <div>
            <Popover content={text} trigger={'click'}>
              <Tag color={'blue'} style={changeMouseStyle}>
                查看
              </Tag>
            </Popover>
          </div>
        );
      },
    },
    {
      title: '招新数',
      dataIndex: 'number',
      width: '10%',
      key: 'number',
    },
    {
      title: '报名数',
      dataIndex: 'entryNumber',
      width: '10%',
      key: 'entryNumber',
    },
    {
      title: '录取状态',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      valueEnum: {
        'false': { text: '未录取', status: 'default' },
        'true': { text: '录取', stateus: 'success' }
      }
    },
    {
      title: '报名',
      dataIndex: 'option',
      width: '10%',
      key: 'option',
      render: (e, record) => (
        <>
          <Switch
            defaultChecked={true}
            checkedChildren="已报名"
            unCheckedChildren="未报名"
            onChange={(event) => {
              sginUp(event, record);
            }}
          />
        </>
      ),
    },
  ];

  const reloadValue = () => {

    dispatch({
      type: 'mySignUp/loading',
      payload: true
    })

    dispatch({
      type: 'mySignUp/searchList',
      payload: {}
    })

  }

  // Switch 组件的报名方法
  const sginUp = (event: boolean, record: TableListItem) => {
    if (record.status) {
      return
    }

    dispatch({
      type: 'mySignUp/cancelAssociation',
      payload: record.id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000)

  };

  useEffect(() => {
    dispatch({
      type: 'mySignUp/searchList',
      payload: {}
    })

    return () => {
      dispatch({
        type: 'mySignUp/clean'
      })

      setSaveYear(NaN)
    }
  }, [])

  const onChange = (pagination: any, filters: any) => {
    const data = {
      pageSize: pagination.pageSize,
      pageIndex: pagination.current,
      year: !isNaN(saveYear) ? saveYear : new Date().getFullYear()
    }

    dispatch({
      type: 'mySignUp/loading',
      payload: true
    })

    dispatch({
      type: 'mySignUp/searchList',
      payload: data
    })

    setCurrent(pagination.current)

  }

  const yearChange = (date: any) => {
    setSaveYear(date.year())
  }

  return (
    <Card>
      <ProTabel
        rowKey="id"
        search={false}
        toolBarRender={(action, e) => [
          <DatePicker picker={'year'} placeholder={'请选择年份'} onChange={yearChange} defaultValue={moment(new Date())} />
        ]}
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={{ total: count, current: current}}
        onChange={onChange}
        // 操作栏的刷新控制
        options={{reload: () => reloadValue()}}

      />
    </Card>
  );
};

export default connect(
  ({mySignUp}: {mySignUp: MysignUpState}) => ({
    mySignUp
  })
)(SingUp)
