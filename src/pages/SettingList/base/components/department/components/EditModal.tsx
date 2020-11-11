import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
}

const unitValue = ['类别1', '类别2', '类别3', '类别4'];

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

  const { Option } = Select;

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('edit-btnok')?.click();
  };

  return (
    <>
      <Modal
        title="编辑单位"
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
            label="单位号"
            name="unitID"
            rules={[{ required: true, message: '请输入单位号' }]}
          >
            <Input placeholder="请输入单位号" />
          </Form.Item>

          <Form.Item
            label="单位全称"
            name="unitname"
            rules={[{ required: true, message: '请输入单位全称' }]}
          >
            <Input placeholder="请输入单位全称" />
          </Form.Item>

          <Form.Item
            label="单位简称"
            name="unitname1"
            rules={[{ required: true, message: '请输入单位简称' }]}
          >
            <Input placeholder="请输入单位简称" />
          </Form.Item>

          <Form.Item
            label="单位类别"
            name="unittype"
            rules={[{ required: true, message: '请选择单位类别' }]}
          >
            <Select placeholder={'请选择单位类别'}>
              {unitValue.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="子单位"
            name="chiledunit"
            rules={[{ required: true, message: '请输入子单位' }]}
          >
            <Input placeholder="请输入子单位" />
          </Form.Item>

          <Form.Item
            label="排序号"
            name="number"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <Input placeholder="请输入排序号" />
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="edit-btnok"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
