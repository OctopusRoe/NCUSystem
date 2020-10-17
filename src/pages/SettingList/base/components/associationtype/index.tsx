// 社团类型 组件

import React from 'react';
import { Button, Input, Form, message, Modal, Space, FormListFieldData } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { connect, FormattedMessage, formatMessage, useIntl} from 'umi';

import { CurrentUser } from './data.d';
import UploadView from '@/components/UploadView/uploadView'
import styles from './styles.less';

const FormItem = Form.Item

const AssociationType: React.FC<{}> = (props) => {
  const test: any = [{name: 0,key: 0, fieldKey: 0},{name: 1,key: 1, fieldKey: 1},{name: 2,key: 2, fieldKey: 2}]
  const onFinish = (e: any) => {

  }
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="users">
        {(fields: any, { add, remove }) => {
          fields = test | fields
          console.log(fields)
          console.log(add)
          return (
            <div>
              {test.map((field: any)=> (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <FormItem
                    {...field}
                    name={[field.name, 'first']}
                    fieldKey={[field.fieldKey, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </FormItem>
                  <FormItem
                    {...field}
                    name={[field.name, 'last']}
                    fieldKey={[field.fieldKey, 'last']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </FormItem>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </FormItem>
            </div>
          );
        }}
      </Form.List>

      <FormItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  )
}

export default AssociationType