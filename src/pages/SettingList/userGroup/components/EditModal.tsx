//编辑用户组 modal框
import { Button, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { connect, Dispatch } from 'umi';

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
  formValue: any;
  afterClose: () => void;
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};
const InputArea = Input.TextArea;
const EditModal: React.FC<AddModalProps> = (props) => {
  const { modalvisible, onCancel, dispatch, formValue, afterClose } = props;

  const onFinish = (values: any) => {
    const data = {
      id: formValue.id,
      ...values,
    };
    dispatch({
      type: 'settingUserGroup/addUserGroup',
      payload: data,
    });
    onCancel();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  //modal框确定按钮
  const okChange = () => {
    document.getElementById('edit-btnok')?.click();
  };

  return (
    <>
      <Modal
        title="编辑用户组"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
        destroyOnClose //关闭modal框清除数据
      >
        <Form
          {...layout}
          name="edit"
          initialValues={formValue}
          onFinish={onFinish}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'}
        >
          <Form.Item
            name={'groupName'}
            label={'用户组名称'}
            rules={[{ required: true, message: '请输入用户组名称' }]}
          >
            <Input placeholder="请输入用户组名称" />
          </Form.Item>
          <Form.Item
            name={'remark'}
            label={'描述'}
            rules={[{ required: true, message: '请输入用户组描述' }]}
          >
            <InputArea rows={4} maxLength={1000} placeholder="请输入用户组描述" />
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="edit-btnok" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect()(EditModal);
