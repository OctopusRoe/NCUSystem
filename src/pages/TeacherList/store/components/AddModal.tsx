import { Button, DatePicker, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useRef } from 'react';

interface AddModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  onBlur: (e: string) => void;
  formValue: { name: string; phone: string; department: string; position: string };
}
const { RangePicker } = DatePicker;
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

const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalVisible, onCancel, onBlur, formValue } = props;

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="新增指导老师"
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
          onFinishFailed={onFinishFailed}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item name="id" label="工号" rules={[{ required: true, message: '请输入工号' }]}>
            <Input placeholder="请输入工号" onBlur={(e) => onBlur(e.target.value)} />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <div
              style={{
                backgroundColor: '#f5f5f5',
                color: 'rgba(0,0,0,0.25)',
                width: '100%',
                marginRight: '8px',
                height: '32px',
                border: '1px solid #d9d9d9',
              }}
            >
              <div style={{ padding: '4px 11px' }}>{formValue.name ? formValue.name : null}</div>
            </div>
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <div
              style={{
                backgroundColor: '#f5f5f5',
                color: 'rgba(0,0,0,0.25)',
                width: '100%',
                marginRight: '8px',
                height: '32px',
                border: '1px solid #d9d9d9',
              }}
            >
              <div style={{ padding: '4px 11px' }}>{formValue.phone ? formValue.phone : null}</div>
            </div>
          </Form.Item>

          <Form.Item name="department" label="部门">
            <div
              style={{
                backgroundColor: '#f5f5f5',
                color: 'rgba(0,0,0,0.25)',
                width: '100%',
                marginRight: '8px',
                height: '32px',
                border: '1px solid #d9d9d9',
              }}
            >
              <div style={{ padding: '4px 11px' }}>
                {formValue.department ? formValue.department : null}
              </div>
            </div>
          </Form.Item>
          <Form.Item name="position" label="职务">
            <div
              style={{
                backgroundColor: '#f5f5f5',
                color: 'rgba(0,0,0,0.25)',
                width: '100%',
                marginRight: '8px',
                height: '32px',
                border: '1px solid #d9d9d9',
              }}
            >
              <div style={{ padding: '4px 11px' }}>
                {formValue.position ? formValue.position : null}
              </div>
            </div>
          </Form.Item>
          <Form.Item
            name="includes"
            label="聘用期"
            rules={[{ required: true, message: '请选择聘用期' }]}
          >
            <RangePicker style={{ width: '100%' }} />
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
