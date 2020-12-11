// 选择审批人组件

import React, { useRef, useState } from 'react'

import { Drawer, Select, Space, Button, Form } from 'antd'

interface SelectViewProps {
  visible: boolean
  valueList: {
    teacher: any[],
    department?: any[],
    college?: any[]
  }
  onClose: () => void
}

const {Option} = Select
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

const SelectView: React.FC<SelectViewProps> = (props) => {
  
  const {visible, valueList, onClose} = props

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Drawer
      destroyOnClose
      visible={visible}
      title={'审批'}
      onClose={onClose}
      width={600}
      bodyStyle={{paddingBottom: '0px'}}
      footer={
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '25px'}}>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type={'primary'} onClick={()=> button.current?.click()} >提交</Button>
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
          name={'teacher'}
          label={'指导老师'}
        >
          <Select
            showSearch
            placeholder={'请选择指导老师'}
          >
            {
              valueList.teacher && valueList.teacher.map((item: any) => (
                <Option value={item.name} key={item.name}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'teacher'}
          label={'指导部门'}
        >
          <Select
            showSearch
            placeholder={'请选择指导部门'}
          >
            {
              valueList.teacher && valueList.teacher.map((item: any) => (
                <Option value={item.name} key={item.name}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'teacher'}
          label={'部门领导'}
        >
          <Select
            showSearch
            placeholder={'请选择指导'}
          >
            {
              valueList.teacher && valueList.teacher.map((item: any) => (
                <Option value={item.name} key={item.name}>{item.name}</Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem style={{display: 'none'}}>
          <Button type={'primary'} htmlType={'submit'} ref={button}>提交</Button>
        </FormItem>
      </Form>
    </Drawer>
  )
}

export default SelectView