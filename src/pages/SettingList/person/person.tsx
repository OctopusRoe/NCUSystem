// 用户管理页面

import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Switch } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem, PersonState } from './data';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import DetailsModal from '@/components/DetailsModal/DetailsModal';
import { connect, Dispatch } from 'umi';
import { PaginationProps } from 'antd/lib/pagination';

interface PersonProps {
  count: number;
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
}

const Person: React.FC<PersonProps> = (props) => {
  const [addmodalVisible, setAddmodalVisible] = useState<boolean>(false);
  const [editmodalVisible, setEditmodalVisible] = useState(false);
  const [detailsmodalVisible, setDetailmodalVisible] = useState(false);
  const [rowValue, setRowValue] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { count, dataSource, loading, dispatch } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户类别',
      dataIndex: 'category',
      key: 'category',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <Button type={'link'} size={'small'} onClick={() => setDetailmodalVisible(true)}>
            {text}
          </Button>
        );
      },
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入姓名'} />;
      },
    },
    {
      title: '学号/工号',
      dataIndex: 'personId',
      key: 'personId',
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入学号/工号'} />;
      },
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
      title: '身份证号',
      dataIndex: 'idcard',
      key: 'idcard',
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入身份证号'} />;
      },
    },
    {
      title: '学院/单位',
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
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      renderFormItem: () => {
        return <Input autoComplete={'off'} placeholder={'请输入手机号'} />;
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setEditmodalVisible(true);
              setRowValue(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="确定要密码重置吗？" onConfirm={() => pwdConfirm(record.id)}>
            <a>密码重置</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Switch
            checkedChildren="锁定"
            unCheckedChildren="解除"
            defaultChecked
            onChange={(e) => {
              switchChange(record.id, e);
            }}
          />
          <Divider type="vertical" />
          <Popconfirm title="是否要删除？" onConfirm={() => confirm(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  //更改用户状态
  const switchChange = (id: string, checked: boolean) => {
    //false 正常 解除 0
    //true 锁定  锁定  1
    if (checked) {
      const data = {
        id: id,
        Status: 1,
      };
      dispatch({
        type: 'settingPerson/updateUserStatus',
        payload: data,
      });
    } else {
      const data = {
        id: id,
        Status: 0,
      };
      dispatch({
        type: 'settingPerson/updateUserStatus',
        payload: data,
      });
    }
  };

  //密码重置成功
  const pwdConfirm = (id: string) => {
    dispatch({
      type: 'settingPerson/resetPassword',
      payload: id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //删除成功
  const confirm = (id: string) => {
    dispatch({
      type: 'settingPerson/deleteUser',
      payload: id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  //页面初始化
  useEffect(() => {
    dispatch({
      type: 'settingPerson/searchPerson',
      payload: {},
    });

    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'settingPerson/cleanState',
      });
    };
  }, []);

  // ((pagination: TablePaginationConfig, filters: Record<string, React.ReactText[] | null>, sorter: SorterResult<TableListItem> | SorterResult<...>[], extra: TableCurrentDataSource<...>)
  // table 的 onChange 事件
  const onChange = (pagination: PaginationProps, filters: any, sorter: any, extra: any) => {
    const data = {
      PageSize: pagination.pageSize,
      PageIndex: pagination.current,
    };
    dispatch({
      type: 'settingPerson/searchPerson',
      payload: data,
    });

    // 修改 table 的 loading 值
    dispatch({
      type: 'settingPerson/loading',
      payload: true,
    });
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'settingPerson/searchPerson',
      payload: {},
    });

    dispatch({
      type: 'settingPerson/loading',
      payload: true,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {}) => [
          <Button type="primary" onClick={() => setAddmodalVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        dataSource={dataSource}
        pagination={{ total: count }}
        onChange={onChange}
        columns={columns}
        loading={loading}
        onSubmit={(params: any) => {
          const data = {
            Name: params.name,
            Idcard: params.idcard,
            Phone: params.phone,
            PersonId: params.personId,
          };
          dispatch({
            type: 'settingPerson/searchPerson',
            payload: data,
          });

          // 修改 table 的 loading 值
          dispatch({
            type: 'settingPerson/loading',
            payload: true,
          });
        }}
        onReset={reloadValue}
      />
      <AddModal
        modalVisible={addmodalVisible}
        onCancel={() => setAddmodalVisible(false)}
        afterClose={reloadValue}
      />
      <EditModal
        modalvisible={editmodalVisible}
        onCancel={() => setEditmodalVisible(false)}
        afterClose={reloadValue}
        formValue={rowValue}
      />
      <DetailsModal
        modalVisible={detailsmodalVisible}
        onCancel={() => setDetailmodalVisible(false)}
      />
    </div>
  );
};

export default connect(({ settingPerson }: { settingPerson: PersonState }) => {
  return {
    dataSource: settingPerson.personList,
    count: settingPerson.count,
    loading: settingPerson.loading,
  };
})(Person);
