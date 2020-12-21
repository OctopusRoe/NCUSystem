// 申请活动 组件

import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import CropImgView from '@/components/CropImgview'
import { connect, Dispatch } from 'umi'
import ApplyView from '@/components/ApplyView'
import { CreateActiveState } from '../model'

interface CreateActiveApplyProps {
  dispatch: Dispatch
  typeList: {}[]
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
    md: { span: 12 }
  }
}

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

// Option render function
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0}>未查询到数据</Option>
  }

  return list.map((item: any) => (
    <Option value={item.id} key={item.id}>{item.value}</Option>
  ))

}

const CreateActiveApply: React.FC<CreateActiveApplyProps> = (props) => {

  const { typeList, dispatch } = props


  const onFinish = (e: any) => {

    const data = {
      Id: '',
      Name: e.name,
      Type: e.Type,
      Sponsor: e.sponsor,
      Organizer: e.organizer,
      Posters: e.image.originFileObj,
      StartTime: e.time[0].format('YYYY-MM-DD hh:mm'),
      EndTime: e.time[1].format('YYYY-MM-DD hh:mm'),
      Place: e.place,
      Detail: e.info,
      Scale: e.scale
    }

    dispatch({
      type: 'createActive/activeApply',
      payload: data,
    })

  }

  return (
    <>
      <Form
        autoComplete={'off'}
        hideRequiredMark
        onFinish={onFinish}
        style={{ paddingTop: '12px' }}
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
            {getOption(typeList)}
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
          <Select placeholder={'请选择'}>
            {getOption(typeList)}
          </Select>
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
          <Select placeholder={'请选择'}>
            {getOption(typeList)}
          </Select>
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
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            style={{ width: '100%' }}
          />
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
          label={
            <span>
              社团成员数
            <span style={{ color: '#00000073' }}>（最高）
              <Tooltip title='超过最高数后无法加入新成员'>
                  <QuestionCircleOutlined style={{ marginRight: 4 }} />
                </Tooltip>
              &nbsp;</span>
            </span>
          }
          rules={[{ required: true, message: '请输入成员数量' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} />
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
          style={{ margin: '0' }}
          extra={
            <p>请上传1200px * 500px像素图片</p>
          }
        >
          <CropImgView id={'create-active-form-img'} />
        </FormItem>


        <FormItem
          {...submitFormLayout}
        >
          <Button htmlType={'submit'} type={'primary'} size={'large'} >保存</Button>
        </FormItem>
      </Form>
    </>
  )
}

export default connect(
  ({ createActive }: { createActive: CreateActiveState }) => ({
    typeList: createActive.typeList,

  })
)(CreateActiveApply)