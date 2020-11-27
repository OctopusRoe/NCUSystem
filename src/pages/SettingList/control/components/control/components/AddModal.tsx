import React, { useRef } from 'react';
import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import CropImgview from '@/components/CropImgview';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalVisible: boolean;
  typeValue: {one: string, id: number}[];
  onCancel: () => void;
  afterClose: () => void;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { Option } = Select;

const AddModal: React.FC<AddModalProps> = (porps) => {

  const { modalVisible, typeValue, onCancel, afterClose, dispatch } = porps;

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (values: any) => {

    dispatch({
      type: 'controlList/addControl',
      payload: values
    })

    onCancel()

    setTimeout(() => {
      afterClose()
    }, 0.5 * 1000);
    
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      destroyOnClose
      title="新增应用"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
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
        <Form.Item name="appIco" label="图标" rules={[{ required: true, message: '请上传图标' }]}>
          <CropImgview id="control-img-view" />
        </Form.Item>
        <Form.Item
          name="appName"
          label="应用名称"
          rules={[{ required: true, message: '请输入应用名称' }]}
        >
          <Input placeholder="请输入应用名称" />
        </Form.Item>
        <Form.Item
          name="menuName"
          label="应用类别"
          rules={[{ required: true, message: '请选择应用类别' }]}
        >
          <Select placeholder={'请选择单位类别'}>
            {typeValue.map((item: {one: string, id: number}) => (
              <Option value={item.id} key={item.one}>
                {item.one}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="appURI"
          label="链接地址"
          rules={[{ required: true, message: '请输入链接地址' }]}
        >
          <Input placeholder="请输入链接地址" />
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect()(AddModal);
