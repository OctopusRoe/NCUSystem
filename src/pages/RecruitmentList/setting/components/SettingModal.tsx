import UploadView from '@/components/UploadView/uploadView';
import { Button, Col, DatePicker, Form, Input, Row, Space, Switch } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

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
          <UploadView id="posters"  />
        </FormItem>
        <FormItem name="slogan" label="宣传语">
          <TextArea showCount maxLength={100} rows={3}/>
        </FormItem>
        <FormItem name="time" label="截止时间">        
        <DatePicker  />
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
