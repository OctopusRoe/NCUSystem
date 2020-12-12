// 用户组管理页面

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { connect, Dispatch } from 'umi';
import CreateForm from './components/CreateForm';
import ChangePerson from './components/ChangePerson';
import { TableListItem, UserGroupState } from './data';

import EditModal from './components/EditModal';
import { PaginationProps } from 'antd/lib/pagination';

const { Search } = Input;

interface UserGroupProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
}

const UserGroup: React.FC<UserGroupProps> = (props) => {
  const { count, dataSource, loading, dispatch } = props;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [changePersonVisible, handleChangePersonVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const [current, setCurrent] = useState<number>(0);
  const [query, setQuery] = useState<string>('');

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户组名称',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: '权限详情',
      dataIndex: 'access',
      key: 'access',
      hideInSearch: true,
      // 使用 antd Tree 组件
      render: () => <></>,
    },
    {
      title: '用户组人数',
      dataIndex: 'groupUserCount',
      key: 'groupUserCount',
      hideInSearch: true,
      render: () => <></>,
    },
    {
      title: '描述',
      dataIndex: 'remark',
      hideInSearch: true,
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '250px',
      render: (_, record: any) => (
        <>
          <a
            onClick={() => {
              setEditmodalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleChangePersonVisible(true);
            }}
          >
            人员
          </a>
          <Divider type="vertical" />
          <a>权限</a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //删除成功
  const confirm = (id: number) => {
    dispatch({
      type: 'settingUserGroup/deleteUserGroup',
      payload: id,
    });
    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //Search 搜索框
  const onSearch = (value: any) => {
    setCurrent(1);
    setQuery(value);
    const data = { groupName: value };
    dispatch({
      type: 'settingUserGroup/searchUserGroup',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingUserGroup/loading',
      payload: true,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'settingUserGroup/searchUserGroup',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'settingUserGroup/cleanState',
      });
    };
  }, []);

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      groupName: query,
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'settingUserGroup/searchUserGroup',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingUserGroup/loading',
      payload: true,
    });
    setCurrent(pagination.current as number);
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'settingUserGroup/searchUserGroup',
      payload: {},
    });

    dispatch({
      type: 'settingUserGroup/loading',
      payload: true,
    });
  };

  //导出用户组列表
  const downLoad = () => {
    dispatch({
      type: 'settingUserGroup/downLoad',
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="用户组列表"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Search enterButton placeholder={'请输入用户组名称'} onSearch={onSearch} />,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
          <Button type="default" onClick={downLoad}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        dataSource={dataSource}
        pagination={{ total: count, current: current }}
        onChange={onChange}
        columns={columns}
        loading={loading}
      />
      <EditModal
        formValue={stepFormValues}
        afterClose={reloadValue}
        modalvisible={editmodalVisible}
        onCancel={() => setEditmodalVisible(false)}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        afterClose={reloadValue}
      />
      <ChangePerson
        onCancel={() => handleChangePersonVisible(false)}
        updateModalVisible={changePersonVisible}
        values={stepFormValues}
      />
    </div>
  );
};

export default connect(({ settingUserGroup }: { settingUserGroup: UserGroupState }) => {
  return {
    dataSource: settingUserGroup.userGroupList,
    count: settingUserGroup.count,
    loading: settingUserGroup.loading,
  };
})(UserGroup);
