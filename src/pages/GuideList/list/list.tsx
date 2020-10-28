// 社团列表页面

import React, { useState, useRef } from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import InfoModal from '@/components/InfoModal/Infomodal';
// import styles from './student.less'

const List: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '社团名称',
      dataIndex: 'associationName',
      key: 'associationName',
      fixed: 'left',
      render: (_, record) => {
        return (
          <>
            <div
              onClick={() => {
                setShowInfoModal(true);
              }}
            >
              {record.name}
            </div>
          </>
        );
      },
    },
    {
      title: '社团类别',
      dataIndex: 'associationType',
      key: 'associationType',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '社团级别',
      dataIndex: 'associationGrade',
      key: 'associationGrade',
      valueEnum: {
        0: { text: '级别1' },
        1: { text: '级别2' },
        2: { text: '级别3' },
        3: { text: '级别4' },
        4: { text: '级别5' },
        5: { text: '级别6' },
      },
    },
    {
      title: '业务指导单位',
      dataIndex: 'department',
      key: 'department',
      valueEnum: {
        0: { text: '单位1' },
        1: { text: '单位2' },
        2: { text: '单位3' },
        3: { text: '单位4' },
        4: { text: '单位5' },
        5: { text: '单位6' },
      },
    },
    {
      title: '指导老师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '成立时间',
      dataIndex: 'startTime',
      key: 'startTime',
      hideInSearch: true,
    },
    {
      title: '社团成员数(最高)',
      dataIndex: 'persons',
      key: 'persons',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      render: (_) => (
        <>
          <a>配置</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="社团列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="default" onClick={() => handleModalVisible(true)} size={'middle'}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <InfoModal
        modalVisible={showInfoModal}
        onCancel={() => {
          setShowInfoModal(false);
        }}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
    </div>
  );
};

export default List;
