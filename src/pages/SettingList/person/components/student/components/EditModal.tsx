import { Button, Form, Input, Radio } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}

const EditModal: React.FC<AddModalProps> = (props) => {
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

  const userType = ['类别1', '类别2', '类别3', '类别4'];

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('edit-btnok')?.click();
  };

  return (
    <>
      <Modal
        title="编辑用户"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="edit"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'}
        >
          <Form.Item
            name="category"
            label="用户类别"
            rules={[{ required: true, message: '请选择用户类别' }]}
          >
            <Radio.Group>
              {userType.map((item: any, index: number) => (
                <Radio value={item} key={index}>
                  {item}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="mame" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="id"
            label="学号/工号"
            rules={[{ required: true, message: '请输入学号/工号' }]}
          >
            <Input placeholder="请输入学号/工号" />
          </Form.Item>
          <Form.Item name="sex" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="IdCard"
            label="身份证号"
            rules={[{ required: true, message: '请输入身份证号' }]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item
            name="college"
            label="学院/单位"
            rules={[{ required: true, message: '请输入学院/单位' }]}
          >
            <Input placeholder="请输入学院/单位" />
          </Form.Item>
          <Form.Item name="class" label="班级" rules={[{ required: true, message: '请输入班级' }]}>
            <Input placeholder="请输入班级" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="edit-btnok" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
