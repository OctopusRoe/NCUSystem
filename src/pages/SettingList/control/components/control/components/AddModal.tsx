import { Button, Col, Form, Input, Row, Select, Space, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import CropImgview from '@/components/CropImgview';

interface AddModalFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  typeValue: {one: string, id: number}[]
}

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

//modal框确定按钮
const okChange = () => {
  document.getElementById('add-submit')?.click();
};

const AddModal: React.FC<AddModalFormProps> = (porps) => {
  const { modalVisible, typeValue, onCancel } = porps;
  const { Option } = Select;

  // 获取图片数据
  const getImgData = (e: any) => {
    console.log(e);
  };

  return (
    <Modal
      destroyOnClose
      title="新增应用"
      visible={modalVisible}
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
        <Form.Item name="img" label="图标" rules={[{ required: true, message: '请上传图标' }]}>
          <CropImgview id="img" onChange={getImgData} />
        </Form.Item>
        <Form.Item
          name="Name"
          label="应用名称"
          rules={[{ required: true, message: '请输入应用名称' }]}
        >
          <Input placeholder="请输入应用名称" />
        </Form.Item>
        <Form.Item
          name="class"
          label="应用类别"
          rules={[{ required: true, message: '请选择应用类别' }]}
        >
          <Select placeholder={'请选择单位类别'}>
            {typeValue.map((item: any, index: number) => (
              <Option value={item.one} key={item.one}>
                {item.one}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ip"
          label="链接地址"
          rules={[{ required: true, message: '请输入链接地址' }]}
        >
          <Input placeholder="请输入链接地址" />
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
