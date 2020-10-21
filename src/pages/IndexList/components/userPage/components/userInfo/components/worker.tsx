// 教工的个人资料组件

import React from 'react'

import { Form, Input, Select } from 'antd'

import UploadView from '@/components/UploadView/uploadView'

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

const WorkerInfo: React.FC<{}> = (props) => {

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
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input />
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
        >
          <Select>

          </Select>
        </FormItem>
      </Form>
    </>
  )
}

export default WorkerInfo