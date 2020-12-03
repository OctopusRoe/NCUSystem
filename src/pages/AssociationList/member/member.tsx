// 成员管理 页面
import { Button, Divider, Input, message, Popconfirm, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TableListItem, MemberState } from './data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { DownloadOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import DetailsModal from '@/components/DetailsModal/DetailsModal';
import EditModal from './components/editModal';
import AddForm from './components/addForm';
import CopyMember from './components/copyMember';
import { connect, Dispatch } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';

interface MemberProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
  token: any;
}

export interface GlobalModelState {
  token: any;
}
const { Option } = Select;

const MemberCom: React.FC<MemberProps> = (props) => {
  message.config({
    maxCount: 1,
  });
  const { count, dataSorce, loading, dispatch, token } = props;

  const actionRef = useRef<ActionType>();

  //编辑人员modal框
  const [editModalVisible, setEditModalVisible] = useState(false);

  // 控制显示任务信息模态框
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);

  // 控制添加模态框
  const [addVisible, setAddVisible] = useState<boolean>(false);

  // 控制复制模态框
  const [copyVisible, setCopyVisible] = useState<boolean>(false);

  // 添加人员的服务器返回数据
  const [formValue, setFormValue] = useState<any>({});

  //编辑人员的返回数据
  const [editValue, setEditValue] = useState<any>({});

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '届数',
      dataIndex: 'session',
      key: 'session',
      fixed: 'left',
      renderFormItem: () => {
        return (
          <Select placeholder="请选择届数">
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2018">2018</Option>
            <Option value="2017">2017</Option>
            <Option value="2016">2016</Option>
            <Option value="2015">2015</Option>
          </Select>
        );
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
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入姓名'} />;
      },
    },
    {
      title: '学号',
      dataIndex: 'personId',
      key: 'personId',
      fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
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
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditModalVisible(true);
              setEditValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title={'是否要删除?'} onConfirm={() => confirm(record.personId)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = (id: string) => {
    dispatch({
      type: 'associationMember/deleteMember',
      payload: id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  // 导出方法
  const Download = (selectedRows: any) => {
    const data = {
      id: token.personId,
    };
    dispatch({
      type: 'associationMember/downLoad',
      payload: data,
    });

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

  useEffect(() => {
    dispatch({
      type: 'associationMember/searchMember',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'associationMember/cleanState',
      });
    };
  }, []);

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'associationMember/searchMember',
      payload: {},
    });

    dispatch({
      type: 'associationMember/loading',
      payload: true,
    });
  };

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'associationMember/searchMember',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'associationMember/loading',
      payload: true,
    });
  };

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="id"
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
        dataSource={dataSorce}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
        onSubmit={(params: any) => {
          const data = {
            name: params.name,
            session: params.session,
          };
          dispatch({
            type: 'associationMember/searchMember',
            payload: data,
          });

          // 修改 table 的 loading 值
          dispatch({
            type: 'associationMember/loading',
            payload: true,
          });
        }}
        onReset={reloadValue}
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
      <EditModal
        onCancel={() => setEditModalVisible(false)}
        modalVisible={editModalVisible}
        formValue={editValue}
        afterClose={reloadValue}
        personId={token.personId}
      />
    </>
  );
};

export default connect(
  ({ associationMember, global }: { associationMember: MemberState; global: GlobalModelState }) => {
    return {
      dataSorce: associationMember.memberList,
      count: associationMember.count,
      loading: associationMember.loading,
      token: global.token,
    };
  },
)(MemberCom);
