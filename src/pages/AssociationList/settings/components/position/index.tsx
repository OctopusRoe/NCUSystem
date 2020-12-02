// 职务设置 组件

import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Divider, Popconfirm, message } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import { TableListItem } from './data.d';
import DeatilsModal from '@/components/DetailsModal/DetailsModal';
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

  const [addMOdalVisible, setAddModalViaible] = useState(false);
  const [editMOdalVisible, setEditModalViaible] = useState(false);
  const [deatilsModal, setDeatilsModal] = useState(false);
  const [stepFormValues, setStepFormValues] = useState<any>({});

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '职务名称',
      dataIndex: 'positionName',
      width: '30%',
      key: 'positionName',
      hideInSearch: true,
    },
    {
      title: '社团负责人',
      dataIndex: 'positionLeader',
      width: '25%',
      key: 'positionLeader',
      hideInSearch: true,
      render: (text) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setDeatilsModal(true)}>
            {text}
          </Button>
        );
      },
    },
    {
      title: '社团骨干',
      dataIndex: 'communityBackbone',
      width: '20%',
      key: 'communityBackbone',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'number',
      width: '15%',
      key: 'number',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditModalViaible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={confirm}>
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
  }, [])

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };

  //搜索框 Search事件
  const onSearch = (value: any) => {
    console.log(value);
  };

  const onChange = () => {

  }

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        headerTitle={'职务设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton onSearch={onSearch} placeholder={'请输入职务名称'} />,
          <Button type="primary" onClick={() => setAddModalViaible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        dataSource={dataSorce}
        pagination={{total: count}}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <AddModal modalVisible={addMOdalVisible} onCancel={() => setAddModalViaible(false)} />
      <DeatilsModal modalVisible={deatilsModal} onCancel={() => setDeatilsModal(false)} />
      <EditModal
        modalVisible={editMOdalVisible}
        onCancel={() => setEditModalViaible(false)}
        formValue={stepFormValues}
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
