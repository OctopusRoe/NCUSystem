//登记申请 组件

import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, DatePicker, Select } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

const info: { one: InputInfo; two?: InputInfo; three?: InputInfo } = {
  one: {
    name: 'one',
    message: '请输入外出成员学号!',
    placeHodel: '请输入外出成员学号',
  },
  two: {
    name: 'two',
    message: '请输入外出成员学号来获取姓名!',
    disabled: true,
  },
  three: {
    name: 'three',
    message: '请输入外出成员学号来获取学院',
    disabled: true,
  },
};

const info2: { one: InputInfo; two?: InputInfo; three?: InputInfo } = {
  one: {
    name: 'one',
    message: '请输入外出负责人姓名!',
    placeHodel: '请输入外出负责人姓名',
  },
  two: {
    name: 'two',
    message: '请输入外出负责人手机号!',
    placeHodel: '请输入外出负责人手机号',
  },
};

const FormItem = Form.Item;
const { TextArea } = Input;

const Outregistrationform: React.FC<{}> = () => {
  // 倒计时按钮是否可用
  const [canUse, setCanUse] = useState<boolean>(true);
  // 倒计时时间倒数
  const [count, setCount] = useState<number>(1);

  const handleFinish = (e: any) => {
    message.success('ok');
    console.log(e);
  };

  // 选择审批老师电话 value = e.target.value

  // 倒计时递归方法
  const countDown = () => {
    setCanUse(false);
    setCount(60);
  };

  // 倒计时的设置
  useEffect(() => {
    if (count > 1) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      setCanUse(true);
    }
  }, [count]);
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const teacherValue = [
    { name: '名字1', phone: '11011211911' },
    { name: '名字2', phone: '11011211119' },
  ];

  return (
    <Form
      onFinish={handleFinish}
      style={{ paddingTop: '12px' }}
      layout={'horizontal'}
      autoComplete={'off'}
      hideRequiredMark
    >
      <FormItem {...formItemLayout} label={'申请人'} name={'apply-name'}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'社团名称'} name={'association-name'} initialValue={''}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'社团类别'} name={'class'} initialValue={''}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'指导单位'} name={'department'} initialValue={''}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'离/返校时间'} name={'time'} initialValue={''}>
        <RangePicker showTime />
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={'外出事由'}
        name={'cause'}
        rules={[
          {
            required: true,
            message: '请输入外出事由!',
          },
        ]}
      >
        <TextArea showCount maxLength={100} rows={6} placeholder={'请输入外出事由'} />
      </FormItem>
      <FormItem {...formItemLayout} label={'外出地点'} name={'time'} initialValue={''}>
        <Input />
      </FormItem>
      <FormItem {...formItemLayout} label={'外出负责人'} name={'student-member'}>
        <FormListCom
          inputTwo
          inputList={[]}
          info={info2}
          onFinish={() => {
            console.log('e');
          }}
        />
      </FormItem>
      <FormItem {...formItemLayout} label={'外出成员'} name={'student-member'}>
        <FormListCom
          inputTwo
          inputThree
          inputList={[]}
          info={info}
          onFinish={() => {
            console.log('e');
          }}
        />
      </FormItem>
      <Form.Item {...formItemLayout} name={'pickTeacher'} label={'指导老师审批'}>
        <Input.Group compact>
          <Select style={{ width: '25%' }} placeholder={'请选择'}>
            {teacherValue.map((item: any, index: number) => (
              <Option value={item.phone} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          <Button
            style={{ width: '25%' }}
            onClick={countDown}
            disabled={canUse ? false : true}
            type={canUse ? 'primary' : 'default'}
          >
            {canUse ? '点击获取' : `${count}秒后重试`}
          </Button>
        </Input.Group>
      </Form.Item>
      <Form.Item {...formItemLayout} name={'pickDepartment'} label={'指导部门审批'}>
        <Input.Group compact>
          <Select style={{ width: '25%' }} placeholder={'请选择'}>
            {teacherValue.map((item: any, index: number) => (
              <Option value={item.phone} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          <Button
            style={{ width: '25%' }}
            onClick={countDown}
            disabled={canUse ? false : true}
            type={canUse ? 'primary' : 'default'}
          >
            {canUse ? '点击获取' : `${count}秒后重试`}
          </Button>
        </Input.Group>
      </Form.Item>

      <Form.Item {...submitFormLayout}>
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Outregistrationform;