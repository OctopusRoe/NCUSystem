// 社团注销页面

import React,{ useState, useEffect } from 'react';

import { Card, Form, Input, message, Button, Select } from 'antd'
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
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  reload: number
  count: string
  tGUID: string
  dGUID: string
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
    canTeacherUse,
    teacherCount,
    canDepartmentUse,
    departmentCount,
    baseInfo,
    association,
    reload,
    valueList,
    tGUID,
    dGUID,
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
      type: 'deleteModel/setTeacherCount',
      payload: [60, false]
    })

    dispatch({
      type: 'deleteModel/getTeacherCode',
      payload: getTeacher
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartment === '') {
      return
    }
    dispatch({
      type: 'deleteModel/setDepartmentCount',
      payload: [60, false]
    })

    dispatch({
      type: 'deleteModel/getDepartmentCode',
      payload: getDepartment
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'deleteModel/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'deleteModel/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'deleteModel/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'deleteModel/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

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

  // 控制页面刷新
  // useEffect(() => {
  // },[count])

  // 表单数据获取
  const onFinish = (e:any) => {

    const form = new FormData()
    form.append('CommunityId', association.id)
    form.append('PersonId', baseInfo.personId)
    form.append('Reason', e.cause)
    form.append('Member', e['student-member-list'].map((item:any) => item.one))
    form.append('TeacherPersonId', e.teacher)
    form.append('TeacherGuid', tGUID)
    form.append('TeacherCode', e.teacherCode)
    form.append('DepartmentId', e.departmentPerson)
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
              name={'departmentPerson'}
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
      canTeacherUse: deleteModel.canTeacherUse,
      teacherCount: deleteModel.teacherCount,
      canDepartmentUse: deleteModel.canDepartmentUse,
      departmentCount: deleteModel.departmentCount,
      valueList: deleteModel.valueList,
      count: deleteModel.count,
      reload: global.reload,
      baseInfo: global.baseInfo,
      association: global.association,
      tGUID: deleteModel.tGUID,
      dGUID: deleteModel.dGUID,
    }
  }
)(Delete);
