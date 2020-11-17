// 地理三级联动 select 选框

import React, { useState } from 'react'
import { Select, Form } from 'antd'
const Geographic = require('./pca.json')
const { Option } = Select

interface GeographicViewProps {
  onFinish?: (value: {[name:string]:string}) => void
}

const GeographicView: React.FC<GeographicViewProps> = (props) => {

  const [ province, setProvince ] = useState('')
  const [ city, setCity ] = useState('')

  const [ cityList, setCityList ] = useState<string[]>([])
  const [ regionList, setRegionList ] = useState<string[]>([])
  const [ cityObject, setCityObject ] = useState({})
  const provinceList = Object.keys(Geographic)

  const getCity = (value: string) => {
    setProvince(value)
    setCityList(Object.keys(Geographic[value]))
    setCityObject(Geographic[value])
  }

  const getRegion = (value: string) => {
    setCity(value)
    setRegionList(cityObject[value])
  }

  // Option 渲染函数
  const getOption = (list: string[]) => {
    if (!list || list.length === 0) {
      return <Option value={0} >未查询到数据</Option>
    }

    return list.map((item: string, index: number) => (
      <Option value={item} key={index}>{item}</Option>
    ))
  }

  const onFinish = (value: string) => {
    if (props.onFinish) {
      props.onFinish({province: province,city: city,region: value})
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Form.Item
        name={'province'}
        style={{display: 'inline-block', width: '33%'}}
        rules={[{required: true, message: '请选择省份!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择省份'}
          onSelect={getCity}
          >
          {getOption(provinceList)}
        </Select>
      </Form.Item>
      <Form.Item
        name={'city'}
        style={{display: 'inline-block', width: '33%', marginLeft: '0.5%'}}
        rules={[{required: true, message: '请选择城市!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择城市'}
          onSelect={getRegion}
        >
          {getOption(cityList)}
        </Select>
      </Form.Item>
      <Form.Item
        name={'district'}
        style={{display: 'inline-block', width: '33%', marginLeft: '0.5%'}}
        rules={[{required: true, message: '请选择区/县!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择区/县'}
          onSelect={onFinish}
        >
        {getOption(regionList)}
      </Select>
      </Form.Item>
    </div>
  )
}

export default GeographicView