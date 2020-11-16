import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';

interface EditorModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: { requirements: string; count: string; department: string; position: string };
}

const EditorModal: React.FC<EditorModalProps> = (props) => {
  const { modalVisible, onCancel, formValue } = props;
  const button = useRef<HTMLFontElement>(null);

  //modal框确认按钮
  const okChange = () => {
    button.current?.click();
    console.log(formValue);
  };

  const onFinish = (value: any) => {
    console.log('Success:', value);
  };

  return (
    <Modal
      destroyOnClose
      title={`${formValue.department}-${formValue.position}`}
      visible={modalVisible}
      onCancel={onCancel}
      onOk={okChange}
      okText="确定"
      cancelText="取消"
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        onFinish={onFinish}
        hideRequiredMark
        initialValues={formValue}
        autoComplete={'off'}
      >
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

export default EditorModal;
