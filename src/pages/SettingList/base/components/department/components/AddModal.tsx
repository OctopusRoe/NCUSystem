// 新增新单位 组件

import React, { useRef } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalvisible: boolean;
  typeValue: {one: string, id: number}[];
  onCancel: () => void;
  dispatch: Dispatch
}

const AddModal: React.FC<AddModalProps> = (props) => {

  const { modalvisible, typeValue, onCancel, dispatch } = props;
  const button = useRef<HTMLButtonElement>(null)
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };

  const onFinish = (e: any) => {
    dispatch({
      type: 'baseDepartment/addDepartment',
      payload: e
    })
    onCancel()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { Option } = Select;

  //modal框确定按钮
  const okChange = () => {
    button.current?.click()
  };

  return (
    <>
      <Modal
        title="新增单位"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
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
            label="单位号"
            name="number"
            rules={[{ required: true, message: '请输入单位号' }]}
          >
            <Input placeholder="请输入单位号" />
          </Form.Item>

          <Form.Item
            label="单位全称"
            name="name"
            rules={[{ required: true, message: '请输入单位全称' }]}
          >
            <Input placeholder="请输入单位全称" />
          </Form.Item>

          <Form.Item
            label="单位简称"
            name="shortName"
            rules={[{ required: true, message: '请输入单位简称' }]}
          >
            <Input placeholder="请输入单位简称" />
          </Form.Item>

          <Form.Item
            label="单位类别"
            name="type"
            rules={[{ required: true, message: '请选择单位类别' }]}
          >
            <Select placeholder={'请选择单位类别'}>
              {typeValue.map((item: {one: string, id: number}) => (
                <Option value={item.id} key={item.id}>
                  {item.one}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="子单位"
            name="chiled"
            // rules={[{ required: true, message: '请输入子单位' }]}
          >
            <Input placeholder="请输入子单位" />
          </Form.Item>

          <Form.Item
            label="排序号"
            name="level"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <Input placeholder="请输入排序号" />
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
