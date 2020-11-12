// 地理三级联动 select 选框

import React, { useState } from 'react'
import { Select, Form } from 'antd'
const Geographic = require('./pca.json')
const { Option } = Select

interface GeographicViewProps {
  onFinish?: (value: string[]) => void
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
      props.onFinish([province, city, value])
    }
  }

  return (
    <div style={{width: '100%'}}>
      <Form.Item
        noStyle
        name={'province'}
      >
        <Select
          showSearch
          style={{width: '33%'}}
          placeholder={'请选择省份'}
          onSelect={getCity}
          >
          {getOption(provinceList)}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        name={'city'}
      >
        <Select
          showSearch
          style={{width: '33%', marginLeft: '0.5%'}}
          placeholder={'请选择城市'}
          onSelect={getRegion}
        >
          {getOption(cityList)}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        name={'district'}
      >
        <Select
          showSearch
          style={{width: '33%', marginLeft: '0.5%'}}
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