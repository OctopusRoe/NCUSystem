import { Button, Form, Input, Radio, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { SetClassState } from '../../../SettingList/base/data';

interface AddModalProps {
  modalvisible: boolean;
  onCancel: () => void;
  formValue: any;
  afterClose: () => void;
  dispatch: Dispatch;
  classData: any;
}

const userType = [
  { id: 1, type: '学生' },
  { id: 2, type: '教职工' },
];

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};
const { Option } = Select;
const EditModal: React.FC<AddModalProps> = (props) => {
  const { modalvisible, onCancel, afterClose, dispatch, formValue, classData } = props;

  const classObj = classData.filter((item: any) => item.className === formValue.class)[0];

  const data = {
    ...formValue,
    classObj: classObj && classObj.id,
  };

  const onFinish = (values: any) => {
    console.log('按钮获取到的1class', values.class);

    const data = {
      ...values,
      id: formValue.id,
    };

    dispatch({
      type: 'settingPerson/updateUser',
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

  useEffect(() => {
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {},
    });
  }, []);

  function onChange(value: any) {
    console.log(`selected ${value}`);
    const data = {
      query: value,
    };
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data,
    });
  }

  function onBlur() {
    console.log('blur');
    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseSetClass/cleanState',
      });
    };
  }

  function onFocus() {
    console.log('focus');
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {},
    });
  }

  function onSearch(val: any) {
    console.log('search:', val);

    const data = {
      query: val,
    };
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data,
    });
  }

  return (
    <>
      <Modal
        title="编辑用户"
        visible={modalvisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Form
          {...layout}
          name="edit"
          initialValues={data}
          onFinish={onFinish}
          hideRequiredMark //去除前面红色*号
          autoComplete={'off'}
        >
          <Form.Item
            name="category"
            label="用户类别"
            rules={[{ required: true, message: '请选择用户类别' }]}
          >
            <Radio.Group>
              {userType.map((item: any) => (
                <Radio value={item.id} key={item.id}>
                  {item.type}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="personId"
            label="学号/工号"
            rules={[{ required: true, message: '请输入学号/工号' }]}
          >
            <Input placeholder="请输入学号/工号" />
          </Form.Item>
          <Form.Item name="gender" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="idcard"
            label="身份证号"
            rules={[
              { required: true, message: '请输入身份证号' },
              {
                pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
                message: '身份证号码格式错误',
              },
            ]}
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
            name="classObj"
            label="班级"
            rules={[{ required: true, message: '请输入班级' }]}
          >
            <Select
              showSearch
              placeholder="请输入班级"
              optionFilterProp="children"
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {classData.map((item: any) => (
                <Option value={item.id} key={item.id}>
                  {item.className}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
                message: '手机号码格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item style={{ display: 'none' }}>
            <Button type="primary" htmlType="submit" id="edit-btnok" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ baseSetClass }: { baseSetClass: SetClassState }) => {
  return { classData: baseSetClass.classList };
})(EditModal);
