import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}


const EditModal: React.FC<AddModalProps> = (props) => {
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

  const InputArea = Input.TextArea;

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('edit-btnok')?.click();
  };

  return (
    <>
      <Modal
        title="编辑用户组"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="edit"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'}
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
            <Button type="primary" htmlType="submit" id="edit-btnok" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
