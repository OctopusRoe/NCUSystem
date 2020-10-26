// 网络平台设置 组件

import React, { useState } from 'react'

import { Row, Col} from 'antd';
import FormListCom, { Group } from '@/components/FormListCom/formlistcom'


const OnlinePlatform: React.FC<{}> = (props) => {

  // 启动页面后默认存在两个数据
  const [ inputList, setInputList ] = useState<Group[]>([
    {name: 0, key: 0, fieldKey: 0, value: {one: '腾讯'}},
    {name: 1, key: 1, fieldKey: 1, value: {one: '网易'}},
  ])

  // input 输入框属性
  const info = {
    one: {
      name: 'name',
      message: '请输入网络平台类型!',
      placeHodel: '请输入网络平台类型',
    }
  }
  
  const onFinish = (e: any) => {
    console.log(e)
  }
  const add = () => {
    let length = inputList.length
    length++
    // if (inputList.length !== 0) {
    //   length = inputList.length + 1
    // }

    const newItem = [{
      name: length,
      key: length,
      fieldKey: length,
      value: {}
    }]

    const list = [...inputList, ...newItem]
    setInputList(list)

  }

  const remove = (e: number) => {
    const list = inputList.filter((item: any, index: number) => (item.name !== e))
    setInputList(list)
    console.log(inputList)
  }

  return (
    <Row style={{paddingTop: '12px'}}>
      <Col span={6} >
        <Row justify={'end'} style={{marginRight: '8px', height: '32px'}} align={'middle'}>
          <div>网络平台类型:</div>
        </Row>
      </Col>
      <Col span={12}>
        {/* inputTwo inputThree 属性默认为false */}
        <FormListCom add={add} remove={remove}  inputList={inputList} info={info} onFinish={onFinish} />
      </Col>
      <Col span={6}>
      </Col>
    </Row>
  )
}

export default OnlinePlatform