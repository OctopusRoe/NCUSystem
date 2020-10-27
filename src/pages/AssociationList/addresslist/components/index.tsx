// 社团通讯录 组件

import React, { useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ShowImgView from '@/components/ShowImgView'

import { TableListItem } from './data.d';
import { queryRule } from './service';

const RecruitmentSquareCom: React.FC<{}> = () => {

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'numberOf',
      width: '',
      key: 'numberOf',
      hideInSearch: true,
    },
    {
      title: '证件照',
      dataIndex: 'photo',
      hideInSearch: true,
      key: 'photo',
      width: '',
      render: (text, record) => {
        return (
          <ShowImgView id={record.name} src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'} style={{width: '30px', height: '30px'}} />
        )
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'studentID',
      width: '',
      key: 'studentID',
      hideInSearch: true,
    },
    {
      title: '学院',
      dataIndex: 'college',
      width: '',
      key: 'college',
      hideInSearch: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      width: '',
      key: 'class',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: '',
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
      width: '',
      key: 'position',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: '',
      key: 'phone',
    },
    {
      title: 'QQ号',
      dataIndex: 'QQ',
      width: '',
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
      />
    </div>
  );
};

export default RecruitmentSquareCom;
