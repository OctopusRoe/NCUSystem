// 职务设置 组件

import React from 'react'
import { Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';

const tableData = [
  {
    key: '1',
    positionName: '测试人员1',
    positionLeader: '是',
    positionVIP: '是',
    sort: 1
  },
  {
    key: '2',
    positionName: '测试人员2',
    positionLeader: '否',
    positionVIP: '是',
    sort: 2
  },
  {
    key: '3',
    positionName: '测试人员3',
    positionLeader: '否',
    positionVIP: '是',
    sort: 3
  },
  {
    key: '4',
    positionName: '测试人员4',
    positionLeader: '否',
    positionVIP: '是',
    sort: 4
  },
  {
    key: '5',
    positionName: '测试人员5',
    positionLeader: '否',
    positionVIP: '是',
    sort: 5
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const Position: React.FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'PositionModel/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Card bordered={false}>
        <Form.Item name="members">
          <TableForm />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['PositionModel/submitAdvancedForm'],
}))(Position);