// 社团注销页面

import React,{ useState, useEffect } from 'react';

import { Card, Form, Input, Button, Select } from 'antd'
import { connect, Dispatch } from 'umi';

import { GlobalModelState } from '@/models/global'
import WaitView from '@/components/waitView'
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';

import { DeleteState } from './data'

import Success from './components/success' 
import Fail from './components/fail'

interface DeleteProps {
  dispatch: Dispatch
  baseInfo: any
  association: any
  valueList: any
  reload: number
  count: string
  departmentList: any
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

const { Option } = Select;

const FormItem = Form.Item
const { TextArea } = Input

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

const memberInfo: { one: InputInfo; two?: InputInfo } = {
  one: {
    message: '请输入成员学号!',
    placeHodel: '请输入成员学号',
  },
  two: {
    message: '请输入成员学号来获取姓名!',
    disabled: true,
  }
};

const Delete: React.FC<DeleteProps> = (props) => {

  const {
    baseInfo,
    association,
    reload,
    valueList,
    departmentList,
    dispatch
  } = props

  const form = {
    'apply-name': baseInfo?.name,
    'association-name': association?.nameZh,
    'association-type': association?.categoryName,
    'association-grade': association?.levelName,
    'department': association?.guidanceUnitName,
    'time': association?.setUpDate,
  }

  if (reload === 0) {
    return <WaitView />
  }

  if (association && !association.isResponsible) {
    return <Fail />
  }

  if (association && association.isLogout) {
    return <Success />
  }

  // 失去焦点后访问接口获取学生姓名
  const onBlurFun = async (e: string, i: number) => {

    if (e === '') {
      return
    }
    await dispatch({
      type: 'deleteModel/getStudentName',
      payload: [i, e],
    })
    // setCount(e)
  }

  // 点击移除成员按钮
  const onRemoveFun = (i: number) => {
    dispatch({
      type: 'deleteModel/rmFormValue',
      payload: i
    })
  }

  // 指导部门选择改变
  const selectDepartmentChange = (e: number) => {
    // 点击部门后去请求接口，获取老师列表
  }

  // 表单数据获取
  const onFinish = (e:any) => {

    const form = new FormData()
    form.append('CommunityId', association.id)
    form.append('PersonId', baseInfo.personId)
    form.append('Reason', e.cause)
    form.append('Member', e['student-member-list'].map((item:any) => item.one))
    form.append('TeacherPersonId', e.teacher)
    form.append('DepartmentId', e.departmentPerson)

    const data = {
      form: form
    }

    dispatch({
      type: 'deleteModel/validationCode',
      payload: data
    })

  };

  // 退出组件清除成员列表
  useEffect(()=>{
    return function () {
      dispatch({
        type: 'deleteModel/cleanAll',
        payload: []
      })
    }
  },[])

  if (association && association.isResponsible) {
    return (
      <Card>
        <Form
          onFinish={onFinish}
          style={{paddingTop: '12px'}}
          layout={"horizontal"}
          autoComplete={'off'}
          hideRequiredMark
          initialValues={form}
        >
          <FormItem
            {...formItemLayout}
            label={'申请人'}
            name={'apply-name'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'社团名称'}
            name={'association-name'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'社团类别'}
            name={'association-type'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'社团级别'}
            name={'association-grade'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'指导单位'}
            name={'department'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'成立年份'}
            name={'time'}
          >
            <Input disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'注销原因'}
            name={'cause'}
            rules={[
              {
                required: true,
                message: '请输入注销原因!'
              }
            ]}
          >
            <TextArea showCount maxLength={100} rows={6} placeholder={'请输入注销原因'} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'成员代表'}
          >
            <FormListCom
              info={memberInfo}
              formListName={'student-member-list'}
              showInput={{two: true, three: false}}
              valueList={valueList}
              removeFun={onRemoveFun}
              onBlurFun={onBlurFun}
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
          <Form.Item
            {...submitFormLayout}
          >
            <Button htmlType={'submit'} type={'primary'} size={'large'}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  return <></>
};

export default connect(
  ({deleteModel, global}: {deleteModel: DeleteState, global: GlobalModelState}) => {
    return {
      valueList: deleteModel.valueList,
      count: deleteModel.count,
      reload: global.reload,
      baseInfo: global.baseInfo,
      association: global.association,
      departmentList: global.SelectValue.department
    }
  }
)(Delete);
