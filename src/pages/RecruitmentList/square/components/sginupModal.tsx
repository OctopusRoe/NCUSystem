// 报名modal 组件

import React from 'react'
import { Modal, Form, Space, Button, Tag } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

interface SginUpModalProps {
  visible: boolean
  onCancel: () => void
}

const FormItem = Form.Item

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
    sm: { span: 12, offset: 9 },
  },
};

const SginUpModal: React.FC<SginUpModalProps> = (props) => {

  const { visible, onCancel } = props

  return (
    <>
      <Modal
        title={'社团招新信息'}
        footer={null}
        visible={visible}
        onCancel={onCancel}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label={'部门'}
          >
            {}测试部门
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'职务'}
          >
            {}测试职务
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'招新要求'}
          >
            {}招新要求招新要求招新要求招新要求招新要求招新要求招新要求
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'招新数'}
          >
            {}3
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'报名数'}
          >
            {}3
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'报名状态'}
          >
            <Tag icon={<CheckCircleOutlined />} color="success">
              已报名
            </Tag>
          </FormItem>
          <FormItem
            {...submitFormLayout}
          >
            <Space>
              <Button type={'primary'}>报名</Button>
              <Button>撤销</Button>
            </Space>
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default SginUpModal