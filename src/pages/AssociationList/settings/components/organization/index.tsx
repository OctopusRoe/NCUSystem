//信息变更 -部门设置

import React from 'react'
import { Row, Col, Form, Button} from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

interface OrganizationProps {
  dispatch: Dispatch
  valueList: any[]
}

const FormItem = Form.Item

const Organization: React.FC<OrganizationProps> = (props) => {

  console.log(props)
  const { valueList, dispatch } = props

  // input 输入框属性
  const info = {
    one: {
      name: 'name',
      message: '请输入部门名称!',
      placeHodel: '请输入部门名称',
    }
  }
  
  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>部门名称:</div>
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
  ({associationOrganization}: {associationOrganization: any}) => {
    return {
      valueList: associationOrganization.valueList
    }
  }
)(Organization)