// 活动管理 组件

import React, { useRef, useState } from 'react';
import { Button, Input, Divider, message, Switch, Popconfirm } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import DetailsModal from '@/components/DetailsModal/DetailsModal';
import { TableListItem } from './data.d';
import { queryRule } from './service';
import { connect } from 'umi';

const { Search } = Input;

const Admin: React.FC<{}> = () => {
  message.config({
    maxCount: 1,
  });

  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModal] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      render: (text) => {
        return (
          <Button
            type={'link'}
            size={'small'}
            onClick={() => {
              setDetailModal(true);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: '学号',
      dataIndex: 'stuid',
      key: 'stuid',
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
      dataIndex: 'apply',
      key: 'apply',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInSearch: true,
    },
    {
      title: '报名活动',
      dataIndex: 'activity',
      key: 'activity',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '11%',
      render: (e, record) => (
        <>
          <Switch
            checkedChildren="已报送"
            unCheckedChildren="未报送"
            onChange={(bool: boolean) => {
              agree(bool);
            }}
          />
          <Divider type="vertical" />
          <Popconfirm title="是否要删除" onCancel={cancel} onConfirm={confirm}>
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const cancel = () => {
    message.warning('取消删除');
  };

  const confirm = () => {
    message.success('删除成功');
  };

  // 录用的方法
  const agree = (bool: boolean) => {
    if (!bool) {
      message.warning({
        content: '未录用',
        duration: 5,
      });
      return;
    }

    message.success({
      content: '已录用',
      duration: 5,
    });
  };

  return (
    <div>
      <ProTable<TableListItem>
        rowKey="key"
        search={false}
        actionRef={actionRef}
        headerTitle={'报名列表'}
        toolBarRender={(action, {}) => [<Search enterButton placeholder={'请输入'} />]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      <DetailsModal onCancel={() => setDetailModal(false)} modalVisible={detailModal} />
    </div>
  );
};

export default connect()(Admin);
