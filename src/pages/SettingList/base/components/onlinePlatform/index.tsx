// 网络平台设置 组件

import React from 'react'

import { Row, Col, Form, Button } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

import { OnlinePlatformState } from '../../data'


interface OnlinePlatformProps {
  dispatch: Dispatch
  valueList: {one: string, id: number}[]
}

const FormItem = Form.Item

const OnlinePlatform: React.FC<OnlinePlatformProps> = (props) => {

  const { valueList, dispatch } = props

  // input 输入框属性
  const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
    one: {
      message: '请输入网络平台类型!',
      placeHodel: '请输入网络平台类型',
    }
  }
  
  const onFinish = (e: any) => {
    const list = JSON.parse(JSON.stringify(e['online-Plat-list']))

    if (list.length !== 0) {
      Array.isArray(list) && list.forEach((item: any, index: number) => {
        item.name = item.one
        if (item.id) {
          return 
        }
        item.id = 0
      })
    }

    dispatch({
      type: 'baseOnlinePlatform/upType',
      payload: list
    })

    setTimeout(() => {
      dispatch({
        type: 'baseOnlinePlatform/getType'
      })
    }, 1 * 1000)

  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>网络平台类型:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'online-Plat-list': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'online-Plat-list'}
            showInput={{two: false, three: false}}
          />
          <FormItem>
            <Button type={'primary'} htmlType={'submit'} size={'large'}>提交</Button>
          </FormItem>
        </Form>
      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default connect(
  ({ baseOnlinePlatform }: { baseOnlinePlatform: OnlinePlatformState }) => {
    return {
      valueList: baseOnlinePlatform.valueList
    }
  }
)(OnlinePlatform)