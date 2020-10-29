import { Button, Form, Input, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface EditorModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const TestList = () => {
  return (
    <>
      <FormItem>
        <Space>
          <Button type="default">取消</Button>
          <Button type="primary">保存</Button>
        </Space>
      </FormItem>
    </>
  );
};

const EditorModal: React.FC<EditorModalProps> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="部门-职务"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={<TestList />}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <FormItem name="requirements" label="招新要求">
          <TextArea showCount maxLength={100} rows={3} />
        </FormItem>
        <FormItem name="count" label="招新人数">
          <Input style={{ width: '100px' }} suffix="人" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditorModal;
