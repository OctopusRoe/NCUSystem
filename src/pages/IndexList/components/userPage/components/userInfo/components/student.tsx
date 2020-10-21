// 学生的个人资料组件

import React from 'react'

import { Form, Input, Select, DatePicker, Button } from 'antd'

import UploadView from '@/components/UploadView/uploadView'
import CropImgView from '@/components/CropImgview'

export interface Student {
  nation: string[]
  birthPlace: string[]
  college: string[]
  className: string[]
  specialty: string[]
  educational: string[]
}

export interface StudentInfoProps {
  info: Student
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

  const { info } = props
  const { nation, birthPlace , college, className, specialty, educational } = info

  const onFinish = () => {

  }

  return (
    <>
      <Form
        layout={"horizontal"}
        onFinish={onFinish}
        autoComplete={'off'}
      >
        <FormItem
          {...formItemLayout}
          label={'姓名'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'学号'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'性别'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'身份证'}
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
          <UploadView id="userInfo-Photo" />
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
              nation.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'birthPlace'}
          label={'籍贯'}
          rules={[
            {
              required: true,
              message: '请选择籍贯!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              birthPlace.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
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
          name={'educational'}
          label={'学制'}
          rules={[
            {
              required: true,
              message: '请选择学制!'
            }
          ]}
        >
          <Select
            showSearch
            placeholder={'请选择'}
          >
            {
              educational.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
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
          <DatePicker picker="month" />
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
              message: '政治面貌!'
            }
          ]}
        >
          <Input placeholder={'政治面貌'} />
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
          <Button type={'primary'} size={'large'}>保存</Button>
        </FormItem>
      </Form>
    </>
  )
}

export default StudentInfo