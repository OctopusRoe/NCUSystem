import React, { useRef } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
  dispatch: Dispatch;
  afterClose: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { Option } = Select;

const educational = ['4年制', '5年制', '6年制', '8年制'];

const AddModal: React.FC<AddModalProps> = (props) => {

  const { modalvisible, onCancel, dispatch, afterClose } = props;

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (values: any) => {

    dispatch({
      type: 'baseSpecialty/addSpecial',
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
    <>
      <Modal
        title="新增专业"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={() => button.current?.click()}
        okText="确定"
        cancelText="取消"
        destroyOnClose
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
          <Form.Item
            label="专业号"
            name="majorNo"
            rules={[{ required: true, message: '请输入专业号' }]}
          >
            <Input placeholder="请输入专业号" />
          </Form.Item>

          <Form.Item
            label="专业名称"
            name="majorName"
            rules={[{ required: true, message: '请输入专业名称' }]}
          >
            <Input placeholder="请输入专业名称" />
          </Form.Item>

          <Form.Item
            label="学院/单位"
            name="college"
            rules={[{ required: true, message: '请输入学院/单位' }]}
          >
            <Input placeholder="请输入学院/单位" />
          </Form.Item>

          <Form.Item
            label="学制"
            name="lengthOfSchooling"
            rules={[{ required: true, message: '请选择学制' }]}
          >
            <Select placeholder={'请选择学制'}>
              {educational.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect()(AddModal);
