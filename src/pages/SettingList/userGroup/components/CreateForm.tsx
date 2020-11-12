import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const InputArea = Input.TextArea;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('add-submit')?.click();
  };

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
    <Modal
      destroyOnClose
      title="新增用户组"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={okChange}
      okText="确定"
      cancelText="取消"
    >
      <Form
        {...layout}
        name="add"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        hideRequiredMark //去除前面红色*号
        autoComplete={'off'} //输入框输入记录
      >
        <Form.Item
          name={'name'}
          label={'用户组名称'}
          rules={[{ required: true, message: '请输入用户组名称' }]}
        >
          <Input placeholder="请输入用户组名称" />
        </Form.Item>
        <Form.Item
          name={'desc'}
          label={'描述'}
          rules={[{ required: true, message: '请输入用户组描述' }]}
        >
          <InputArea rows={4} maxLength={1000} placeholder="请输入用户组描述" />
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
