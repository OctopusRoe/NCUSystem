// 活动修改 抽屉组件

import React, { useRef } from 'react'

import { Drawer, Form, Input, Select, DatePicker, Button, Space } from 'antd'
import { values } from 'lodash'

interface modifyDrawerProps {
  visible: boolean
  typeList: string[]
  onClose: () => void
  value: {
    name?: string,
    type?: string,
    sponsor?: string,
    organizer?: string,
    time?: any,
    place?: string,
    scale?: string,
    info?: string
  }
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

const modifyDrawer: React.FC<modifyDrawerProps> = (props) => {
  
  const { visible, value, typeList, onClose } = props
  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    console.log(e)
    console.log(e.time[0].format('YYYY-MM-DD h:mm:ss'))
  }

  return (
    <Drawer
      destroyOnClose
      visible={visible}
      title={'修改申请'}
      onClose={onClose}
      width={800}
      bodyStyle={{paddingBottom: '0px'}}
      footer={
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '25px'}}>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type={'primary'} onClick={()=> button.current?.click()}>提交</Button>
          </Space>
        </div>
      }
    >
      <Form
        autoComplete={'off'}
        hideRequiredMark
        onFinish={onFinish}
        initialValues={value}
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

        <FormItem style={{display:'none'}}>
          <Button ref={button} htmlType={'submit'} />
        </FormItem>
        
      </Form>
    </Drawer>
  )
}

export default modifyDrawer