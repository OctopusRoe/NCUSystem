//

import { Button, Divider } from 'antd';

import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';
import ShowImgView from '@/components/ShowImgView';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

const MemberCom: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'period',
      // width: 200,
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
      title: '证件照',
      dataIndex: 'photo',
      // width: 150,
      key: 'photo',
      hideInSearch: true,
      fixed: 'left',
      render: (text, record) => {
        return (
          <ShowImgView
            id={record.name}
            src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
            style={{ width: '30px', height: '30px' }}
          />
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      // width: 150,
      key: 'name',
      fixed: 'left',
      render: (text, record) => {
        return <span onClick={() => setDetailsModalVisible(true)}>{record.name}</span>;
      },
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      // width: 100,
      key: 'stuid',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      // width: 200,
      key: 'sex',
      hideInSearch: true,
    },
    {
      title: '学院',
      dataIndex: 'college',
      // width: 200,
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      // width: 200,
      key: 'class',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      // width: 200,
      key: 'department',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      // width: 200,
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_) => (
        <>
          <a>调整</a>
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
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button>
              <DownloadOutlined /> 批量导出
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
