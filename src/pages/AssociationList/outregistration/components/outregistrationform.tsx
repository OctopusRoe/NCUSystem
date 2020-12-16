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
  leaderValueList: any
  memberValueList: any
  baseInfo: any
  association: any
  reload: number
  count: string
  departmentList: any
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

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

const Outregistrationform: React.FC<OutregistrationformProps> = (props) => {

  const {
    leaderValueList,
    memberValueList,
    baseInfo,
    association,
    reload,
    departmentList,
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

  // 指导部门选择改变
  const selectDepartmentChange = (e: number) => {
    // 点击部门后去请求接口，获取老师列表
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
    form.append('DepartmentId', e.department)

    const data = {
      form: form
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
      <FormItem
            {...formItemLayout}
            label={'指导部门'}
            name={'selectDepartment'}
          >
            <Select
              showSearch
              style={{width: '50%'}}
              placeholder={'请选择'}
              onChange={selectDepartmentChange}
            >
              {getOption(departmentList)}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'指导老师'}
            name={'selectTeacher'}
          >
            <Select
              showSearch
              style={{width: '50%'}}
              placeholder={'请选择'}
            >
              {getOption(departmentList)}
            </Select>
          </FormItem>

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
      leaderValueList: outregistrationForm.leaderValueList,
      memberValueList: outregistrationForm.memberValueList,
      count: outregistrationForm.count,
      baseInfo: global.baseInfo,
      association: global.association,
      reload: global.reload,
      departmentList: global.SelectValue.department
    }
  }
)(Outregistrationform);
