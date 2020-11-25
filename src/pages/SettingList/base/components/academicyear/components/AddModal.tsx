// 新增学年 组件

import React, { useRef } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
  dispatch: Dispatch;
  afterClose: () => void
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { RangePicker } = DatePicker;

const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalvisible, onCancel, afterClose, dispatch } = props;
  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (values: any) => {

    dispatch({
      type: 'baseAcademicYear/addAcademicYear',
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
        title="新增学年"
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

export default connect()(AddModal);
