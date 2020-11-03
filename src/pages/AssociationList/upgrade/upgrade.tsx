// 社团升级页面

import { Button, Card, Input, Form, Radio, Select, Upload, Table } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Success from './components/Result/success';
import Fail from './components/Result/fail';

const FormItem = Form.Item;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch;
}

const Upgrade: FC<BasicFormProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [RadioVisible, setRadioVisible] = useState(false);
  const [, setShowPublicUsers] = React.useState(false);
  // 倒计时按钮是否可用
  const [canUse, setCanUse] = useState<boolean>(true);
  // 倒计时时间倒数
  const [count, setCount] = useState<number>(1);
  // 保存审批电话
  const [] = useState<string>('');

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
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  // 倒计时递归方法
  const countDown = () => {
    setCanUse(false);
    setCount(60);
  };

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
  const columns = [
    {
      title: '年审时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '年审结果',
      dataIndex: 'result',
      key: 'result',
    },
  ];

  const teacherValue= [
    { name: '名字1', phone: '11011211911' },
    { name: '名字2', phone: '11011211119' },
  ];

  return (
    <Card>
      <Form
        hideRequiredMark
        style={{ paddingTop: '12px' }}
        form={form}
        name="apply"
        initialValues={{ public: '1' }}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <FormItem {...formItemLayout} label={'申请人：'} name="name">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'社团名称：'} name="name">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'社团类别'} name="date">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'社团级别'} name="goal">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'指导单位：'} name="name">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'社团成员数：'} name="name">
          <Input disabled />
          {/* <Input style={{ width: '144px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} /> */}
        </FormItem>
        <FormItem {...formItemLayout} label={'成立年份：'} name="name">
          <Input disabled />
        </FormItem>
        <FormItem {...formItemLayout} label={'年审情况：'} name="name">
          <Table columns={columns} bordered size="small" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'材料上传（精品项目）：'}
          name="name"
          rules={[
            {
              required: true,
              message: '请上传材料',
            },
          ]}
        >
          <Upload showUploadList={false} fileList={[]}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </FormItem>
        <Form.Item  {...formItemLayout} name={'pickTeacher'} label={'指导老师审批'}>
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
        <Form.Item  {...formItemLayout} name={'pickDepartment'} label={'指导部门审批'}>
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
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
          <Button style={{ marginLeft: 8 }}>取消</Button>
        </FormItem>
      </Form>
      <Success />
      <Fail />
    </Card>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(Upgrade);
