// 成员管理 页面

import { Button, Divider, message, Popconfirm } from 'antd';

import React, { useRef, useState } from 'react';
import { queryRule } from './service';
import { TableListItem } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import DetailsModal from '@/components/DetailsModal/DetailsModal';

import AddForm from './components/addForm';
import CopyMember from './components/copyMember';

const MemberCom: React.FC<{}> = () => {
  message.config({
    maxCount: 1,
  });

  const actionRef = useRef<ActionType>();

  // 控制显示任务信息模态框
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);

  // 控制添加模态框
  const [addVisible, setAddVisible] = useState<boolean>(false);

  // 控制复制模态框
  const [copyVisible, setCopyVisible] = useState<boolean>(false);

  // 添加人员的服务器返回数据
  const [formValue, setFormValue] = useState<any>({});

  // 选中的人员列表
  const [copyList, setCopyList] = useState<any>([]);

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
        return (
          <Button size={'small'} type={'link'} onClick={() => setDetailsModalVisible(true)}>
            {text}
          </Button>
        );
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
          <Popconfirm title={'是否要删除?'} onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //取消删除
  const cancel = () => {
    message.error('取消删除');
  };

  //删除成功
  const confirm = () => {
    message.success('删除成功');
  };

  // 导出方法
  const Download = (selectedRows: any) => {
    if (selectedRows && selectedRows.length > 0) {
      message.success({
        content: '已下载选中条目',
        duration: 3,
      });
      return;
    }
    message.success({
      content: '已下载全部条目',
      duration: 3,
    });
  };

  const onBlur = (e: string) => {
    setFormValue({
      name: 'OctopusRoe',
      sex: '男',
      college: '信息工程学院',
      class: '测试班级1',
    });
  };

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
          <Button type={'primary'} onClick={() => setAddVisible(true)}>
            <PlusOutlined /> 添加
          </Button>,
          <Button
            type={'primary'}
            onClick={() => {
              if (selectedRows && selectedRows.length > 0) {
                setCopyVisible(true);
                return;
              }
              message.warning({
                content: '请选择成员',
                duration: 3,
              });
            }}
          >
            <CopyOutlined /> 复制
          </Button>,
          <Button type="default" onClick={() => Download(selectedRows)}>
            <DownloadOutlined /> {selectedRows && selectedRows.length > 0 ? '导出选中' : '导出全部'}
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
        scroll={{ x: 1500 }}
      />
      <AddForm
        addVisible={addVisible}
        onCancel={() => setAddVisible(false)}
        onBlur={onBlur}
        formValue={formValue}
      />
      <CopyMember
        copyVisible={copyVisible}
        onCancel={() => setCopyVisible(false)}
        copyList={[]}
        selectList={['2019届', '2020届', '2021届']}
      />
      <DetailsModal
        modalVisible={DetailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
      />
    </>
  );
};

export default MemberCom;
