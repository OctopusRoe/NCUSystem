import { Button, DatePicker, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = (props) => {
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

  const { RangePicker } = DatePicker;

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('add-btnok')?.click();
  };

  return (
    <>
      <Modal
        title="新增学年"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="add"
          initialValues={{ remember: true }}
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
            <Button type="primary" htmlType="submit" id="add-btnok" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
