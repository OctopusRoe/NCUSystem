// 社团升级页面

import { Button, Card, Input, Form, Select, Upload, Table } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Success from './components/success';
import Fail from './components/fail';

import { ConnectState } from '@/models/connect'

import { UpgradeState } from './data'
import { fromPairs } from 'lodash';

const FormItem = Form.Item;

const { Option } = Select;

interface UpgradeProps {
  submitting: boolean;
  dispatch: Dispatch;
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
}

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

const Upgrade: FC<UpgradeProps> = (props) => {

  const [form] = Form.useForm()

  const { canTeacherUse, teacherCount, canDepartmentUse, departmentCount, dispatch } = props

  const [, setShowPublicUsers] = React.useState(false);

  // 保存指导老师电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  // 保存指导部门电话
  const [ getDepartmentPhone, setGetDepartmentPhone ] = useState<string>('')

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacherPhone(e)
  }

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartmentPhone(e)
  }

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacherPhone === '') {
      return
    }
    dispatch({
      type: 'association-upgrade/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartmentPhone === '') {
      return
    }
    dispatch({
      type: 'association-upgrade/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'association-upgrade/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'association-upgrade/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'association-upgrade/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'association-upgrade/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

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
        <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'teacherPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导老师!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'teacherCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
          <Button
            style={{width: '25%'}}
            onClick={teacherCountDown}
            disabled={canTeacherUse ? false : true}
            type={canTeacherUse ? 'primary' : 'default'}
          >
            {canTeacherUse ? '点击获取' : `${teacherCount}秒后重试`}
          </Button>
        </Input.Group>
      </Form.Item>
      <Form.Item  {...formItemLayout} label={'指导部门审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'departmentPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导部门!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'departmentCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
          <Button
            style={{width: '25%'}}
            onClick={departmentCountDown}
            disabled={canDepartmentUse ? false : true}
            type={canDepartmentUse ? 'primary' : 'default'}
          >
            {canDepartmentUse ? '点击获取' : `${departmentCount}秒后重试`}
          </Button>
        </Input.Group>
      </Form.Item>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" size={'large'}>
            提交
          </Button>
        </FormItem>
      </Form>
      <Success />
      <Fail />
    </Card>
  );
};

export default connect(
  ({associationUpgrade, global}: {associationUpgrade: UpgradeState, global: ConnectState})=>{
    return {
      canTeacherUse: associationUpgrade.canTeacherUse,
      teacherCount: associationUpgrade.teacherCount,
      canDepartmentUse: associationUpgrade.canDepartmentUse,
      departmentCount: associationUpgrade.departmentCount
    }
  }
)(Upgrade);
