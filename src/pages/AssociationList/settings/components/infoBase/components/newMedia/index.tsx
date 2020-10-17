// 新媒体平台登记 组件

import React from 'react'
import { Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';

const tableData = [
  {
    key: '1',
    platformName: '信息工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.baidu.com'
  },
  {
    key: '2',
    platformName: '医学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.tianmao.com'
  },
  {
    key: '3',
    platformName: '食品学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.jindong.com'
  },
  {
    key: '4',
    platformName: '建筑工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.aidagou.com'
  },
  {
    key: '5',
    platformName: '通信工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.google.com'
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const NewMedia: React.FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
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

export default connect()(NewMedia);