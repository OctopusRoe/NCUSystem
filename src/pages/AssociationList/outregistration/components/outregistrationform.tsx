//外出登记 组件

import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, DatePicker, Select } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';
import { connect, Dispatch } from 'umi';

interface OutregistrationformProps {
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  leaderValueList: any
  memberValueList: any
  dispatch: Dispatch
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

const memberInfo: { one: InputInfo; two?: InputInfo; three?: InputInfo } = {
  one: {
    message: '请输入外出成员学号!',
    placeHodel: '请输入外出成员学号',
  },
  two: {
    message: '请输入外出成员学号来获取姓名!',
    disabled: true,
  },
  three: {
    message: '请输入外出成员学号来获取学院',
    disabled: true,
  },
};

const leaderInfo: { one: InputInfo; two?: InputInfo; three?: InputInfo } = {
  one: {
    message: '请输入外出负责人姓名!',
    placeHodel: '请输入外出负责人姓名',
  },
  two: {
    message: '请输入外出负责人手机号!',
    placeHodel: '请输入外出负责人手机号',
  },
};

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const teacherValue = [
  { name: '名字1', phone: '11011211911' },
  { name: '名字2', phone: '11011211119' },
]

const Outregistrationform: React.FC<OutregistrationformProps> = (props) => {

  const { canTeacherUse, teacherCount, canDepartmentUse, departmentCount, leaderValueList, memberValueList, dispatch } = props

  const [ count, setCount ] = useState<any>(0)

  const handleFinish = (e: any) => {
    message.success('ok');
    console.log(e);
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    dispatch({
      type: 'association-outregistration/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    dispatch({
      type: 'association-outregistration/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'association-outregistration/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'association-outregistration/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'association-outregistration/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'association-outregistration/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  const memberOnBlur = (e: string, i: number) => {
    dispatch({
      type: 'association-outregistration/setMemberValueList',
      payload: [i, e]
    })

    setCount(e)
  }

  const memberRemove = (i: number) => {
    dispatch({
      type: 'association-outregistration/rmMemberValueList',
      payload: i
    })
  }

  // 手动控制刷新
  useEffect(()=>{}, [count])

  // 退出组件清除成员列表
  useEffect(()=>{
    return function () {
      dispatch({
        type: 'association-outregistration/cleanAll',
        payload: []
      })
    }
  },[])

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
      <FormItem {...formItemLayout} label={'外出负责人'}>
        <FormListCom
          info={leaderInfo}
          formListName={'leaderName'}
          showInput={{two: true, three: false}}
          valueList={leaderValueList}
        />
      </FormItem>
      <FormItem {...formItemLayout} label={'外出成员'}>
        <FormListCom
          info={memberInfo}
          formListName={'memberName'}
          showInput={{two: true, three: true}}
          valueList={memberValueList}
          onBlurFun={memberOnBlur}
          removeFun={memberRemove}
        />
      </FormItem>
      <Form.Item
          {...formItemLayout}
          name={'pickTeacher'}
          label={'指导老师审批'}
          
        >
          <Input.Group compact>
            <Select
              style={{width: '25%'}}
              placeholder={'请选择'}
            >
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>{item.name}</Option>
                ))
              }
            </Select>
            <Input style={{ width: '50%', borderRight: 'none'}} placeholder={'请输入手机验证码'} />
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
        <Form.Item
          {...formItemLayout}
          name={'pickDepartment'}
          label={'指导部门审批'}
          
        >
          <Input.Group compact>
            <Select
              style={{width: '25%'}}
              placeholder={'请选择'}
            >
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>{item.name}</Option>
                ))
              }
            </Select>
            <Input style={{ width: '50%', borderRight: 'none'}} placeholder={'请输入手机验证码'} />
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

      <Form.Item {...submitFormLayout}>
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(
  (state: any)=>{
    return {
      canTeacherUse: state['association-outregistration'].canTeacherUse,
      teacherCount: state['association-outregistration'].teacherCount,
      canDepartmentUse: state['association-outregistration'].canDepartmentUse,
      departmentCount: state['association-outregistration'].departmentCount,
      leaderValueList: state['association-outregistration'].leaderValueList,
      memberValueList: state['association-outregistration'].memberValueList
    }
  }
)(Outregistrationform);
