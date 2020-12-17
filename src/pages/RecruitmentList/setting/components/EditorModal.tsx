import React, { useRef } from 'react';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';

import { connect, Dispatch } from 'umi'

interface EditorModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: { requirements: string; count: string; department: string; position: string, id: string };
  afterClose: () => void
  dispatch: Dispatch
}

const EditorModal: React.FC<EditorModalProps> = (props) => {
  const { modalVisible, onCancel, formValue, dispatch, afterClose } = props;
  const button = useRef<HTMLFontElement>(null);

  const onFinish = (e: any) => {
    
    const data = {
      Id: formValue.id,
      request: e.request,
      number: e.number
    }

    dispatch({
      type: 'recruitmentSetting/upData',
      payload: data
    })

    setTimeout(() => {
      afterClose()
    }, 0.5 * 1000)

    onCancel()

  };

  return (
    <Modal
      destroyOnClose
      title={`${formValue.department}-${formValue.position}`}
      visible={modalVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
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
          name="request"
          label="招新要求"
          rules={[{ required: true, message: '请输入招新要求' }]}
        >
          <TextArea showCount maxLength={100} rows={3} />
        </FormItem>
        <FormItem
          name="number"
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

export default connect()(EditorModal);
