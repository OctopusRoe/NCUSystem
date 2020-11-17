import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import UploadView from '@/components/UploadView/uploadView';
import React, { useRef } from 'react';
const { Option } = Select;
const type = ['类别1', '类别2', '类别3', '类别4'];
interface EditModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: {
    platformName: string;
    typeOf: string;
    QRCode: string;
    URLPath: string;
    publish: string;
  };
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const EditModal: React.FC<EditModalProps> = (props) => {
  const { modalVisible, onCancel, formValue } = props;

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
    console.log(formValue);
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 90 }} defaultValue="http://">
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Modal
        destroyOnClose
        title="编辑"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="edit"
          onFinish={onFinish}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item
            name="platformName"
            label="平台名称"
            rules={[{ required: true, message: '请输入平台名称' }]}
          >
            <Input placeholder="请输入平台名称" />
          </Form.Item>
          <Form.Item
            name="typeOf"
            label="类别"
            rules={[{ required: true, message: '请选择平台类别' }]}
          >
            <Select placeholder={'请选择平台类别'}>
              {type.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="QRCode"
            label="二维码"
            rules={[{ required: true, message: '请上传二维码' }]}
          >
            <UploadView id="addmodaling" />
          </Form.Item>
          <Form.Item
            name="URLPath"
            label="访问地址"
            rules={[{ required: true, message: '请输入访问地址' }]}
          >
            <Input addonBefore={prefixSelector} placeholder="请输入访问地址" />
          </Form.Item>
          <Form.Item
            name="publish"
            label="发布内容范围"
            rules={[{ required: true, message: '请输入发布内容范围' }]}
          >
            <Input placeholder="请选择发布内容范围" />
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
