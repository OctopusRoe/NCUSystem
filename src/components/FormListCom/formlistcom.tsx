// 动态增减表单组件

import React, { useState , useEffect } from 'react'

import { Button, Input, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const FormList = Form.List
const FormItem = Form.Item

// 显示 input
export interface Group {
  name: number
  key: number
  fieldKey: number
  value?: {one?: string, two?: string, three?: string}
}

// 每行 input 的参数设置
export interface InputInfo {
  name: string
  message: string
  placeHodel: string
  disabled?: boolean
  value?: string
}

interface FormListComProps {
  inputList: Group[]
  info: {one: InputInfo, two?: InputInfo, three?: InputInfo}
  onFinish: (e: any) => void
  inputTwo?: boolean
  inputThree?: boolean
}

const FormListCom: React.FC<FormListComProps> = (props) => {

  const { info, onFinish } = props

  const [ inputList, setInputList ] = useState<Group[]>([])
  const [ listLength, setListLength ] = useState(0)

  useEffect(() => {
    setInputList(props.inputList)
    setListLength(props.inputList.length - 1)
  },[])

  const returnValue = (e: any) => {
    console.log(e)
    const back = e.valueList.filter((item: any) => item !== undefined)
    onFinish(back)
  }

  const add = () => {
    let length = 0
    if (inputList.length !==0) {
      length = listLength + 1
    }

    const list = [{
      name: length,
      key: length,
      fieldKey: length,
      value: {}
    }]

    const newList = [...inputList, ...list]
    setInputList(newList)
    setListLength(length)
  }

  const remove = (e: any) => {
    const newInputList = inputList.filter((item: any) => item.name != e)
    setInputList(newInputList)
  }

  return (
    <Form name="dynamic_form_nest_item" onFinish={returnValue} autoComplete={"off"}  >
      <FormList name="valueList">
        {() => {

          return (
            <div>
              {inputList.map((item: any, index: number)=> (
                <div key={item.key} style={{ display: 'flex', marginBottom: 8}}>
                  <FormItem
                    // {...field}
                    initialValue={item.value.one}
                    name={[item.name, info.one.name]}
                    fieldKey={[item.fieldKey, info.one.name]}
                    rules={[{ required: true, message: info.one.message }]}
                    style={{width: '100%', marginRight: '8px' }}
                  >
                    <Input placeholder={info.one.placeHodel} disabled={info.one.disabled} />
                  </FormItem>
                  {
                    props.inputTwo
                    ?
                    (<FormItem
                      // {...field}
                      initialValue={item.value.two}
                      name={[item.name, info.two?.name]}
                      fieldKey={[item.fieldKey, info.two?.name]}
                      rules={[{ required: true, message: info.two?.message }]}
                      style={{width: '100%', marginRight: '8px' }}
                    >
                      <Input placeholder={info.two?.placeHodel} value={info.two?.value} disabled={info.two?.disabled} />
                    </FormItem>)
                    :
                    null
                  }
                  {
                    props.inputThree
                    ?
                    (<FormItem
                      // {...field}
                      initialValue={item.value.three}
                      name={[item.name, info.three?.name]}
                      fieldKey={[item.fieldKey, info.three?.name]}
                      rules={[{ required: true, message: info.three?.message }]}
                      style={{width: '100%', marginRight: '8px' }}
                    >
                      <Input placeholder={info.three?.placeHodel} value={info.three?.value} disabled={info.three?.disabled} />
                    </FormItem>)
                    :
                    null
                  }

                  <MinusCircleOutlined
                    title={'移除'}
                    onClick={() => {
                      remove(item.name);
                    }}
                  />
                </div>
              ))}

              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined />添加
                </Button>
              </FormItem>
            </div>
          );
        }}
      </FormList>

      <FormItem>
        <Button type="primary" htmlType="submit" size={'large'}>
          提交
        </Button>
      </FormItem>
    </Form>
  )
}

export default FormListCom