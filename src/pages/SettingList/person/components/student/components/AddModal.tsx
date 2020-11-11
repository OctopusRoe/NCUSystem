import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Tabs, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';

interface AddModalProps {
  modalVisible: boolean;
  onCancel: () => void;
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

const onFinish2 = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed2 = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const { TabPane } = Tabs;
const userType = ['类别1', '类别2', '类别3', '类别4'];
const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [tabKey, settabKey] = useState('1');
  //Tab栏change
  const callBack = (key: string) => {
    settabKey(key);
  };

  //modal框确定按钮
  const okChange = () => {
    console.log(typeof tabKey);

    tabKey === '1'
      ? document.getElementById('add-submit-1')?.click()
      : document.getElementById('add-submit-2')?.click();
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新增用户"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Tabs type="card" onChange={callBack}>
          <TabPane tab="单个添加" key="1">
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
                name="category"
                label="用户类别"
                rules={[{ required: true, message: '请选择用户类别' }]}
              >
                <Radio.Group>
                  {userType.map((item: any, index: number) => (
                    <Radio value={item} key={index}>
                      {item}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="mame"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                name="id"
                label="学号/工号"
                rules={[{ required: true, message: '请输入学号/工号' }]}
              >
                <Input placeholder="请输入学号/工号" />
              </Form.Item>
              <Form.Item
                name="sex"
                label="性别"
                rules={[{ required: true, message: '请选择性别' }]}
              >
                <Radio.Group>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="IdCard"
                label="身份证号"
                rules={[{ required: true, message: '请输入身份证号' }]}
              >
                <Input placeholder="请输入身份证号" />
              </Form.Item>
              <Form.Item
                name="college"
                label="学院/单位"
                rules={[{ required: true, message: '请输入学院/单位' }]}
              >
                <Input placeholder="请输入学院/单位" />
              </Form.Item>
              <Form.Item
                name="class"
                label="班级"
                rules={[{ required: true, message: '请输入班级' }]}
              >
                <Input placeholder="请输入班级" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true, message: '请输入手机号' }]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item style={{ display: 'none' }}>
                <Button type="primary" htmlType="submit" id="add-submit-1" />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="批量导入" key="2">
            <Form
              {...layout}
              name="add-upload"
              initialValues={{ remember: true }}
              onFinish={onFinish2}
              onFinishFailed={onFinishFailed2}
              hideRequiredMark //去除前面红色*号
              autoComplete={'off'} //输入框输入记录
            >
              <Form.Item
                name="upload"
                label="上传"
                rules={[{ required: true, message: '请上传文件' }]}
              >
                <Upload showUploadList={false} fileList={[]}>
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <a style={{ verticalAlign: 'bottom', paddingLeft: '100px', fontSize: '14px' }}>
                  下载模板
                </a>
              </Form.Item>

              <Form.Item style={{ display: 'none' }}>
                <Button type="primary" htmlType="submit" id="add-submit-2" />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default AddModal;
