// 换届变更 组件

import React from "react"
import { Button, Card, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';

const tableData = [
  {
    key: '1',
    workNumber: '信息工程学院',
    type: '100',
    name: '',
    department: 'www.baidu.com',
    termOfOffice: '2000-01-01'
  },
  {
    key: '2',
    workNumber: '信息工程学院',
    type: '100',
    name: '',
    department: 'www.baidu.com',
    termOfOffice: '2000-01-01'
  },
  {
    key: '3',
    workNumber: '信息工程学院',
    type: '100',
    name: '',
    department: 'www.baidu.com',
    termOfOffice: '2000-01-01'
  },
  {
    key: '4',
    workNumber: '信息工程学院',
    type: '100',
    name: '',
    department: 'www.baidu.com',
    termOfOffice: '2000-01-01'
  },
  {
    key: '5',
    workNumber: '信息工程学院',
    type: '100',
    name: '',
    department: 'www.baidu.com',
    termOfOffice: '2000-01-01'
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const ChangeOffice: React.FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'NewMediaModel/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <PageHeaderWrapper>
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
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['ChangeOfficeModel/submitAdvancedForm'],
}))(ChangeOffice);