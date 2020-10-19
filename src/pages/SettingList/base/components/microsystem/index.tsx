// 小程序配置 组件

import React from 'react'

import { Form, Input } from 'antd'
import { connect, FormattedMessage, formatMessage, useIntl} from 'umi';

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

const MicroSystem: React.FC<{}> = (props) => {
  return (
    <>
      <Form
        layout={"horizontal"}
      >
        <Form.Item
          {...formItemLayout}
          name={"microsystem"}
          label={formatMessage({ id: 'setting.basic.microsystem' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'setting.basic.microsystem-message' }, {}),
            },
          ]}
        >
          <Input autoComplete={'off'} placeholder="小程序名称" />
        </Form.Item>
      </Form>
    </>
  )
}

export default MicroSystem