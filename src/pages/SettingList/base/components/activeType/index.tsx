// 活动类型配置 组件

import React from 'react'

import { Row, Col, Form, Button} from 'antd';
import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'
import { connect, Dispatch } from 'umi'

import { ActiveTypeState } from '../../data'

interface ActiveTypeProps {
  dispatch: Dispatch
  valueList: {one: string, id: number}[]
}

const FormItem = Form.Item

// input 输入框属性
const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
  one: {
    message: '请输入活动类别!',
    placeHodel: '请输入活动类别',
  }
}

const ActiveType: React.FC<ActiveTypeProps> = (props) => {

  const { valueList, dispatch } = props

  const onFinish = (e: any) => {

    const list = JSON.parse(JSON.stringify(e['base-active-type']))

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
      type: 'baseActiveType/upType',
      payload: list
    })

    setTimeout(() => {
      dispatch({
        type: 'baseActiveType/getType'
      })
    }, 1 * 1000)
  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>活动类别:</div>
        </Row>
      </Col>
      <Col span={12}>
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          initialValues={{'base-active-type': valueList}}
        >
          <FormListCom
            info={info}
            formListName={'base-active-type'}
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
  ({baseActiveType}: {baseActiveType: ActiveTypeState}) => ({
    valueList: baseActiveType.valueList
  })
)(ActiveType)