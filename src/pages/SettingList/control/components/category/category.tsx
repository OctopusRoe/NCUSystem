import React from 'react'

import { Row, Col} from 'antd';
import FormListCom, { Group } from '@/components/FormListCom/formlistcom'
const Category: React.FC<{}> = (props) => {
  // 启动页面后默认存在两个数据
  const inputList: Group[] = [
    {name: 0, key: 0, fieldKey: 0, value: {one: '腾讯'}},
    {name: 1, key: 1, fieldKey: 1, value: {one: '网易'}},
  ]

  // input 输入框属性
  const info = {
    one: {
      name: 'name',
      message: '请输入应用类别!',
      placeHodel: '请输入应用类别',
    }
  }
  
  const onFinish = (e: any) => {
    console.log(e)
  }
  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>应用类别:</div>
        </Row>
      </Col>
      <Col span={12}>
        {/* inputTwo inputThree 属性默认为false */}
        <FormListCom inputList={inputList} info={info} onFinish={onFinish} />
      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default Category