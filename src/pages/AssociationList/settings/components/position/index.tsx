// 职务设置 组件

import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, Tag } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi';

import { AssociationPositionState } from '../../data'

interface PositionProps {
  dataSorce: any
  count: number
  loading: boolean
  dispatch: Dispatch
}

const { Search } = Input;

const Position: React.FC<PositionProps> = (props) => {

  const { dataSorce, count, loading, dispatch } = props

  console.log(dataSorce);
  
  const [addModalVisible, setAddModalViaible] = useState(false);
  const [editModalVisible, setEditModalViaible] = useState(false);

  const [rowValue, setRowValue] = useState<any>({});
  const [current, setCurrent] = useState<number>(0)
  const [query, setQuery] = useState<string>('')

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '职务名称',
      dataIndex: 'name',
      width: '30%',
      key: 'name',
    },
    {
      title: '社团负责人',
      dataIndex: 'responsible',
      width: '25%',
      key: 'responsible',
      render: (text, record) => {
        return text ? <Tag color={'green'}>是</Tag> : <Tag color={'blue'}>否</Tag>
      },
    },
    {
      title: '社团骨干',
      dataIndex: 'backbone',
      width: '20%',
      key: 'backbone',
      render: (text, record) => {
        return text ? <Tag color={'green'}>是</Tag> : <Tag color={'blue'}>否</Tag>
      }
    },
    {
      title: '排序号',
      dataIndex: 'rank',
      width: '15%',
      key: 'rank',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record: any) => (
        <>
          <a
            onClick={() => {
              setEditModalViaible(true);
              setRowValue({
                id: record.id,
                name: record.name,
                responsible: record.responsible ? '1' : '0',
                backbone: record.backbone ? '1' : '0',
                rank: record.rank
              });
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={()=>confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'associationPosition/searchPosition',
      payload: {}
    })

    return () => {
      dispatch({
        type: 'associationPosition/cleanPosition'
      })

      setQuery('')
    }
  }, [])

  //删除成功
  const confirm = (id: number) => {
    dispatch({
      type: 'associationPosition/deletePosition',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000)
  };

  //搜索框 Search事件
  const onSearch = (value: any) => {
    
    setQuery(value)
    setCurrent(1)
    
    const data = {
      query: value
    }

    dispatch({
      type: 'associationPosition/searchPosition',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'associationPosition/loading',
      payload: true,
    });

  };

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      query: query,
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'associationPosition/searchPosition',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'associationPosition/loading',
      payload: true,
    });

    setCurrent(pagination.current as number)
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'associationPosition/searchPosition',
      payload: {},
    });

    dispatch({
      type: 'associationPosition/loading',
      payload: true,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="id"
        search={false}
        headerTitle={'职务设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton onSearch={onSearch} placeholder={'请输入职务名称'} />,
          <Button type="primary" onClick={() => setAddModalViaible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{total: count, current: current}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal modalVisible={addModalVisible} onCancel={() => setAddModalViaible(false)} afterClose={reloadValue} />
      <EditModal
        modalVisible={editModalVisible}
        onCancel={() => setEditModalViaible(false)}
        formValue={rowValue}
        afterClose={reloadValue}
      />
    </div>
  );
};

export default connect(
  ({associationPosition}: {associationPosition: AssociationPositionState}) => (
    {
      dataSorce: associationPosition.positionList,
      loading: associationPosition.loading,
      count: associationPosition.count,
    }
  )
)(Position);
