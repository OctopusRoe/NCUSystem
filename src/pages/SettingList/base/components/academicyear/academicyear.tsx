// 学年设置 组件

import React from 'react'

import { Form, Input, Button, DatePicker, Select } from 'antd'
import { useIntl} from 'umi';

const FormItem = Form.Item
const { RangePicker } = DatePicker
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

const AcademicYear: React.FC<{}> = (props) => {

  const intl = useIntl()

  const onFinish = (e: any) => {
    console.log(e)
  }
  return (
    <>
      <Form
        onFinish={onFinish}
        layout={"horizontal"}
        hideRequiredMark
      >
        <FormItem
          {...formItemLayout}
          name={"academicfull"}
          label={intl.formatMessage({id: "setting.academicyear.academicfull"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({id: "setting.academicyear.academicfull-message"})
            }
          ]}
        >
          <Input autoComplete={'off'} placeholder={intl.formatMessage({id: "setting.academicyear.academicfull-placehoder"})} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={"academicsyssimple"}
          label={intl.formatMessage({id: "setting.academicyear.academicsyssimple"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({id: "setting.academicyear.academicsyssimple-message"})
            }
          ]}
        >
          <Input placeholder={intl.formatMessage({id: "setting.academicyear.academicsyssimple-placehoder"})} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={"academictime"}
          label={intl.formatMessage({id: "setting.academicyear.academictime"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({id: "setting.academicyear.academictime-message"})
            }
          ]}
        >
          <RangePicker picker="year" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={"defaultyear"}
          label={intl.formatMessage({id: "setting.academicyear.defaultyear"})}
          rules={[
            {
              required: true,
              message: intl.formatMessage({id: "setting.academicyear.defaultyear-message"})
            }
          ]}
        >
          <Select defaultValue="是" style={{ width: 120 }}>
            <Option value="是">是</Option>
            <Option value="否">否</Option>
          </Select>
        </FormItem>
        <FormItem
          {...submitFormLayout}
        >
          <Button htmlType={'submit'} type="primary">
            {intl.formatMessage({id: "setting.academicyear.update"})}
          </Button>
        </FormItem>
      </Form>
    </>
  )
}

export default AcademicYear