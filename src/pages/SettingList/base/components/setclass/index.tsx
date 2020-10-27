// 班级设置 组件

import React, { useState, useRef } from 'react';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { queryRule } from './service';

const { Search } = Input;

const SetClass: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '班级号',
      dataIndex: 'classID',
      width: '25%',
      key: 'classID',
      hideInSearch: true,
    },
    {
      title: '班级名称',
      dataIndex: 'classname',
      width: '35%',
      key: 'classname',
      hideInSearch: true,
    },
    {
      title: '专业号',
      dataIndex: 'specialtyID',
      width: '25%',
      key: 'specialtyID',
      hideInSearch: true,
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
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        onExpandedRowsChange={(e) => {
          console.log(e);
        }}
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'班级设置'}
        toolBarRender={(action, { selectedRows }) => [
          <Search enterButton placeholder={'请输入班级名称'} />,
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'middle'}>
            <PlusOutlined /> 新增
          </Button>,
          <Button>
            <UploadOutlined />
            导入
          </Button>,
          <Button>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
    </div>
  );
};

export default SetClass;
