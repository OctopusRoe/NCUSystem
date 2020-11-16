import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';

interface EditorModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const AddModal: React.FC<EditorModalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const button = useRef<HTMLFontElement>(null);
  //modal框确定按钮
  const okChange = () => {
    button.current?.click();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Modal
      destroyOnClose
      title="新增部门"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={okChange}
      okText="确定"
      cancelText="取消"
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} onFinish={onFinish} hideRequiredMark autoComplete={'off'}>
        <FormItem
          name="department"
          label="部门"
          rules={[{ required: true, message: '请输入部门' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="position" label="职务" rules={[{ required: true, message: '请输入职务' }]}>
          <Input />
        </FormItem>
        <FormItem
          name="requirements"
          label="招新要求"
          rules={[{ required: true, message: '请输入招新要求' }]}
        >
          <TextArea showCount maxLength={100} rows={3} />
        </FormItem>
        <FormItem
          name="count"
          label="招新人数"
          rules={[{ required: true, message: '请输入招新人数' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} />
        </FormItem>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
