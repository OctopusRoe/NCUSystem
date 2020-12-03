import React, { useRef } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';

import { connect, Dispatch } from 'umi'

interface AddModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  afterClose: () => void;
  dispatch: Dispatch
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { Option } = Select
const selectValue = [ '1', '0' ]


const AddModal: React.FC<AddModalProps> = (props) => {

  const { modalVisible, onCancel, afterClose, dispatch } = props;
  
  
  const button = useRef<HTMLButtonElement>(null);
  
  const onFinish = (values: any) => {
    
    dispatch({
      type: 'associationPosition/addPosition',
      payload: values
    })

    onCancel()

    setTimeout(() => {
      afterClose()
    }, 0.5 * 1000)

  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新增职务"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={() => button.current?.click()}
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
            name="name"
            label="职务名称"
            rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Input placeholder="请输入职务名称" />
          </Form.Item>
          <Form.Item
            name="responsible"
            label="社团负责人"
            rules={[{ required: true, message: '请输入社团负责人' }]}
          >
            <Select placeholder={'请选择'} >
              {
                selectValue.map((item: string, index: number) => (
                  <Option value={item} key={index}>{item === '1' ? '是' : '否'}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="backbone"
            label="社团骨干"
            rules={[{ required: true, message: '请输入社团骨干' }]}
          >
            <Select placeholder={'请选择'} >
              {
                selectValue.map((item: string, index: number) => (
                  <Option value={item} key={index}>{item === '1' ? '是' : '否'}</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="rank"
            label="排序号"
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

export default connect()(AddModal);
