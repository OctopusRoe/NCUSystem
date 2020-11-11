// 社团类型 组件

import React from 'react';

import { Row, Col, Form, Button} from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

interface AssociationTypeProps {
  dispatch: Dispatch
  valueList: any[]
}

const FormItem = Form.Item

const AssociationType: React.FC<AssociationTypeProps> = (props) => {

  const { valueList, dispatch } = props

  // input 输入框属性
  const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
    one: {
      message: '请输入社团类别!',
      placeHodel: '请输入社团类别',
    }
  }
  
  const onFinish = (e: any) => {
    console.log(e)
  }

  const removeFun = (index: number) => {
    dispatch({
      type: 'base-association-type/rmFormValue',
      payload: index
    })
  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>社团类别:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'base-association-type': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'base-association-type'}
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
      valueList: state['base-association-type'].valueList
    }
  }
)(AssociationType)