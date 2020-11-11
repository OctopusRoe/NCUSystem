import { Button, Form, Input, Select } from 'antd';
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

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('add-submit')?.click();
  };

  return (
    <>
      <Modal
        title="新增班级"
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
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item
            label="班级号"
            name="classID"
            rules={[{ required: true, message: '请输入班级号' }]}
          >
            <Input placeholder="请输入班级号" />
          </Form.Item>

          <Form.Item
            label="班级名称"
            name="classname"
            rules={[{ required: true, message: '请输入班级名称' }]}
          >
            <Input placeholder="请输入班级名称" />
          </Form.Item>

          <Form.Item
            label="专业号"
            name="specialtyID"
            rules={[{ required: true, message: '请输入专业号' }]}
          >
            <Input placeholder="请输入专业号" />
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="add-submit" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
