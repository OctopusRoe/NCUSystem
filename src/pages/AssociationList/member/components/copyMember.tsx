// 复制成员 组件

import React, { useState, useEffect, useRef} from 'react'

import { Form, Select, Modal, Button } from 'antd'

interface CopyMemberProps {
  copyVisible: boolean
  selectList: any[]
  onCancel: () => void
  copyList: any[]
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

const { Option } = Select

const CopyMember:React.FC<CopyMemberProps> = (props) => {

  const { copyVisible, copyList, selectList, onCancel } = props

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Modal
      destroyOnClose
      title="复制成员"
      visible={copyVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
    >
      <Form
        onFinish={onFinish}
        autoComplete={'off'}
        hideRequiredMark
      >
        <Form.Item
          {...formItemLayout}
          name={'time'}
          label={'届数'}
          rules={[
            {
              required: true,
              message: '请选择届数'
            }
          ]}
        >
          <Select placeholder={'请选择届数'}>
            {
              selectList.map((item: string, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item noStyle style={{display: 'none'}}>
          <Button ref={button} htmlType={'submit'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CopyMember