// 动态增减表单组件

import React from 'react'

import { Button, Input, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const FormList = Form.List
const FormItem = Form.Item

// 每行 input 的参数设置
export interface InputInfo {
  message?: string
  placeHodel?: string
  disabled?: boolean
}

interface FormListComProps {
  formListName: string
  info: {one: InputInfo, two?: InputInfo, three?: InputInfo}
  showInput: { two: boolean, three: boolean }
  valueList?: [{one?: string, two?: string, three?: string}]
  removeFun?: (index: number ) => void
  onBlurFun?: (e: string, i: number) => void
}

/**
 * @param formListName 必须
 * @param info 必须，配置输入框的配置 {one: InputInfo, two?: InputInfo, three?: InputInfo}
 * @param showInput 必须, 控制第二和第三个输入框是否显示 {two: boolean, three: boolean}
 * @param valueList 可选，如果第二和第三个输入框要自动显示数据，必须把值列表传入进组件 [{one?: string, two?: string, three?: string}]
 * @param removeFun 可选，控制model文件中的 valueList 的原始数据，如果第二和第三输入框是自动显示数据，则此项必填，例子：(index) => {dispatch({type:'namespace/funName',payload:index})}
 * @param onBlurFun 可选，第一输入框失去焦点后的动作，例子：(e: string, i: number)=>{dispatch({type:'nameSpace/funName',payload:[i,e]})}
 * */
const FormListCom: React.FC<FormListComProps> = (props) => {

  const { showInput, formListName, info, valueList, removeFun, onBlurFun } = props

  const onBlur = (e: string, i: number) => {
    if (onBlurFun) {
      onBlurFun(e,i)
    }
    return
  }

  return (

    <FormList name={formListName}>
      {(fields, { add, remove}) => {
        return (
          <div>
            {fields.map((item: any, index: number)=> (
              <div key={item.key} style={{ display: 'flex', marginBottom: 8}}>
                <FormItem
                  name={[item.name, 'one']}
                  fieldKey={[item.fieldKey, 'one']}
                  rules={[{ required: true, message: info.one.message }]}
                  style={{width: '100%', marginRight: '8px' }}
                >
                  <Input placeholder={info.one.placeHodel} disabled={info.one.disabled} onBlur={(e)=> onBlur(e.target.value, item.name)} />
                </FormItem>
                {
                  showInput.two &&
                  <FormItem
                    name={[item.name, 'two']}
                    fieldKey={[item.fieldKey, 'two']}
                    rules={[{ required: !info.two?.disabled, message: info.two?.message }]}
                    style={{width: '100%', marginRight: '8px' }}
                  >
                    {
                      info.two?.disabled ? 
                        <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
                          <div style={{padding: '4px 11px'}}>
                            {valueList ? valueList[item.name] && valueList[item.name].two : null}
                          </div>
                        </div> :
                        <Input placeholder={info.two?.placeHodel} />
                    }
                  </FormItem>
                }
                {
                  showInput.three &&
                  <FormItem
                    name={[item.name, 'three']}
                    fieldKey={[item.fieldKey, 'three']}
                    rules={[{ required: !info.two?.disabled, message: info.three?.message }]}
                    style={{width: '100%', marginRight: '8px' }}
                  >
                    {
                      info.two?.disabled ? 
                        <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
                          <div style={{padding: '4px 11px'}}>
                            {valueList ? valueList[item.name] && valueList[item.name].three : null}
                          </div>
                        </div> :
                        <Input placeholder={info.two?.placeHodel} />
                    }
                  </FormItem>
                }

                <MinusCircleOutlined
                  title={'移除'}
                  onClick={() => {
                    remove(item.name);
                    if (removeFun) {
                      removeFun(index)
                    }
                  }}
                />
              </div>
            ))}

            <FormItem>
              <Button
                type="dashed"
                onClick={() => add()}
                block
              >
                <PlusOutlined />添加
              </Button>
            </FormItem>
          </div>
        );
      }}
    </FormList>
  )
}

export default FormListCom