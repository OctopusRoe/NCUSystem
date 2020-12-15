// 外出审批 组件

import { Button, Divider, Input, message, Popconfirm, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TableListItem, OutRegistrationApprovalState } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import CardInfo from '@/components/CardInfo/index';
import { connect, Dispatch } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';


interface OutsideApprovalProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
  detailInfo: any;
}
const { Option } = Select;
const OutsideApproval: React.FC<OutsideApprovalProps> = (props) => {
  const [cardInfo, setCardInfo] = useState(false);
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const { count, dataSource, loading, dispatch, detailInfo } = props;
  const [detailId, setDetailId] = useState();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '外出编号',
      dataIndex: 'number',
      key: 'number',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'communityName',
      key: 'communityName',
      fixed: 'left',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setCardInfo(true)}>
            {text}
          </Button>
        );
      },
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入社团名称'} />;
      },
    },
    {
      title: '社团类别',
      dataIndex: 'category',
      key: 'category',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
        { text: 'D', value: 'd' },
      ],
    },
    {
      title: '社团级别',
      dataIndex: 'level',
      key: 'level',
      hideInSearch: true,
      filters: [
        {
          text: '一级社团',
          value: '一级社团',
        },
        {
          text: '二级社团',
          value: '二级社团',
        },
        {
          text: '三级社团',
          value: '三级社团',
        },
      ],
    },
    {
      title: '指导单位',
      dataIndex: 'guidanceUnit',
      key: 'guidanceUnit',
      hideInSearch: true,
      filters: [
        { text: 'A', value: 'a' },
        { text: 'B', value: 'b' },
        { text: 'C', value: 'c' },
      ],
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      hideInSearch: false,
      key: 'status',
      valueEnum: {
        2: { text: '已拒绝', status: 'Success' },
        1: { text: '已通过', status: 'Success' },
        0: { text: '未审批', status: 'Error' },
      },
      renderFormItem: () => {
        return (
          <Select placeholder='请选择审批状态'>
            <Option value={0}>未审批</Option>
            <Option value={1}>已通过</Option>
            <Option value={2}>已拒绝</Option>
          </Select>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setApprovalDrawerVisible(true);
              getDetail(record);

            }}
          >
            审核
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];


  //页面初始化
  useEffect(() => {
    dispatch({
      type: 'communityOutRegistration/queryOutRegistrationApproval',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'communityOutRegistration/cleanState',
      });
    };
  }, []);


  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'communityOutRegistration/queryOutRegistrationApproval',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'communityOutRegistration/loading',
      payload: true,
    });
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'communityOutRegistration/queryOutRegistrationApproval',
      payload: {},
    });

    dispatch({
      type: 'communityOutRegistration/loading',
      payload: true,
    });
  };


  //删除成功
  const confirm = (record: any) => {
    dispatch({
      type: 'communityOutRegistration/deleteRegisterapproval',
      payload: record.id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //查看申请详情
  const getDetail = (record: any) => {
    setDetailId(record.id);
    dispatch({
      type: 'communityOutRegistration/getDetail',
      payload: record.id,
    });
  };


  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        dataSource={dataSource}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
        onSubmit={(params: any) => {
          const data = {
            Name: params.communityName,
            Status: params.status,
          };
          console.log(data);

          dispatch({
            type: 'communityOutRegistration/queryOutRegistrationApproval',
            payload: data,
          });

          // 修改 table 的 loading 值
          dispatch({
            type: 'communityOutRegistration/loading',
            payload: true,
          });
        }}
        onReset={reloadValue}
      />
      <CardInfo visible={cardInfo} onCancel={() => setCardInfo(false)} />
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
        infoData={detailInfo}
        detailId={detailId}
        afterClose={reloadValue}
      />
    </div>
  );
};

export default connect(({ communityOutRegistration }: { communityOutRegistration: OutRegistrationApprovalState }) => {
  return {
    dataSource: communityOutRegistration.OutRegistrationApprovalList,
    count: communityOutRegistration.count,
    loading: communityOutRegistration.loading,
    detailInfo: communityOutRegistration.DetailInfoList,
  }
})(OutsideApproval);
