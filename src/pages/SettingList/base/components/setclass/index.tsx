// 班级设置 组件

import React, { useState, useEffect } from 'react';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { connect, Dispatch } from 'umi'

import DownLoadModal from '@/components/DownLoadModal/DownLoadModal';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';

import { SetClassState } from '../../data';

interface SetClassProps {
  count: number
  dataSorce: any
  loading: boolean
  dispatch: Dispatch
}

const { Search } = Input;

const SetClass: React.FC<SetClassProps> = (props) => {

  const { count, dataSorce, loading, dispatch } = props

  const [addmodalVisible, setAddmodalVisible] = useState(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const [downmodalVisible, setDownmodalVisible] = useState(false);

  const [ rowValue, setRowValue ] = useState<any>({})
  const [current, setCurrent] = useState<number>(0)

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '班级号',
      dataIndex: 'classNo',
      key: 'classNo',
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '专业号',
      dataIndex: 'majorNo',
      key: 'majorNo',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a onClick={() => {
            setEditmodalVisible(true)
            setRowValue(record)
          }}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = (id: number) => {
    dispatch({
      type: 'baseSetClass/deleteClass',
      payload: id
    })

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000)
    
  };

  //搜索框 search方法
  const onSearch = (value: any) => {

    if (value === '') {
      setCurrent(1)
    }

    const data = {
      query: value
    }
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSetClass/loading',
      payload: true
    })
  };

  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current
    }
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data
    })

    // 修改 table 的 loading 值
    dispatch({
      type: 'baseSetClass/loading',
      payload: true
    })
  }

  useEffect(() => {
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {}
    })

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseSetClass/cleanState'
      })
    }
  }, [])

  const reloadValue = () => {
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {}
    })

    dispatch({
      type: 'baseSetClass/loading',
      payload: true
    })
  }

  const downLoad = () => {
    dispatch({
      type: 'baseSetClass/downLoad'
    })
  }

  // 导入的方法
  const upLoadFunc = (e: any) => {
    dispatch({
      type: 'baseSetClass/upLoad',
      payload: e.file.file.originFileObj
    })

    setDownmodalVisible(false)

    setTimeout(() => {
      reloadValue()
    }, 0.5 * 1000);
  }

  // 下载模板的方法
  const downLoadFunc = () => {
    dispatch({
      type: 'baseSetClass/getTemplate'
    })
  }

  return (
    <div>
      <ProTable<TableListItem>
        onExpandedRowsChange={(e) => {
          console.log(e);
        }}
        rowKey="id"
        search={false}
        headerTitle={'班级设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入班级名称'} onSearch={onSearch} />,
          <Button type="primary" onClick={() => setAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button onClick={() => setDownmodalVisible(true)}>
            <UploadOutlined />
            导入
          </Button>,
          <Button onClick={downLoad} >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{total: count, current: current}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal modalvisible={addmodalVisible} onCancel={() => setAddmodalVisible(false)} afterClose={reloadValue} />
      <EditModal modalvisible={editmodalVisible} onCancel={() => setEditmodalVisible(false)} afterClose={reloadValue} formValue={rowValue} />
      <DownLoadModal
        modalVisible={downmodalVisible}
        onCancel={() => setDownmodalVisible(false)}
        upLoadFunc={upLoadFunc}
        downLoadFunc={downLoadFunc}
      />
    </div>
  );
};

export default connect(
  ({ baseSetClass }: { baseSetClass: SetClassState}) => {
    return {
      count: baseSetClass.count,
      dataSorce: baseSetClass.classList,
      loading: baseSetClass.loading
    }
  }
)(SetClass);
