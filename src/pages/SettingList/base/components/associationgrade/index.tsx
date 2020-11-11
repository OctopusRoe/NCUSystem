// 社团级别设置 组件

import React from 'react';

import { Row, Col, Form, Button} from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

interface AssociationGradeProps {
  dispatch: Dispatch
  valueList: any[]
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
    console.log(e)
  }

  const removeFun = (index: number) => {
    dispatch({
      type: 'base-association-grade/rmFormValue',
      payload: index
    })
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
  (state: any) => {
    return {
      valueList: state['base-association-grade'].valueList
    }
  }
)(AssociationGrade)