import { Button, DatePicker, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import UploadView from '@/components/UploadView/uploadView';
import React, { useRef } from 'react';
const { Option } = Select;
const type = ['类别1', '类别2', '类别3', '类别4'];
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

const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalVisible, onCancel } = props;

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
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
        title="新增平台"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Form
          {...layout}
          name="add"
          onFinish={onFinish}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item
            name="platformName"
            label="平台名称"
            rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Input placeholder="请输入职务名称" />
          </Form.Item>
          <Form.Item
            name="typeOf"
            label="类别"
            rules={[{ required: true, message: '请输入社团负责人' }]}
          >
            <Select placeholder={'请选择单位类别'}>
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
            rules={[{ required: true, message: '请输入社团骨干' }]}
          >
            <UploadView id="addmodaling" />
          </Form.Item>
          <Form.Item
            name="URLPath"
            label="访问地址"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <Input addonBefore={prefixSelector} />
          </Form.Item>
          <Form.Item
            name="publish"
            label="发布内容范围"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <Input placeholder="请输入排序号" />
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="add-submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
