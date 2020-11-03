// 发布新活动 组件

import React from 'react'

import { Modal, Form, Input, Select, DatePicker, Button } from 'antd'

interface CreateActiveProps {
  visible: boolean
  onCancel: () => void
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
    md: { span: 12 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

const CreateActive: React.FC<CreateActiveProps> = (props) => {
  
  const { visible, onCancel } = props
  
  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Modal
      title={'发布活动'}
      visible={visible}
      onCancel={onCancel}
      width={800}
      onOk={()=>document.getElementById('create-active-form-button')?.click}
    >
      <Form
        autoComplete={'off'}
        hideRequiredMark
        onFinish={onFinish}
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
            <Option value={'类型1'}>类型1</Option>
            <Option value={'类型2'}>类型2</Option>
            <Option value={'类型3'}>类型3</Option>
            <Option value={'类型4'}>类型4</Option>
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
          <Input placeholder={'请输入主办单位名称'} />
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
          <Input placeholder={'请输入承办单位名称'} />
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
          <RangePicker showTime />
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
          label={'活动规模'}
          rules={[
            {
              required: true,
              message: '请输入活动规模!'
            }
          ]}
        >
          <Input placeholder={'请输入活动规模'} />
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
          <Input.TextArea placeholder={'请输入活动详情'} maxLength={500} rows={10} showCount />
        </FormItem>
        <FormItem style={{display:'none'}}>
          <Button id={'create-active-form-button'} htmlType={'submit'} />
        </FormItem>
        
      </Form>
    </Modal>
  )
}

export default CreateActive