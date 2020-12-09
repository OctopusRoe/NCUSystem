// 单位设置 组件

import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi';

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { DepartmentState, DepartmentTypeState } from '../../data';

interface DepartmentProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  typeValue: { one: string; id: number }[];
  dispatch: Dispatch;
}

const { Search } = Input;

const Department: React.FC<DepartmentProps> = (props) => {
  const { count, typeValue, dataSorce, loading, dispatch } = props;

  const [addmodalviaible, setaddmodalvisible] = useState(false);
  const [editmodla, seteditmodal] = useState(false);
  const actionRef = useRef<ActionType>();

  const [rowValue, setRowValue] = useState<any>({});
  const [current, setCurrent] = useState<number>(0)

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '单位号',
      dataIndex: 'number',
      width: '10%',
      key: 'number',
    },
    {
      title: '单位全称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '单位简称',
      dataIndex: 'shortName',
      key: 'shortName',
    },
    {
      title: '单位类别',
      dataIndex: 'organizationTypeName',
      key: 'organizationTypeName',
    },
    {
      title: '子单位',
      dataIndex: 'test',
      key: 'test',
    },
    {
      title: '排序号',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              seteditmodal(true);
              setRowValue({
                id: record.id,
                number: record.number,
                name: record.name,
                shortName: record.shortName,
                type: record.organizationTypeName,
                level: record.level,
              });
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a>子单位</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseDepartment/cleanState',
      });
    };
  }, []);

  //删除成功
  const confirm = (id: number) => {
    dispatch({
      type: 'baseDepartment/deleteDepartment',
      payload: id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //Search 搜索框事件
  const onSearch = (value: any) => {

    setCurrent(1)
    const data = {
      query: value,
    };
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseDepartment/loading',
      payload: true,
    });
  };

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    console.log(pagination)
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseDepartment/loading',
      payload: true,
    });
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'baseDepartment/searchDepartment',
      payload: {},
    });

    dispatch({
      type: 'baseDepartment/loading',
      payload: true,
    });
  };

  const downLoad = () => {
    dispatch({
      type: 'baseDepartment/downLoad',
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        actionRef={actionRef}
        headerTitle={'单位列表'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入单位名称'} onSearch={onSearch} />,
          <Button
            type="primary"
            onClick={() => {
              setaddmodalvisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default" onClick={downLoad}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{ total: count, current: current }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal
        modalvisible={addmodalviaible}
        onCancel={() => setaddmodalvisible(false)}
        afterClose={reloadValue}
        typeValue={typeValue}
      />
      <EditModal
        modalvisible={editmodla}
        onCancel={() => seteditmodal(false)}
        afterClose={reloadValue}
        typeValue={typeValue}
        formValue={rowValue}
      />
    </div>
  );
};

export default connect(
  ({
    baseDepartment,
    baseDepartmentType,
  }: {
    baseDepartment: DepartmentState;
    baseDepartmentType: DepartmentTypeState;
  }) => {
    return {
      typeValue: baseDepartmentType.valueList,
      dataSorce: baseDepartment.departmentList,
      count: baseDepartment.count,
      loading: baseDepartment.loading,
    };
  },
)(Department);
