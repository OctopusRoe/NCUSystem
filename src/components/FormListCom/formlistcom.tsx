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
  name: 'one' | 'two' | 'three'
  message?: string
  placeHodel?: string
  disabled?: boolean
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

  const [ listLength, setListLength ] = useState<number>(20)    // 此处因为 diff 算法问题，如果传入的 inputList.length >= listLength 所设定的数字，会产生bug
  const [ inputList, setInputList ] = useState<Group[]>([])
  const [ defaultList, setDefaultList ] = useState<any[]>([])

  useEffect(() => {
    setInputList(props.inputList)
    const defaultValue = props.inputList.map((item: Group) => {
      if (item.value) {
        return item.value.one
      }
      return
    })
    setDefaultList(defaultValue)
  },[])

  const returnValue = (e: any) => {
    const back = e.valueList.filter((item: any) => item !== undefined && item.one !== null && defaultList.indexOf(item.one) < 0)
    onFinish(back)
  }

  const add = () => {

    const item: Group[] = [{
      name: listLength,
      key: listLength,
      fieldKey: listLength,
      value: {}
    }]

    const list = [...inputList, ...item]
    setInputList(list)
    setListLength(listLength + 1)
  }

  const remove = (e: any) => {
    const list = inputList.filter((item: any, index: number) => item.name !== e)
    setInputList(list)
  }

  return (
    <Form name="formListCom" onFinish={returnValue} autoComplete={"off"}  >
      <FormList name="valueList">
        {() => {
          return (
            <div>
              {inputList.map((item: any, index: number)=> (
                <div key={item.key} style={{ display: 'flex', marginBottom: 8}}>
                  <FormItem
                    initialValue={item.value.one ? item.value.one : null}
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
                      initialValue={item.value.two}
                      name={[item.name, info.two?.name]}
                      fieldKey={[item.fieldKey, info.two?.name]}
                      rules={[{ required: true, message: info.two?.message }]}
                      style={{width: '100%', marginRight: '8px' }}
                    >
                      <Input placeholder={info.two?.placeHodel} disabled={info.two?.disabled} />
                    </FormItem>)
                    :
                    null
                  }
                  {
                    props.inputThree
                    ?
                    (<FormItem
                      initialValue={item.value.three}
                      name={[item.name, info.three?.name]}
                      fieldKey={[item.fieldKey, info.three?.name]}
                      rules={[{ required: true, message: info.three?.message }]}
                      style={{width: '100%', marginRight: '8px' }}
                    >
                      <Input placeholder={info.three?.placeHodel} disabled={info.three?.disabled} />
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