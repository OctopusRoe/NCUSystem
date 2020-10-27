import React from 'react';
import { Modal, Form, Row, Col, Button, Space, Tabs, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  form: any;
}

const FormItem = Form.Item;

const TestList = () => {
  return (
    <div>
      <FormItem>
        <Space>
          <Button type="default">取消</Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Space>
      </FormItem>
    </div>
  );
};

const { TabPane } = Tabs;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, form } = props;

  const test = (e: any) => {
    console.log(e);
  };

  return (
    <Modal
      destroyOnClose
      title="新增用户"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={<TestList />}
    >
      <Tabs type="card">
        <TabPane tab="单个添加" key="1">
          {form}
        </TabPane>
        <TabPane tab="批量导入" key="2">
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} onFinish={test}>
            <Row justify="center">
              <Col span={24}>
                <FormItem name="upload" label="上传">
                  <Upload showUploadList={false}>
                    <Button icon={<UploadOutlined />}>选择文件</Button>
                  </Upload>
                </FormItem>
                <Row>
                  <Col offset={5}>
                    <p>
                      <a>下载模板</a>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateForm;
