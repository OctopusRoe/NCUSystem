import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}

const educational = ['4年制', '5年制', '6年制', '8年制'];

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

  const { Option } = Select;

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('add-submit')?.click();
  };

  return (
    <>
      <Modal
        title="新增专业"
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
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item
            label="专业号"
            name="specialtyID"
            rules={[{ required: true, message: '请输入专业号' }]}
          >
            <Input placeholder="请输入专业号" />
          </Form.Item>

          <Form.Item
            label="专业名称"
            name="specialtyname"
            rules={[{ required: true, message: '请输入专业名称' }]}
          >
            <Input placeholder="请输入专业名称" />
          </Form.Item>

          <Form.Item
            label="学院/单位"
            name="college"
            rules={[{ required: true, message: '请输入学院/单位' }]}
          >
            <Input placeholder="请输入学院/单位" />
          </Form.Item>

          <Form.Item
            label="学制"
            name="educational"
            rules={[{ required: true, message: '请选择学制' }]}
          >
            <Select placeholder={'请选择学制'}>
              {educational.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="add-submit" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
