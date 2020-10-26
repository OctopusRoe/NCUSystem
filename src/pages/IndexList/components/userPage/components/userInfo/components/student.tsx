// 学生的个人资料组件

import React, { useState } from 'react'

import { Form, Input, Select, DatePicker, Button } from 'antd'

import CropImgView from '@/components/CropImgview'
import GeographicView from '@/components/GeographicView/GeographicView'

const ethnicity = require('@/assets/ethnicity.json')

export interface Student {
  studentName: string
  studentID: string
  studentSex: string
  cardID: string
  educational: string

  nation: string[]
  college: string[]
  className: string[]
  specialty: string[]
}

export interface StudentInfoProps {
  info: Student
  political: string[]
}

const FormItem = Form.Item
const { Option } = Select

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

const StudentInfo: React.FC<StudentInfoProps> = (props) => {
  console.log(ethnicity)

  const { info, political } = props
  const {studentName, studentID, studentSex, cardID, nation , college, className, specialty, educational } = info

  const [ geographicList, setGeographicList ] = useState<string[]>([])

  const [ birthPlaceError, setBirthPlaceError ] = useState<any>('')
  const [ birthPlaceStr, setBirthPlaceStr ] = useState<string|null>(null)

  const onFinish = (e: any) => {
    
    console.log(e)
  }

  const getGeographicValue = (e: any) => {
    setGeographicList(e)
    setBirthPlaceError('')
    setBirthPlaceStr(null)
  }

  const checkOut = () => {
    if (geographicList.length === 0 ) {
      setBirthPlaceError('error')
      setBirthPlaceStr('请选择籍贯!')
    }
  }

  return (
    <>
      <Form
        layout={"horizontal"}
        onFinish={onFinish}
        autoComplete={'off'}
        hideRequiredMark
      >
        <FormItem
          label={'姓名'}
          {...formItemLayout}
          name={'studentName'}
          initialValue={studentName}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={'学号'}
          {...formItemLayout}
          name={'studentID'}
          initialValue={studentID}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={'性别'}
          {...formItemLayout}
          name={'studentSex'}
          initialValue={studentSex}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={'身份证'}
          {...formItemLayout}
          name={'cardID'}
          initialValue={cardID}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'photo'}
          label={'证件照'}
          rules={[
            {
              required: true,
              message: '请上传证件照!'
            }
          ]}
        >
          <CropImgView aspect={1/1.25} id="userInfo-Photo" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'nation'}
          label={'民族'}
          rules={[
            {
              required: true,
              message: '请选择民族!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              ethnicity.data.map((item: any, index: number) => (
                <Option value={item.name} key={index}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'birthPlace'}
          label={'籍贯'}
          validateStatus={birthPlaceError}
          help={birthPlaceStr}
        >
          <GeographicView onFinish={getGeographicValue} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'college'}
          label={'学院'}
          rules={[
            {
              required: true,
              message: '请选择学院!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              college.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'className'}
          label={'班级'}
          rules={[
            {
              required: true,
              message: '请选择班级!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              className.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'specialty'}
          label={'专业'}
          rules={[
            {
              required: true,
              message: '请选择专业!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              specialty.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'学制'}
          name={'educational'}
          initialValue={educational}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'startTime'}
          label={'入学时间'}
          rules={[
            {
              required: true,
              message: '请选择入学时间!'
            }
          ]}
        >
          <DatePicker style={{width: '100%'}} picker="month" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'phone'}
          label={'手机号'}
          rules={[
            {
              required: true,
              message: '请输入手机号!'
            }
          ]}
        >
          <Input placeholder={'请输入手机号'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'QQ'}
          label={'QQ号'}
          rules={[
            {
              required: true,
              message: '请输入QQ!'
            }
          ]}
        >
          <Input placeholder={'请输入QQ'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'political'}
          label={'政治面貌'}
          rules={[
            {
              required: true,
              message: '请选择政治面貌!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              political.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'profile'}
          label={'头像'}
          rules={[
            {
              required: true,
              message: '请上传头像!'
            }
          ]}
        >
          <CropImgView id="userInfo-profile" />
        </FormItem>
        <FormItem
          {...submitFormLayout}
        >
          <Button type={'primary'} size={'large'} htmlType={'submit'} onClick={checkOut}>保存</Button>
        </FormItem>
      </Form>
    </>
  )
}

export default StudentInfo