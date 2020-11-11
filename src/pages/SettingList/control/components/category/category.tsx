import React from 'react'

import { Row, Col, Form, Button} from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

interface CategoryProps {
  dispatch: Dispatch
  valueList: any[]
}

const FormItem = Form.Item

const Category: React.FC<CategoryProps> = (props) => {
  
  const { valueList, dispatch } = props

  // input 输入框属性
  const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
    one: {
      message: '请输入应用类别!',
      placeHodel: '请输入应用类别',
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
          <div>应用类别:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'control-category': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'control-category'}
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
      valueList: state['control-category'].valueList
    }
  }
)(Category)