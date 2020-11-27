// 违纪管理 组件

import React, { useRef, useEffect, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem, PunishState } from './data';
import { Button, Input, Upload } from 'antd';
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
  const [num, setnum] = useState(1);
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

  //导入
  const onImport = (info: any) => {
    const data = info.file.originFileObj;
    dispatch({
      type: 'settingPunish/importPunish',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingPunish/loading',
      payload: true,
    });

    dispatch({
      type: 'settingPunish/searchPunish',
      payload: {},
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        search={false}
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入学号'} onSearch={onSearch} />,
          <Upload showUploadList={false} accept={'.xlsx,.xls'} onChange={onImport}>
            <Button type="default">
              <UploadOutlined /> 导入
            </Button>
          </Upload>,
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
