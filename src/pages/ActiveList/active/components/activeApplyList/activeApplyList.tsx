// 活动审查进度 组件

import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Input, Divider, Tag, Popover, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { connect, Dispatch } from 'umi';
import { TableListItem } from './data.d';
import { CreateActiveState } from '../../model'
import moment from 'moment'
import ModifyDrawer from './components/modifyDrawer'

import ApplyView from '@/components/ApplyView'
import { PaginationProps } from 'antd/lib/pagination';

import { GlobalModelState } from '@/models/global'


interface ActivApplyListProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
  ApplyDetail: any;
  DetailLoading: any;
  CommunityId: string;
  TeacherList: any;
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const { Search } = Input


const value = {
  name: '测试活动名',
  time: [moment('2020-11-10 12:55:00', 'YYYY-MM-DD h:mm:ss'), moment('2020-11-10 12:55:00', 'YYYY-MM-DD h:mm:ss')]
}
const typeList = ['测试类型1', '测试类型2', '测试类型3', '测试类型']

const ActiveApplyList: React.FC<ActivApplyListProps> = (props) => {

  const [visible, setVisible] = useState<boolean>(false)

  const [applyVisible, setApplyVisible] = useState<boolean>(false)

  const { count, dataSource, loading, dispatch, DetailLoading, TeacherList, ApplyDetail, CommunityId } = props;
  const [current, setCurrent] = useState<number>(0);
  const [query, setQuery] = useState<string>('')
  const actionRef = useRef<ActionType>();
  const [applyId, setApplyId] = useState<any>()
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '活动类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        return (
          <span>
            {record.createTime.slice(0, 10)}&nbsp;&nbsp;{record.createTime.slice(11, 16)}
          </span>
        );
      },
    },
    {
      title: '审批单位',
      dataIndex: 'approvalUnit',
      key: 'approvalUnit',
      // render: (text, record) => {
      //   return record.results ? <Tag color={'green'}>通过</Tag> : <Tag color={'red'}>未通过</Tag>
      // }
    },
    {
      title: '审批进度',
      dataIndex: 'progress',
      key: 'progress',
      valueEnum: {
        0: { text: '未处理', status: 'default' },
        1: { text: '进行中', status: 'processing' },
        2: { text: '已拒绝', status: 'error' },
        3: { text: '已通过', status: 'success' }
      },
    },
    // {
    //   title: '审批结果',
    //   dataIndex: 'examinedId',
    //   key: 'examinedId',
    //   render: (text, record) => {
    //     const textDom = (
    //       <div>
    //         <p style={{ width: '200px' }}>
    //           {text}
    //         </p>
    //       </div>
    //     )

    //     return (
    //       <div>
    //         <Popover content={textDom} trigger={'hover'}>
    //           <Tag color={record.results ? 'green' : 'red'} style={changeMouseStyle}>{record.results ? '通过 (审批意见)' : '未通过 (未通过原因)'}</Tag>
    //         </Popover>
    //       </div>
    //     )
    //   }
    // },
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
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
          <Divider type='vertical' />
          <a
            onClick={() => {
              setApplyId(record.id);
              setTimeout(() => {
                //获取审批流程列表
                dispatch({
                  type: 'createActive/getProcessList',
                  payload: record.id,
                });
                //获取当前社团指导老师列表
                dispatch({
                  type: 'createActive/getTeacherList',
                  payload: CommunityId,
                });
              }, 0.5 * 1000);
              setApplyVisible(true)
            }}
          >
            审批详情
          </a>
        </>
      ),
    },
  ];


  //页面初始化
  useEffect(() => {
    dispatch({
      type: 'createActive/getApplyList',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'createActive/cleanState',
      });
      setQuery('')
    };
  }, []);


  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      Name: query,
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'createActive/getApplyList',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'createActive/loading',
      payload: true,
    });

    setCurrent(pagination.current as number)
  };


  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'createActive/getApplyList',
      payload: {},
    });

    dispatch({
      type: 'createActive/loading',
      payload: true,
    });
  };

  //Search 搜索框事件
  const onSearch = (value: any) => {
    setCurrent(1)
    setQuery(value)

    const data = {
      Name: value,
    };

    dispatch({
      type: 'createActive/getApplyList',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'createActive/loading',
      payload: true,
    });
  };


  //删除成功
  const confirm = (id: any) => {
    console.log(id);

    dispatch({
      type: 'createActive/deleteApply',
      payload: id,
    });
    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };


  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'申请列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入活动名称'} onSearch={onSearch} />,
        ]}
        dataSource={dataSource}
        pagination={{ total: count, current: current }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <ModifyDrawer visible={visible} value={value} onClose={() => setVisible(false)} typeList={typeList} />
      <ApplyView
        visible={applyVisible}
        onClose={() => setApplyVisible(false)}
        loading={DetailLoading}
        dataSource={ApplyDetail}
        TeacherList={TeacherList}
        applyId={applyId}
        afterClose={reloadValue}
      />
    </div>
  );
};

export default connect(({ createActive, global }: { createActive: CreateActiveState; global: GlobalModelState }) => {
  return {
    dataSource: createActive.applyList,
    count: createActive.count,
    loading: createActive.loading,
    ApplyDetail: createActive.DetailInfoList,
    DetailLoading: createActive.DetailLoading,
    CommunityId: global.association.id,
    TeacherList: createActive.TeacherList,
  }
})(ActiveApplyList)