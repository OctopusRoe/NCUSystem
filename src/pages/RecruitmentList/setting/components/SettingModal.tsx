// 招新设置 组件

import { Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

import CropImgview from '@/components/CropImgview'

interface SettingModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const TestList = () => {
  return (
    <>
      <FormItem>
        <Space>
          <Button type="default">取消</Button>
          <Button type="primary">保存</Button>
        </Space>
      </FormItem>
    </>
  );
};

const SettingModal: React.FC<SettingModalProps> = (props) => {
  const { RangePicker } = DatePicker;
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="设置"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={<TestList />}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <FormItem name="img" label="招新海报" >
          <CropImgview id="posters" aspect={400/240} />
        </FormItem>
        <FormItem name="slogan" label="宣传语">
          <TextArea showCount={true} maxLength={100} rows={3}/>
        </FormItem>
        <FormItem name="time" label="截止时间">        
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime={true}
        />
        </FormItem>
        <FormItem name="QQnumber" label="招新QQ群">        
        <Input />
        </FormItem>
        <FormItem name="setting" label="设置">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default SettingModal;
