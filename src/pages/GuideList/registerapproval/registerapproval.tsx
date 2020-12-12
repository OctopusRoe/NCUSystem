// 注册审批页面
import { Button, Divider, Input, Popconfirm, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {} from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import ApprovalDrawer from './components/ApprovalDrawer';
import CardInfo from '@/components/CardInfo/index';
import { connect, Dispatch } from 'umi';
import { RegisterApprovalState } from './data';
import { PaginationProps } from 'antd/lib/pagination';

interface RegisterApprovalProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
  detailInfo: any;
}
const { Option } = Select;
const RegisterApproval: React.FC<RegisterApprovalProps> = (props) => {
  const [ApprovalDrawerVisible, setApprovalDrawerVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const actionRef = useRef<ActionType>();
  const [detailId, setDetailId] = useState();

  const { count, dataSource, loading, dispatch, detailInfo } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '注册编号',
      dataIndex: 'number',
      key: 'number',
      hideInSearch: true,
    },
    {
      title: '社团名称',
      dataIndex: 'nameZh',
      key: 'nameZh',
      render: (text) => {
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
          value: 'one',
        },
        {
          text: '二级社团',
          value: 'two',
        },
        {
          text: '三级社团',
          value: 'three',
        },
      ],
    },
    {
      title: '业务指导单位',
      dataIndex: 'organization',
      key: 'organization',
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
        1: { text: '已审批', status: 'Success' },
        0: { text: '未审批', status: 'Error' },
      },
      renderFormItem: () => {
        return (
          <Select placeholder='请选择审批状态'>
            <Option value={'false'}>未审批</Option>
            <Option value={'true'}>已审批</Option>
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
          <Popconfirm
            title="是否要删除？"
            onConfirm={() => {
              confirm(record);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //查看申请详情
  const getDetail = (record: any) => {
    setDetailId(record.id);
    dispatch({
      type: 'communityRegisterApproval/getDetail',
      payload: record.id,
    });
  };

  //删除成功
  const confirm = (record: any) => {
    dispatch({
      type: 'communityRegisterApproval/deleteRegisterapproval',
      payload: record.id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //页面初始化
  useEffect(() => {
    dispatch({
      type: 'communityRegisterApproval/queryRegisterapproval',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'communityRegisterApproval/cleanState',
      });
    };
  }, []);

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'communityRegisterApproval/queryRegisterapproval',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'communityRegisterApproval/loading',
      payload: true,
    });
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'communityRegisterApproval/queryRegisterapproval',
      payload: {},
    });

    dispatch({
      type: 'communityRegisterApproval/loading',
      payload: true,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="id"
        dataSource={dataSource}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
        onSubmit={(params: any) => {
          const data = {
            Name: params.name,
            Status: params.status,
          };
          dispatch({
            type: 'communityRegisterApproval/queryRegisterapproval',
            payload: data,
          });

          // 修改 table 的 loading 值
          dispatch({
            type: 'communityRegisterApproval/loading',
            payload: true,
          });
        }}
        onReset={reloadValue}
      />
      <ApprovalDrawer
        drawerVisible={ApprovalDrawerVisible}
        oncancel={() => setApprovalDrawerVisible(false)}
        infoData={detailInfo}
        detailId={detailId}
        afterClose={reloadValue}
      />
      <CardInfo visible={cardInfo} onCancel={() => setCardInfo(false)} />
    </div>
  );
};

export default connect(
  ({ communityRegisterApproval }: { communityRegisterApproval: RegisterApprovalState }) => {
    return {
      dataSource: communityRegisterApproval.RegisterApprovalList,
      count: communityRegisterApproval.count,
      loading: communityRegisterApproval.loading,
      detailInfo: communityRegisterApproval.DetailInfoList,
    };
  },
)(RegisterApproval);
