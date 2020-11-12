//

import { Button, Divider } from 'antd';

import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

const MemberCom: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'period',
      key: 'period',
      fixed: 'left',
      valueEnum: {
        0: { text: 'A', status: 'a' },
        1: { text: 'B', status: 'b' },
        2: { text: 'C', status: 'c' },
        3: { text: 'D', status: 'd' },
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (text, record) => {
        return <Button size={'small'} type={'link'} onClick={() => setDetailsModalVisible(true)}>{text}</Button>;
      },
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      key: 'stuid',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      hideInSearch: true,
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '10%',
      fixed: 'right',
      render: (_) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="key"
        rowClassName={(record, index) => {
          let className = 'light-row';
          if (index % 2 === 1) className = 'dark-row';
          return className;
        }}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type={'primary'}>
            <PlusOutlined /> 添加
          </Button>,
          <Button type={'primary'}>
            <CopyOutlined /> 复制
          </Button>,
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button>
              <DownloadOutlined /> 选中导出
            </Button>
          ),
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
        scroll={{ x: 1500 }}
      />
      <DetailsModal
        modalVisible={DetailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
      />
    </>
  );
};

export default MemberCom;
