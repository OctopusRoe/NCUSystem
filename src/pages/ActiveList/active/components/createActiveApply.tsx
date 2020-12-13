// 申请活动 组件

import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button, Tooltip } from 'antd'

import { QuestionCircleOutlined } from '@ant-design/icons'

import CropImgView from '@/components/CropImgview'
import { connect, Dispatch } from 'umi'

import { CreateActiveState } from '../model'

interface CreateActiveApplyProps {
  dispatch: Dispatch
  typeList: string[]
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  teacherValue: {name: string, phone: string}[]
}

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 }
  }
}

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

// Option render function
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0}>未查询到数据</Option>
  }

  return list.map((item: string, index: number) => (
    <Option value={item} key={item}>{item}</Option>
  ))

}

const CreateActiveApply: React.FC<CreateActiveApplyProps> = (props) => {

  const { canTeacherUse, teacherCount, canDepartmentUse, departmentCount, typeList, dispatch } = props

  const [visible, setVisible] = useState<boolean>(false)

  const { teacherValue } = props

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

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacherPhone === '') {
      return
    }
    dispatch({
      type: 'createActive/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartmentPhone === '') {
      return
    }
    dispatch({
      type: 'createActive/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'createActive/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'createActive/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'createActive/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'createActive/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  const onFinish = (e: any) => {
    setVisible(true)
    console.log(e)
  }

  return (
    <>
      <Form
        autoComplete={'off'}
        hideRequiredMark
        onFinish={onFinish}
        style={{paddingTop: '12px'}}
      >
        <FormItem
          {...formItemLayout}
          name={'name'}
          label={'活动名称'}
          rules={[
            {
              required: true,
              message: '请输入活动名称!'
            }
          ]}
        >
          <Input placeholder={'请输入活动名称'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'type'}
          label={'活动类型'}
          rules={[
            {
              required: true,
              message: '请选择活动类型!'
            }
          ]}
        >
          <Select placeholder={'请选择'}>
            {getOption(typeList)}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'sponsor'}
          label={'主办单位'}
          rules={[
            {
              required: true,
              message: '请输入主办单位名称!'
            }
          ]}
        >
          <Select showSearch placeholder={'请选择'}>
            {getOption(typeList)}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'organizer'}
          label={'承办单位'}
          rules={[
            {
              required: true,
              message: '请输入承办单位名称!'
            }
          ]}
        >
          <Select showSearch placeholder={'请选择'}>
            {getOption(typeList)}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'time'}
          label={'活动时间'}
          rules={[
            {
              required: true,
              message: '请选择活动时间!'
            }
          ]}
        >
          <RangePicker showTime style={{width: '100%'}} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'place'}
          label={'活动地点'}
          rules={[
            {
              required: true,
              message: '请输入活动地点!'
            }
          ]}
        >
          <Input placeholder={'请输入活动地点'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'scale'}
          label={
            <span>
              社团成员数
            <span style={{ color: '#00000073' }}>（最高）
              <Tooltip title='超过最高数后无法加入新成员'>
                <QuestionCircleOutlined style={{ marginRight: 4 }} />
              </Tooltip>
              &nbsp;</span>
            </span>
          }
          rules={[{ required: true, message: '请输入成员数量' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{color: '#bfbfbf'}}>人</div>} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'info'}
          label={'活动详情'}
          rules={[
            {
              required: true,
              message: '请输入活动详情!'
            }
          ]}
        >
          <Input.TextArea placeholder={'请输入活动详情'} maxLength={400} rows={10} showCount />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'image'}
          label={'活动海报'}
          style={{margin: '0'}}
          extra={
            <p>请上传1200px * 500px像素图片</p>
          }
        >
          <CropImgView id={'create-active-form-img'} />
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
        <FormItem
          {...submitFormLayout}
        >
          <Button htmlType={'submit'} type={'primary'} size={'large'} >保存</Button>
        </FormItem>
      </Form>
    </>
  )
}

export default connect(
  ({createActive}: {createActive: CreateActiveState}) => ({
    typeList: createActive.typeList,
    canTeacherUse: createActive.canTeacherUse,
    canDepartmentUse: createActive.canDepartmentUse,
    teacherCount: createActive.teacherCount,
    departmentCount: createActive.departmentCount,
    teacherValue: createActive.teacherValue
  })
)(CreateActiveApply)