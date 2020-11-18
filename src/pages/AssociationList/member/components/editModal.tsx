//编辑成员  组件
import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';

import React, { useRef } from 'react';

interface EditModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: { position: string; department: string; name: string };
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const EditModal: React.FC<EditModalProps> = (props) => {
  const { modalVisible, onCancel, formValue } = props;

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
    console.log(formValue);
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="编辑成员"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="edit"
          onFinish={onFinish}
          initialValues={formValue}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item name="name" label="姓名">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门" />
          </Form.Item>

          <Form.Item
            name="position"
            label="职务"
            rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Input placeholder="请输入职务名称" />
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
