// 应用管理-应用管理 组件

import React, { useState, useEffect } from 'react';
import { Button, Divider, Input, Image, message, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi';

import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { ControlListState, CategoryState } from '../../data';

interface ControlProps {
  dataSorce: any;
  count: number;
  loading: boolean;
  typeValue: { one: string; id: number }[];
  dispatch: Dispatch;
}

const { Search } = Input;

const Control: React.FC<ControlProps> = (props) => {
  const { dataSorce, count, loading, typeValue, dispatch } = props;

  const [addmodalVisible, handAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);


  const [ rowValue, setRowValue ] = useState<any>({})
  const [current, setCurrent] = useState<number>(0)


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图标',
      dataIndex: 'src',
      key: 'src',
      render: (text, record: any) => {
        return (
          <>
            <img
              src={record.src}
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              onClick={() => document.getElementById(record.appName)?.click()}
            />
            <Image src={record.src} style={{ display: 'none' }} id={record.appName} />
          </>
        );
      },
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName',
    },
    {
      title: '应用类别',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '链接地址',
      dataIndex: 'appURI', 
      
      key: 'appURI',
    },

    {
      title: '操作',
      width: '10%',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditmodalVisible(true);
              setRowValue(record);
            }}
          >
            编辑
          </a>
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
      type: 'controlList/searchControl',
      payload: {},
    });
  }, []);

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'controlList/searchControl',
      payload: {},
    });

    dispatch({
      type: 'controlList/loading',
      payload: true,
    });
  };

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'controlList/searchControl',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'controlList/loading',
      payload: true,
    });
  };

  //删除成功
  const confirm = (id: number) => {

    dispatch({
      type: 'controlList/deleteControl',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000)
  };

  //Search  搜索框事假
  const onSearch = (value: string) => {

    setCurrent(1)

    const data = {
      query: value,
    };

    dispatch({
      type: 'controlList/searchControl',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'controlList/loading',
      payload: true,
    });
  };

  const downLoad = () => {
    dispatch({
      type: 'controlList/downLoad',
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        headerTitle="应用列表"
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder="请输入应用名称" onSearch={onSearch} />,
          <Button type="primary" onClick={() => handAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default" onClick={downLoad}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        dataSource={dataSorce}

        pagination={{total: count, current: current}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal
        onCancel={() => handAddmodalVisible(false)}
        modalVisible={addmodalVisible}
        typeValue={typeValue}
        afterClose={reloadValue}
      />
      <EditModal
        modalVisible={editmodalVisible}
        onCancel={() => setEditmodalVisible(false)}
        typeValue={typeValue}
        afterClose={reloadValue}
        formValue={rowValue}
      />
    </div>
  );
};

export default connect(
  ({
    controlList,
    controlCategory,
  }: {
    controlList: ControlListState;
    controlCategory: CategoryState;
  }) => {
    return {
      dataSorce: controlList.controlList,
      count: controlList.count,
      loading: controlList.loading,
      typeValue: controlCategory.valueList,
    };
  },
)(Control);
