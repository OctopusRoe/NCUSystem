import { Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalvisible, onCancel } = props;
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal title="Basic Modal" visible={modalvisible}  onCancel={onCancel}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="单位全称"
            name="username"
            rules={[{ required: true, message: '请输入单位全称' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="单位简称"
            name="username"
            rules={[{ required: true, message: '请输入单位简称' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="单位类别"
            name="username"
            rules={[{ required: true, message: '请选择单位类别' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="子单位"
            name="username"
            rules={[{ required: true, message: '请输入子单位' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
