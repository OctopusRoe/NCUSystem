import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';

interface EditModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: {
    positionName: string;
    positionLeader: string;
    communityBackbone: string;
    number: string;
  };
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
        title="编辑"
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
          <Form.Item
            name="positionName"
            label="职务名称"
            rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Input placeholder="请输入职务名称" />
          </Form.Item>
          <Form.Item
            name="communityLeader"
            label="社团负责人"
            rules={[{ required: true, message: '请输入社团负责人' }]}
          >
            <Input placeholder="请输入社团负责人" />
          </Form.Item>
          <Form.Item
            name="communityBackbone"
            label="社团骨干"
            rules={[{ required: true, message: '请输入社团骨干' }]}
          >
            <Input placeholder="请输入社团骨干" />
          </Form.Item>
          <Form.Item
            name="number"
            label="排序号"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <Input placeholder="请输入排序号" />
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
