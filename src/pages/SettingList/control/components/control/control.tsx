// 应用管理组件

import React, {  useRef, useState,  } from 'react';
import { Button, Divider } from 'antd';
import { TableListItem } from './data.d';
import { connect } from 'umi';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { queryRule } from '../service';
import AddModal from './components/AddModal';


const Control: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [addmodalVisible,handAddmodalVisible]=useState(false)
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图标',
      dataIndex: 'photo',
      key: 'photo',
      render: (text, record) => {
        const img = record.photo;
        return (
          <>
            <img
              src={img}
              alt=""
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
          </>
        );
      },
    },
    {
      title: '应用名称',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '应用类别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '连接地址',
      dataIndex: 'IdCard',
      key: 'IdCard',
    },
  
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        scroll={{ x: '1800' }}
        headerTitle="应用列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={()=>handAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default" >
          <DownloadOutlined /> 导出
        </Button>,      
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
     <AddModal onCancel={()=>handAddmodalVisible(false)} modalVisible={addmodalVisible}/>
    </div>
  );
};

export default connect()(Control);
