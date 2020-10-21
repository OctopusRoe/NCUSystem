
import { Button, Col, Form, Input, Row, Select, Space, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import UploadView from '@/components/UploadView/uploadView';

interface AddModalFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const TestList = () => {
  return (
    <div>
      <Space>
        <Button type="default">取消</Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Space>
    </div>
  );
};

const AddModal: React.FC<AddModalFormProps> = (porps) => {
  const { modalVisible, onCancel } = porps;
  const { Option } = Select;
  return (
  
      <Modal
        destroyOnClose
        title="新增应用"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={<TestList />}
      >
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 15 }}>
          <Row>
            <Col span={24}>
              <FormItem name="img" label="图标">
                <UploadView id="addmodaling" name={'photo'} title={'证件照'} />
              </FormItem>
              <FormItem name="Name" label="应用名称">
                <Input style={{ width: '70%' }} />
              </FormItem>
              <FormItem name="class" label="应用类别">
                <Select placeholder="请选择类别" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </FormItem>
              <FormItem name="ip" label="连接地址">
                <Input />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    
  );
};

export default AddModal;
