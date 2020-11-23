// 单位类型设置 组件

import React from 'react';

import { Row, Col, Form, Button } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

import { DepartmentTypeState } from './model'


interface DepartmentTypeProps {
  dispatch: Dispatch
  valueList: any[]
}

const FormItem = Form.Item

const DepartmentType: React.FC<DepartmentTypeProps> = (props) => {
  
  const { valueList, dispatch } = props

  // input 输入框属性
  const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
    one: {
      message: '请输入单位类别!',
      placeHodel: '请输入单位类别',
    }
  }

  const onFinish = (e: any) => {
    const list = JSON.parse(JSON.stringify(e['base-department-type']))

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
      type: 'baseDepartmentType/upType',
      payload: list
    })

    setTimeout(() => {
      dispatch({
        type: 'baseDepartmentType/getType'
      })
    }, 1 * 1000)
    
  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>单位类别:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'base-department-type': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'base-department-type'}
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
  ({ baseDepartmentType }: { baseDepartmentType: DepartmentTypeState }) => {
    return {
      valueList: baseDepartmentType.valueList
    }
  }
)(DepartmentType)