// 选择审批人组件

import React, { useRef, useState } from 'react'

import { Drawer, Select, Space, Button, Form, Table } from 'antd'

interface ApplyViewProps {
  visible: boolean
  valueList: {
    teacher: any[],
    department?: any[],
    college?: any[]
  }
  loading: boolean
  columns: any
  dataSource: any
  count: number
  current: number
  onClose: () => void
}

const {Option} = Select
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

// Option render function
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0}>未查询到数据</Option>
  }

  return list.map((item: string, index: number) => (
    <Option value={item} key={item}>{item}</Option>
  ))

}

/**
 * 
 * @param visible 控制组件是否显示
 * @param valueList 下拉列表的数据集合
 * @param loading control table loading
 * @param columns table 组件的 columns 参数 类型 antd ColumnsType
 * @param dataSource table 组件接收的 dataSource
 * @param count table 组件接收的总条数
 * @param current table 组件接收的分页数
 * @param onClose 控制组件关闭的方法
 */
const ApplyView: React.FC<ApplyViewProps> = (props) => {
  
  const {
    visible,
    valueList,
    loading,
    columns,
    dataSource,
    count,
    current,
    onClose
  } = props

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    console.log(e)
  }

  return (
    <Drawer
      destroyOnClose
      visible={visible}
      title={'审批'}
      onClose={onClose}
      width={600}
      bodyStyle={{paddingBottom: '0px'}}
      footer={
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '25px'}}>
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type={'primary'} onClick={()=> button.current?.click()} >提交</Button>
          </Space>
        </div>
      }
    >
      <Form
        autoComplete={'off'}
        hideRequiredMark
        onFinish={onFinish}
      >
        <FormItem
          {...formItemLayout}
          name={'teacher'}
          label={'指导老师'}
        >
          <Select
            showSearch
            placeholder={'请选择指导老师'}
          >
            {
              getOption(valueList.teacher)
            }
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'department'}
          label={'指导部门'}
        >
          <Select
            showSearch
            placeholder={'请选择指导部门'}
          >
            {getOption(valueList.teacher)}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'teacher'}
          label={'部门领导'}
        >
          <Select
            showSearch
            placeholder={'请选择指导'}
          >
            {getOption(valueList.teacher)}
          </Select>
        </FormItem>
        <FormItem style={{display: 'none'}}>
          <Button type={'primary'} htmlType={'submit'} ref={button}>提交</Button>
        </FormItem>
      </Form>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey={'id'}
        size={'small'}
        pagination={{total: count, current: current}}
      >

      </Table>
    </Drawer>
  )
}

export default ApplyView