import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input,  Row, Select, Space, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

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
  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select defaultValue=".com" className="select-after">
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  return (
    <>
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
              <FormItem label="图标">
                <Upload listType="picture-card" className="avatar-uploader" showUploadList={false}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>选择图标</div>
                  </div>
                </Upload>
              </FormItem>
              <FormItem name="Name" label="应用名称">
                <Input style={{ width: '70%' }} />
              </FormItem>
              <FormItem name="class" label="应用类别">
                <Input style={{ width: '70%' }} />
              </FormItem>
              <FormItem name="ip" label="连接地址">
                <div style={{ marginBottom: 16 }}>
                  <Input addonBefore={selectBefore} addonAfter={selectAfter} />
                </div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
