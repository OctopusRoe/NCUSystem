//外出登记 组件

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';
import { connect, Dispatch } from 'umi';

import WaitView from '@/components/waitView'
import { GlobalModelState } from '@/models/global'

import { OutregistrationFormState } from '../data'

import PlaceView from '@/components/placeView/placeView'

interface OutregistrationformProps {
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  leaderValueList: any
  memberValueList: any
  baseInfo: any
  association: any
  reload: number
  count: string
  tGUID: string
  dGUID: string
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

const Outregistrationform: React.FC<OutregistrationformProps> = (props) => {

  const {
    canTeacherUse,
    teacherCount,
    canDepartmentUse,
    departmentCount,
    leaderValueList,
    memberValueList,
    baseInfo,
    association,
    reload,
    tGUID,
    dGUID,
    dispatch
  } = props

  const form = {
    'apply-name': baseInfo?.name,
    'association-name': association?.nameZh,
    'association-type': association?.categoryName,
    guidanceUnitName: association?.guidanceUnitName
  }

  if (reload === 0) {
    return <WaitView />
  }

  // 保存指导老师电话
  const [ getTeacher, setGetTeacher ] = useState<string>('')

  // 保存指导部门电话
  const [ getDepartment, setGetDepartment ] = useState<string>('')

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacher(e)
  }

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartment(e)
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacher === '') {
      return
    }
    dispatch({
      type: 'outregistrationForm/setTeacherCount',
      payload: [60, false]
    })

    dispatch({
      type: 'outregistrationForm/getTeacherCode',
      payload: getTeacher
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartment === '') {
      return
    }
    dispatch({
      type: 'outregistrationForm/setDepartmentCount',
      payload: [60, false]
    })

    dispatch({
      type: 'outregistrationForm/getDepartmentCode',
      payload: getDepartment
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'outregistrationForm/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'outregistrationForm/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'outregistrationForm/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'outregistrationForm/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  const memberOnBlur = (e: string, i: number) => {

    if (e === '') {
      return
    }
    dispatch({
      type: 'outregistrationForm/getStudentName',
      payload: [i, e]
    })

  }

  // 移除成员
  const memberRemove = (i: number) => {
    dispatch({
      type: 'outregistrationForm/rmMemberValueList',
      payload: i
    })
  }

  // 表单数据获取
  const onFinish = (e: any) => {

    const form = new FormData()
    form.append('PersonId', baseInfo.personId)
    form.append('StartDate', e.time[0].format('YYYY-MM-DD hh:mm:ss'))
    form.append('EndDate', e.time[1].format('YYYY-MM-DD hh:mm:ss'))
    form.append('Reason', e.cause)
    form.append('Place', `${e.province},${e.city},${e.region},${e.stree}`)
    form.append('Responsible', e.leaderName.map((item: any) => `${item.one}-${item.two}`))
    form.append('Member', e.memberName.map((item: any) => item.one))
    form.append('TeacherPersonId', e.teacher)
    form.append('TeacherGuid', tGUID)
    form.append('TeacherCode', e.teacherCode)
    form.append('DepartmentId', e.department)
    form.append('DepartmentGuid', dGUID)
    form.append('DepartmentCode', e.departmentCode)

    const data = {
      form: form,
      tGUID: tGUID,
      teacherCode: e.teacherCode,
      dGUID: dGUID,
      departmentCode: e.departmentCode
    }

    dispatch({
      type: 'outregistrationForm/validationCode',
      payload: data
    })
  }

  // 退出组件清除成员列表
  useEffect(()=>{
    return function () {
      dispatch({
        type: 'outregistrationForm/cleanAll',
        payload: []
      })
    }
  },[])

  return (
    <Form
      onFinish={onFinish}
      style={{ paddingTop: '12px' }}
      layout={'horizontal'}
      autoComplete={'off'}
      hideRequiredMark
      initialValues={form}
    >
      <FormItem {...formItemLayout} label={'申请人'} name={'apply-name'} >
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'社团名称'} name={'association-name'}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'社团类别'} name={'association-type'}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'指导单位'} name={'guidanceUnitName'}>
        <Input disabled />
      </FormItem>
      <FormItem {...formItemLayout} label={'离/返校时间'} name={'time'}>
        <RangePicker showTime style={{width: '100%'}} />
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
      <FormItem
        {...formItemLayout}
        label={'外出地点'}
        style={{marginBottom: '0px'}}
      >
        <PlaceView />
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
      <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'teacher'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导老师!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
              {
                association !== null && association.instructorInfo.map((item: any, index: number) => (
                  <Option value={item.personId} key={item.personId}>
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
            name={'department'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导部门!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
              {
                association !== null && association.instructorInfo.map((item: any, index: number) => (
                  <Option value={item.personId} key={item.personId}>
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

      <Form.Item {...submitFormLayout}>
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(
  ({outregistrationForm, global}: {outregistrationForm: OutregistrationFormState, global: GlobalModelState})=>{
    return {
      canTeacherUse: outregistrationForm.canTeacherUse,
      teacherCount: outregistrationForm.teacherCount,
      canDepartmentUse: outregistrationForm.canDepartmentUse,
      departmentCount: outregistrationForm.departmentCount,
      leaderValueList: outregistrationForm.leaderValueList,
      memberValueList: outregistrationForm.memberValueList,
      count: outregistrationForm.count,
      tGUID: outregistrationForm.tGUID,
      dGUID: outregistrationForm.dGUID,
      baseInfo: global.baseInfo,
      association: global.association,
      reload: global.reload
    }
  }
)(Outregistrationform);
