// 我的报名 组件

import React from 'react';

import { Card, Table, Popover, Tag, Switch, message, Badge } from 'antd';

import { TableListItem } from './data';

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer',
};

// 测试数据
const testData = () => {
  const valueList = [];

  for (let i = 0; i < 100; i++) {
    const value = {
      key: i,
      time: new Date().toLocaleDateString(),
      name: `测试名称${i}`,
      department: `测试部门${i}`,
      position: `测试职务${i}`,
      requirement: `测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求${i}`,
      recruit: '10',
      report: '100',
      status: i % 3 === 1 ? 1 : 0,
      option: false,
    };
    valueList.push(value);
  }

  return valueList;
};

const SingUp: React.FC<{}> = (props) => {
  const columns: TableListItem[] = [
    {
      title: '届数',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '招新要求',
      dataIndex: 'requirement',
      key: 'requirement',
      render: (_, record) => {
        const text = (
          <div>
            <p style={{ width: '200px' }}>{record.requirement}</p>
          </div>
        );

        return (
          <div>
            <Popover content={text} trigger={'click'}>
              <Tag color={'blue'} style={changeMouseStyle}>
                查看
              </Tag>
            </Popover>
          </div>
        );
      },
    },
    {
      title: '招新数',
      dataIndex: 'recruit',
      width: '10%',
      key: 'recruit',
    },
    {
      title: '报名数',
      dataIndex: 'report',
      width: '10%',
      key: 'report',
    },
    {
      title: '录取状态',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      render: (e, record) => {
        switch (e) {
          case 0:
            return <Badge status={'success'} text={'已录取'} />;
            break;
          default:
            return <Badge status={'default'} text={'未录取'} />;
            break;
        }
      },
    },
    {
      title: '报名',
      dataIndex: 'option',
      width: '10%',
      key: 'option',
      render: (e, record) => (
        <>
          <Switch
            checkedChildren="已报名"
            unCheckedChildren="未报名"
            onChange={(event) => {
              sginUp(event, e, record);
            }}
          />
        </>
      ),
    },
  ];

  // Switch 组件的报名方法
  const sginUp = (event: boolean, e: any, record: any) => {
    if (!event) {
      message.warning({
        content: '取消成功',
        duration: 5,
      });
      return;
    }
  };

  return (
    <Card>
      <Table
        rowKey="key"
        columns={columns}
        dataSource={testData()}
        pagination={{
          size: 'small',
          showSizeChanger: false,
          pageSize: 20,
          showTotal: (a, b) => false,
        }}
      />
    </Card>
  );
};

export default SingUp;
