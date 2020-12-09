// 违纪管理 组件

import React, { useState, useEffect } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { TableListItem, PunishState } from './data';
import { Button, Input, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';

import DownLoadModal from '@/components/DownLoadModal/DownLoadModal';

const { Search } = Input;
interface PunishProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
}

const Punish: React.FC<PunishProps> = (props) => {
  const { count, dataSorce, loading, dispatch } = props;

  const [downmodalVisible, setDownmodalVisible] = useState(false);
  const [current, setCurrent] = useState<number>(0);
  const [query, setQuery] = useState<string>('')
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
      render: (text, record) => {
        return text === '警告' ? (
          <Tag color={'warning'}>{record.name}</Tag>
        ) : (
          <Tag color={'error'}>{record.name}</Tag>
        );
      },
    },
    {
      title: '处分日期',
      dataIndex: 'punishDate',
      key: 'punishDate',
      hideInSearch: true,
      render: (text, record) => {
        return <span>{record.punishDate.slice(0, 10)}</span>;
      },
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
      setQuery('')
    };
  }, []);

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PersonId: query,
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

    setCurrent(pagination.current as number)

  };

  //Search 搜索框事件
  const onSearch = (value: any) => {
    setCurrent(1)
    setQuery(value)
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

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'settingPunish/searchPunish',
      payload: {},
    });

    dispatch({
      type: 'settingPunish/loading',
      payload: true,
    });
  };

  // 导入的方法
  const upLoadFunc = (e: any) => {
    dispatch({
      type: 'settingPunish/upLoad',
      payload: e.file.file.originFileObj,
    });

    setDownmodalVisible(false);

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  // 下载模板的方法
  const downLoadFunc = () => {
    dispatch({
      type: 'settingPunish/getTemplate',
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle=""
        search={false}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入学号'} onSearch={onSearch} />,
          <Button type="default" onClick={() => setDownmodalVisible(true)}>
            <UploadOutlined /> 导入
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{ total: count, current: current }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <DownLoadModal
        modalVisible={downmodalVisible}
        onCancel={() => setDownmodalVisible(false)}
        upLoadFunc={upLoadFunc}
        downLoadFunc={downLoadFunc}
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
