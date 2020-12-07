//编辑成员  组件
import { Button, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { connect, Dispatch } from 'umi';
import React, { useEffect, useRef } from 'react';

export interface DepartmentPositionState {
  department: any;
  position: any;
}

export interface OrganizationState {
  valueList: any;
}

export interface AssociationPositionState {
  positionList?: {}[];
}

interface EditModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  formValue: any;
  afterClose: () => void;
  dispatch: Dispatch;
  personId: string;
  valueList: any;
  positionList: any;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};
const { Option } = Select;
const EditModal: React.FC<EditModalProps> = (props) => {
  const {
    modalVisible,
    onCancel,
    formValue,
    dispatch,
    afterClose,
    valueList,
    positionList,
  } = props;

  useEffect(() => {
    //获取部门列表
    dispatch({
      type: 'associationOrganization/getOrganization',
      payload: {},
    });
    //获取职务列表
    dispatch({
      type: 'associationPosition/searchPosition',
      payload: {},
    });
  }, []);

  const positionObj = positionList.filter((item: any) => item.name === formValue.position)[0];
  const departmentObj = valueList.filter((item: any) => item.one === formValue.department)[0];

  const data = {
    ...formValue,
    positionObj: positionObj && positionObj.id,
    departmentObj: departmentObj && departmentObj.id,
  };

  const button = useRef<HTMLButtonElement>(null);

  //modal框确定按钮
  const okChange = () => {
    // document.getElementById('add-submit')?.click();
    button.current?.click();
  };

  const onFinish = (values: any) => {
    const data = {
      edPersonId: formValue.personId,
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
          initialValues={data}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'} //输入框输入记录
        >
          <Form.Item name="name" label="姓名">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="departmentObj"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Select placeholder="请选择部门">
              {valueList &&
                valueList.map((item: any) => (
                  <Option value={item.id} key={`department${item.id}`}>
                    {item.one}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="positionObj"
            label="职务"
            // rules={[{ required: true, message: '请输入职务名称' }]}
          >
            <Select placeholder="请选择职务">
              {positionList &&
                positionList.map((item: any) => (
                  <Option value={item.id} key={`position${item.id}`}>
                    {item.name}
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

export default connect(
  ({
    associationOrganization,
    associationPosition,
  }: {
    associationOrganization: OrganizationState;
    associationPosition: AssociationPositionState;
  }) => {
    return {
      valueList: associationOrganization.valueList,
      positionList: associationPosition.positionList,
    };
  },
)(EditModal);
