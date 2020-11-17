// 地理四级联动，包含街道、乡镇

import React, { useState } from 'react'
import { Select, Form } from 'antd'
const Place = require('./pcas.json')
const { Option } = Select
const FormItem = Form.Item

interface PlaceViewProps {
  onFinish?: (value: {[name:string]:string}) => void
}

interface CityObject {
  [name: string]: {[name: string]: string[]}
}

interface RegionObject {
  [name: string]: string[]
}

const PlaceView: React.FC<PlaceViewProps> = (props) => {

  // 省份
  const [ province, setProvince ] = useState<string>('')
  // 城市
  const [ city, setCity ] = useState<string>('')
  // 地区
  const [ region, setRegion ] = useState<string>('')

  // 城市列表
  const [ cityList, setCityList ] = useState<string[]>([])
  // 选中省份中的城市
  const [ cityObject, setCityObject ] = useState<CityObject>({})
  // 地区列表
  const [ regionList, setRegionList ] = useState<string[]>([])
  // 选中城市中的地区
  const [ regionObject, setRegionObject ] = useState<RegionObject>({})
  // 街道列表
  const [ streetList, setStreeList ] = useState<string[]>([])

  // province list
  const provinceList = Object.keys(Place)

  const getCity = (value: string) => {
    setProvince(value)
    setCityList(Object.keys(Place[value]))
    setCityObject(Place[value])
  }

  const getRegion = (value: string) => {
    setCity(value)
    setRegionList(Object.keys(cityObject[value]))
    setRegionObject(cityObject[value])
  }

  const getStree = (value: string) => {
    setRegion(value)
    setStreeList(regionObject[value])
  }

  const onFinish = (value: string) => {
    if (props.onFinish) {
      props.onFinish({province: province,city: city,region: region,stree: value})
    }
  }

  // Option render function
  const getOption = (list: string[]) => {
    if (!list || list.length ===0) {
      return <Option value={0}>未查询到数据</Option>
    }

    return list.map((item: string, index: number) => (
      <Option value={item} key={item}>{item}</Option>
    ))

  }

  return (
    <div style={{width: '100%'}}>
      <FormItem
        name={'province'}
        style={{display: 'inline-block', width: '24.7%'}}
        rules={[{required: true,message: '请选择省份!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择省份'}
          onSelect={getCity}
        >
          {getOption(provinceList)}
        </Select>
      </FormItem>
      <FormItem
        name={'city'}
        style={{display: 'inline-block', width: '24.7%', marginLeft: '0.4%'}}
        rules={[{required: true,message: '请选择城市!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择城市'}
          onSelect={getRegion}
        >
          {getOption(cityList)}
        </Select>
      </FormItem>
      <FormItem
        name={'region'}
        style={{display: 'inline-block', width: '24.7%', marginLeft: '0.4%'}}
        rules={[{required: true,message: '请选择区域!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择区域'}
          onSelect={getStree}
        >
          {getOption(regionList)}
        </Select>
      </FormItem>
      <FormItem
        name={'stree'}
        style={{display: 'inline-block', width: '24.7%', marginLeft: '0.4%'}}
        rules={[{required: true,message: '请选择街道!'}]}
      >
        <Select
          showSearch
          style={{width: '100%'}}
          placeholder={'请选择街道'}
          onSelect={onFinish}
        >
          {getOption(streetList)}
        </Select>
      </FormItem>
    </div>
  )
}

export default PlaceView