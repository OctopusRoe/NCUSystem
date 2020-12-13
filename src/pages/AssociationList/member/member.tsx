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
import * as _ from 'lodash';
import { removeRule } from '@/pages/TeacherList/store/service';

export interface PersonState {
  personList?: {
    id: string;
    category: number;
    name: string;
    personId: string;
    gender: number;
    idcard: string;
    college: string;
    class: string;
    phone: string;
    status: number;
  }[];
}

export interface AcademicYearState {
  academicYearList?: {
    id: number;
    schoolYearName: string;
    schoolYearShortName: string;
    startDate: string;
    endDate: string;
    currentYear: string;
    date: string;
  }[];
}

interface MemberProps {
  count: number;
  dataSorce: any;
  loading: boolean;
  dispatch: Dispatch;
  token: any;
  infoData: any;
  periodList: any;
  selectedRowKeys: any;
  selectedRows: any;
}

export interface GlobalModelState {
  token: any;
}
const { Option } = Select;

const MemberCom: React.FC<MemberProps> = (props) => {
  message.config({
    maxCount: 1,
  });

  const {
    count,
    periodList,
    dataSorce,
    loading,
    dispatch,
    token,
    infoData,
    selectedRows,
    selectedRowKeys,
  } = props;

  const actionRef = useRef<ActionType>();

  //编辑人员modal框
  const [editModalVisible, setEditModalVisible] = useState(false);

  // 控制显示任务信息模态框
  const [DetailsModalVisible, setDetailsModalVisible] = useState(false);

  // 控制添加模态框
  const [addVisible, setAddVisible] = useState<boolean>(false);

  // 控制复制模态框
  const [copyVisible, setCopyVisible] = useState<boolean>(false);

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
            {periodList.length !== 0 &&
              periodList.map((item: any) => (
                <Option value={item.schoolYearShortName} key={`${item.id}`}>
                  {item.schoolYearName}
                </Option>
              ))}
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
          <Button
            size={'small'}
            type={'link'}
            onClick={() => {
              setDetailsModalVisible(true);
              getInfo(record);
            }}
          >
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
      render: (text) => {
        if (text === 1) return <span>女</span>;
        else return <span>男</span>;
      },
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

  //点击姓名 获取详情信息
  const getInfo = (record: any) => {
    const data = {
      PersonId: record.personId,
    };
    dispatch({
      type: 'settingPerson/searchPerson',
      payload: data,
    });
  };

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

  useEffect(() => {
    dispatch({
      type: 'associationMember/searchMember',
      payload: {},
    });

    //请求届数下拉列表的数据
    dispatch({
      type: 'baseAcademicYear/searchAcademicYear',
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

  const onSelect = (record: any, selected: any) => {
    const mySelectedRows = selectedRows;
    if (selected) {
      mySelectedRows.push(record);
    } else {
      _.remove(mySelectedRows, (o: any) => o.id === record.id);
    }
    const selectedRowKeys = _.map(mySelectedRows, 'id');
    dispatch({
      type: 'associationMember/saveSelectedRowKeys',
      payload: {
        selectedRowKeys,
        selectedRows: mySelectedRows,
      },
    });
  };

  const onSelectAll = (selected: any, changeRows: any) => {
    let mySelectedRows = selectedRows;
    if (selected) {
      // 先连接再进行一次去重
      const sa = _.uniqBy(mySelectedRows.concat(changeRows), 'id');
      mySelectedRows = sa.filter((res: any) => {
        return res !== undefined;
      });
    } else {
      _.remove(mySelectedRows);
    }
    const selectedRowKeys = _.map(mySelectedRows, 'id');
    console.log(selectedRowKeys);

    dispatch({
      type: 'associationMember/saveSelectedRowKeys',
      payload: {
        selectedRowKeys,
        selectedRows: mySelectedRows,
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onSelect: onSelect,
    onSelectAll: onSelectAll,
  };

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="id"
        rowSelection={rowSelection}
        toolBarRender={(_action, { selectedRows, selectedRowKeys }) => [
          <Button type={'primary'} onClick={() => setAddVisible(true)}>
            <PlusOutlined /> 添加
          </Button>,
          <Button
            type={'primary'}
            onClick={() => {
              console.log(selectedRowKeys); //选中的ID

              if (selectedRowKeys && selectedRowKeys.length > 0) {
                console.log(selectedRowKeys);

                message.success({
                  content: '已复制选中条目',
                  duration: 3,
                });
                return;
              }
              setCopyVisible(true);
              return;
            }}
          >
            <CopyOutlined /> {selectedRows && selectedRows.length > 0 ? '复制选中' : '复制'}
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
        afterClose={reloadValue}
      />
      <CopyMember
        copyVisible={copyVisible}
        onCancel={() => setCopyVisible(false)}
        copyList={[]}
        selectList={periodList}
      />
      <DetailsModal
        modalVisible={DetailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        infoData={infoData[0]}
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
  ({
    associationMember,
    global,
    settingPerson,
    baseAcademicYear,
  }: {
    settingPerson: PersonState;
    associationMember: MemberState;
    global: GlobalModelState;
    baseAcademicYear: AcademicYearState;
  }) => {
    return {
      dataSorce: associationMember.memberList,
      count: associationMember.count,
      loading: associationMember.loading,
      token: global.token,
      infoData: settingPerson.personList,
      periodList: baseAcademicYear.academicYearList,
      selectedRowKeys: associationMember.selectedRowKeys,
      selectedRows: associationMember.selectedRows,
    };
  },
)(MemberCom);
