import React, { useRef } from 'react';

import { Button, Form, Input, Modal } from 'antd';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
  afterClose: () => void;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const AddModal: React.FC<AddModalProps> = (props) => {

  const { modalvisible, onCancel, afterClose, dispatch } = props;

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (values: any) => {
    
    dispatch({
      type: 'baseSetClass/addClass',
      payload: values
    })

    onCancel()

    setTimeout(() => {
      afterClose()
    }, 0.5 * 1000)
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="新增班级"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={() => button.current?.click()}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Form
          {...layout}
          name="add"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item
            label="班级号"
            name="classNo"
            rules={[{ required: true, message: '请输入班级号' }]}
          >
            <Input placeholder="请输入班级号" />
          </Form.Item>

          <Form.Item
            label="班级名称"
            name="className"
            rules={[{ required: true, message: '请输入班级名称' }]}
          >
            <Input placeholder="请输入班级名称" />
          </Form.Item>

          <Form.Item
            label="专业号"
            name="majorNo"
            rules={[{ required: true, message: '请输入专业号' }]}
          >
            <Input placeholder="请输入专业号" />
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect()(AddModal);
