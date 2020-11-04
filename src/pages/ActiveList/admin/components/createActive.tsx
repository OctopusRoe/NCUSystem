// 发布新活动 组件

import React from 'react'

import { Drawer, Form, Input, Select, DatePicker, Button, Space } from 'antd'

import CroplmgView from '@/components/CropImgview'

interface CreateActiveProps {
  visible: boolean
  typeList: string[]
  onClose: () => void
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

const CreateActive: React.FC<CreateActiveProps> = (props) => {
  
  const { visible, typeList, onClose } = props
  
  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Drawer
      title={'发布活动'}
      visible={visible}
      onClose={onClose}
      width={800}
      bodyStyle={{paddingBottom: '0px'}}
      footer={
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '25px'}}>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={()=>document.getElementById('create-active-form-button')?.click()} type={'primary'}>提交</Button>
          </Space>
        </div>
      }
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
            {
              typeList.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
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
          <Input.TextArea placeholder={'请输入活动详情'} maxLength={400} rows={10} showCount />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'image'}
          label={'活动海报'}
          style={{margin: '0'}}
          extra={
            <p>请上传1200px * 500px像素图片</p>
          }
        >
          <CroplmgView id={'create-active-form-img'} />
        </FormItem>
        <FormItem style={{display:'none'}}>
          <Button id={'create-active-form-button'} htmlType={'submit'} />
        </FormItem>
        
      </Form>
    </Drawer>
  )
}

export default CreateActive