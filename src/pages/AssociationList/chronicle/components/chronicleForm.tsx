// 时间轴的抽屉表单 组件

import React from 'react'

import { Form, Input, Upload, Button, DatePicker } from 'antd'

interface ChronicleFormProps {

}

const FormItem = Form.Item
const { TextArea } = Input

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

const ChronicleForm: React.FC<ChronicleFormProps> = (props) => {

  return (
    <Form
      autoComplete={'off'}
      hideRequiredMark
    >
      <FormItem
        {...formItemLayout}
        name={'title'}
        label={'标题'}
      >
        <Input />
      </FormItem>
      <FormItem
        {...formItemLayout}
        name={'content'}
        label={'内容'}
      >
        <TextArea />
      </FormItem>
      <FormItem
        {...formItemLayout}
        name={'time'}
        label={'时间'}
      >
        <DatePicker showTime style={{width: '100%'}} format={'YYYY-MM-DD HH:mm:ss'} />
      </FormItem>
      <FormItem>
        <Upload />
      </FormItem>
      <FormItem
        {...submitFormLayout}
      >
        <Button type={'primary'} size={'large'} htmlType={'submit'}>提交</Button>
      </FormItem>
    </Form>

  )
}

export default ChronicleForm