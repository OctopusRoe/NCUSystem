// 招新设置-设置modal 组件

import { Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';

import CropImgview from '@/components/CropImgview';

interface SettingModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const SettingModal: React.FC<SettingModalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const button = useRef<HTMLFontElement>(null);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  //modal框确定按钮
  const okChange = () => {
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  return (
    <Modal
      destroyOnClose
      title="设置"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={okChange}
      okText="保存"
      cancelText="取消"
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} onFinish={onFinish} hideRequiredMark>
        <FormItem
          name="img"
          label="招新海报"
          rules={[{ required: true, message: '请上传招新海报' }]}
        >
          <CropImgview id="posters" aspect={400 / 240} />
        </FormItem>
        <FormItem
          name="slogan"
          label="宣传语"
          rules={[{ required: true, message: '请输入宣传语' }]}
        >
          <TextArea showCount={true} maxLength={100} rows={3} />
        </FormItem>
        <FormItem
          name="time"
          label="截止时间"
          rules={[{ required: true, message: '请选择截止时间' }]}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} style={{ width: '100%' }} />
        </FormItem>
        <FormItem
          name="QQnumber"
          label="招新QQ群"
          rules={[{ required: true, message: '请输入招新QQ群' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="setting" label="设置">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </FormItem>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingModal;
