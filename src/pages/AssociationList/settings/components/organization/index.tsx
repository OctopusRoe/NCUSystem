//信息变更 -部门设置

import React from 'react'
import { Row, Col, Form, Button} from 'antd';
import FormListCom from '@/components/FormListCom/formlistcom'

import { connect, Dispatch } from 'umi'

import { OrganizationState } from '../../data'

import { AssociationState } from '../../../data'

interface OrganizationProps {
  dispatch: Dispatch
  valueList: {one: string, id: number}[]
  associationId: string
}

const FormItem = Form.Item

const Organization: React.FC<OrganizationProps> = (props) => {

  const { valueList, associationId, dispatch } = props

  // input 输入框属性
  const info = {
    one: {
      name: 'name',
      message: '请输入部门名称!',
      placeHodel: '请输入部门名称',
    }
  }
  
  const onFinish = (e: any) => {
    const list = JSON.parse(JSON.stringify(e['base-association-type']))

    if (list.length !== 0) {
      Array.isArray(list) && list.forEach((item: any) => {
        item.name = item.one
        if (item.id) {
          return
        }
        item.id = '0'
      })
    }

    const data = {
      params: '1',
      data: list
    }

    dispatch({
      type: 'associationOrganization/upOrganization',
      payload: data
    })

    setTimeout(() => {
      dispatch({
        type: 'associationOrganization/getOrganization',
        payload: associationId
      })
    }, 1 * 1000)
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
  ({associationOrganization, associationControl}: 
    {
      associationOrganization: OrganizationState,
      associationControl: AssociationState,
      
    }) => {
    return {
      valueList: associationOrganization.valueList,
      associationId: associationControl.associationId
    }
  }
)(Organization)