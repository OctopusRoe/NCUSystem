// 社团通讯录 组件

import React, { useEffect, useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem, AddressListState } from './data.d';
import { Button, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import DetailsModal from '@/components/DetailsModal/DetailsModal';
import { PaginationProps } from 'antd/lib/pagination';

export interface PersonState {
  personList?: {
    id: string;
    category: number;
    name: string;
    personId: string;
    gender: number;
    idcard: string;
    college: string;
    class: string;
    phone: string;
    status: number;
  }[];
}

export interface GlobalModelState {
  token: any;
}
interface AddressListProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
  token: any;
  infoData: any;
}

const RecruitmentSquareCom: React.FC<AddressListProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { count, dataSorce, loading, dispatch, token, infoData } = props;
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'session',
      key: 'session',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Button
            type={'link'}
            size={'small'}
            onClick={() => {
              setVisible(true);
              getInfo(record);
            }}
          >
            {text}
          </Button>
        );
      },
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入姓名'} />;
      },
    },
    {
      title: '学号',
      dataIndex: 'personId',
      key: 'personId',
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入学号'} />;
      },
    },
    {
      title: '学院',
      dataIndex: 'college',
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
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
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入手机号'} />;
      },
    },
    {
      title: 'QQ号',
      dataIndex: 'qq',
      key: 'qq',
      hideInSearch: true,
    },
  ];

  //点击姓名 获取详情信息
  const getInfo = (record: any) => {
    console.log(record);
    const data = {
      PersonId: record.personId,
    };
    dispatch({
      type: 'settingPerson/searchPerson',
      payload: data,
    });
  };

  //导出
  const downLoad = () => {
    const data = {
      id: token.personId,
    };
    dispatch({
      type: 'communityAddressList/downLoad',
      payload: data,
    });
  };

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'communityAddressList/searchAddressList',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'communityAddressList/loading',
      payload: true,
    });
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'communityAddressList/searchAddressList',
      payload: {},
    });

    dispatch({
      type: 'communityAddressList/loading',
      payload: true,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'communityAddressList/searchAddressList',
      payload: {},
    });
    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'communityAddressList/cleanState',
      });
    };
  }, []);

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="团员列表"
        actionRef={actionRef}
        rowKey="id"
        dataSource={dataSorce}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default" onClick={downLoad}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        onSubmit={(params: any) => {
          const data = {
            Name: params.name,
            Phone: params.phone,
            PersonId: params.personId,
          };
          dispatch({
            type: 'communityAddressList/searchAddressList',
            payload: data,
          });

          // 修改 table 的 loading 值
          dispatch({
            type: 'communityAddressList/loading',
            payload: true,
          });
        }}
        onReset={reloadValue}
      />
      <DetailsModal
        modalVisible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        infoData={infoData[0]}
      />
    </div>
  );
};

export default connect(
  ({
    communityAddressList,
    global,
    settingPerson,
  }: {
    communityAddressList: AddressListState;
    global: GlobalModelState;
    settingPerson: PersonState;
  }) => {
    return {
      count: communityAddressList.count,
      dataSorce: communityAddressList.addressList,
      loading: communityAddressList.loading,
      token: global.token,
      infoData: settingPerson.personList,
    };
  },
)(RecruitmentSquareCom);
