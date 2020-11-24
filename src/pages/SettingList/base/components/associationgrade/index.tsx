// 社团级别设置 组件

import React from 'react';

import { Row, Col, Form, Button } from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

import { AssociationGradeState } from '../../data'

interface AssociationGradeProps {
  dispatch: Dispatch
  valueList: {one: string, id: number}[]
}

const FormItem = Form.Item

const AssociationGrade: React.FC<AssociationGradeProps> = (props) => {

  const { valueList, dispatch } = props

  // input 输入框属性
  const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
    one: {
      message: '请输入社团级别!',
      placeHodel: '请输入社团级别',
    }
  }
  
  const onFinish = (e: any) => {

    const list = JSON.parse(JSON.stringify(e['base-association-grade']))

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
      type: 'baseAssociationGrade/upGrade',
      payload: list
    })

    setTimeout(() => {
      dispatch ({
        type: 'baseAssociationGrade/getGrade'
      })
    }, 1 * 1000)

  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>社团级别:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'base-association-grade': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'base-association-grade'}
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
  ({baseAssociationGrade}: { baseAssociationGrade: AssociationGradeState}) => {
    return {
      valueList: baseAssociationGrade.valueList,
    }
  }
)(AssociationGrade)