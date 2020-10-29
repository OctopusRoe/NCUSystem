// 社团通讯录 组件

import React, { useRef, useState } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import DetailsModal from '@/components/DetailsModal/DetailsModal'

const RecruitmentSquareCom: React.FC<{}> = () => {

  const [visible, setVisible] = useState<boolean>(false)

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'numberOf',
      key: 'numberOf',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (<Button type={'link'} size={'small'} onClick={()=>{setVisible(true)}}>{text}</Button>)
      }
    },
    {
      title: '学号',
      dataIndex: 'studentID',
      key: 'studentID',
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
      valueEnum: {
        0: {text: '部门1'},
        1: {text: '部门2'},
        2: {text: '部门3'},
        3: {text: '部门4'},
        4: {text: '部门5'},
        5: {text: '部门6'}
      }
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      key: 'QQ',
      hideInSearch: true
    }
  ];

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="团员列表"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        toolBarRender={(_action, { selectedRows }) => [
          <Button type="default">
            <DownloadOutlined /> 导出
          </Button>
          ]}
      />
      <DetailsModal modalVisible={visible} onCancel={()=>{setVisible(false)}} />
    </div>
  );
};

export default RecruitmentSquareCom;
