// 违纪管理 组件

import React, { useRef, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem, PunishState } from './data';
import { Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';

const { Search } = Input;
interface PunishProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
}

const Punish: React.FC<PunishProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { count, dataSorce, loading, dispatch } = props;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'personId',
      key: 'personId',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '处分名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
    },
    {
      title: '处分日期',
      dataIndex: 'punishDate',
      key: 'punishDate',
      hideInSearch: true,
    },
    {
      title: '处分文号',
      dataIndex: 'number',
      hideInSearch: true,
      key: 'number',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'settingPunish/searchPunish',
      payload: {},
    });

    //退出后清除组件的数据
    return () => {
      dispatch({
        type: 'settingPunish/cleanState',
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
      type: 'settingPunish/searchPunish',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingPunish/loading',
      payload: true,
    });
  };

  //Search 搜索框事件
  const onSearch = (value: any) => {
    const data = {
      PersonId: value,
    };
    dispatch({
      type: 'settingPunish/searchPunish',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingPunish/loading',
      payload: true,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        // pagination={{size: 'small', showSizeChanger: false, showTotal: (a,b)=>false}}
        headerTitle=""
        search={false}
        actionRef={actionRef}
        // search={}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入学号'} onSearch={onSearch} />,
          <Button type="default">
            <UploadOutlined /> 导入
          </Button>,
        ]}
        // request={(params) => getTable(params)}
        dataSource={dataSorce}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default connect(({ settingPunish }: { settingPunish: PunishState }) => {
  return {
    dataSorce: settingPunish.punishList,
    count: settingPunish.count,
    loading: settingPunish.loading,
  };
})(Punish);
