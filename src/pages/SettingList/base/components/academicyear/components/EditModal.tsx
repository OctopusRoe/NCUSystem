import React,{ useRef } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';

import { connect, Dispatch } from 'umi'
import moment from 'moment'

interface EditModalProps {
  modalvisible: boolean;
  formValue: any
  onCancel: () => void;
  afterClose: () => void;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { RangePicker } = DatePicker;

const EditModal: React.FC<EditModalProps> = (props) => {
  const { modalvisible, formValue, onCancel, afterClose, dispatch } = props;

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (values: any) => {

    const data = {
      id: formValue.id,
      ...values
    }

    dispatch({
      type: 'baseAcademicYear/addAcademicYear',
      payload: data
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
        title="编辑学年"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={() => button.current?.click()}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Form
          {...layout}
          name="edit"
          initialValues={formValue}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'}  //输入框输入记录
        >
          <Form.Item
            label="学年全称"
            name="academicfull"
            rules={[{ required: true, message: '请输入学年全称' }]}
          >
            <Input placeholder="请输入学年全称" />
          </Form.Item>

          <Form.Item
            label="学年简称"
            name="academicsyssimple"
            rules={[{ required: true, message: '请输入学年简称' }]}
          >
            <Input placeholder="请输入学年简称" />
          </Form.Item>

          <Form.Item
            label="时间段"
            name="academictime"
            rules={[{ required: true, message: '请选择时间段' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="当前学年"
            name="defaulttime"
            rules={[{ required: true, message: '请选择当前学年' }]}
          >
            <RangePicker picker="year" style={{width:'100%'}}/>
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect()(EditModal);
