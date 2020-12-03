//编辑成员  组件
import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { connect, Dispatch } from 'umi';
import React, { useEffect, useRef } from 'react';

export interface DepartmentPositionState {
  department: any;
  position: any;
}

interface EditModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: any;
  afterClose: () => void;
  dispatch: Dispatch;
  personId: string;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};
const { Option } = Select;
const EditModal: React.FC<EditModalProps> = (props) => {
  const { modalVisible, onCancel, formValue, dispatch, afterClose } = props;

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  useEffect(() => {
    //获取部门列表
    // dispatch({
    //   type: 'communityAddressList/searchAddressList',
    //   payload: {},
    // });
    //获取职务列表
    // dispatch({
    //   type: 'communityAddressList/searchAddressList',
    //   payload: {},
    // });
  }, []);

  const onFinish = (values: any) => {
    const data = {
      personId: formValue.personId,
      ...values,
    };
    dispatch({
      type: 'associationMember/memberUpdata',
      payload: data,
    });

    onCancel();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="编辑成员"
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
          initialValues={formValue}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item name="name" label="姓名">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门名称" />
            {/* <Select placeholder="请选择部门">
              <Option value="2020">2020</Option>
              <Option value="2019">2019</Option>
              <Option value="2018">2018</Option>
              <Option value="2017">2017</Option>
              <Option value="2016">2016</Option>
              <Option value="2015">2015</Option>
            </Select> */}
          </Form.Item>

          <Form.Item
            name="position"
            label="职务"
            rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Input placeholder="请输入职务名称" />
          </Form.Item>
          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" ref={button} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect()(EditModal);
