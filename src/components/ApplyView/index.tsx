// 选择审批人组件

import React, { useRef, useState } from 'react'

import { Drawer, Select, Space, Button, Form, Table, Spin } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import { GlobalModelState } from '@/models/global'
import { connect, Dispatch } from 'umi';


interface ApplyViewProps {
  visible: boolean
  loading: boolean
  dataSource: any
  onClose: () => void
  selectValue: any
  departmentList: any
  dispatch: Dispatch
  TeacherList: any
  applyId: any
  afterClose: () => void
}

const { Option } = Select
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

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}


/**
 * 
 * @param visible 控制组件是否显示
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
    loading,
    dataSource,
    dispatch,
    departmentList,
    onClose,
    TeacherList,
    applyId,
    afterClose
  } = props


  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    const data = {
      Id: applyId,
      TeacherId: e.teacher,
      DepartmentId: e.department,
    }
    dispatch({
      type: 'createActive/applyGuidance',
      payload: data,
    })

    //关闭时重置loading 状态
    dispatch({
      type: 'createActive/cleanDetailList'
    });

    onClose();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  }


  const columns: ColumnsType<any> | undefined = [
    {
      title: '当前审批人',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '审批时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '审批单位',
      dataIndex: 'results',
      key: 'results',
    },
    {
      title: '审批结果',
      dataIndex: 'case',
      key: 'case',
    }
  ]


  return (
    <Drawer
      destroyOnClose
      visible={visible}
      title={'审批详情'}
      onClose={() => {
        //关闭时重置loading 状态
        dispatch({
          type: 'createActive/cleanDetailList'
        });
        onClose()
      }}
      width={800}
      bodyStyle={{ paddingBottom: '0px' }}
      footer={
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '25px' }}>
          <Space>
            <Button onClick={() => {
              //关闭时重置loading 状态
              dispatch({
                type: 'createActive/cleanDetailList'
              });
              onClose()
            }}>取消</Button>
            <Button type={'primary'} onClick={() => button.current?.click()} >提交</Button>
          </Space>
        </div >
      }
    >
      { loading ? <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Spin size={'large'} delay={300} />
      </div > : <div>

          <Form
            autoComplete={'off'}
            hideRequiredMark
            onFinish={onFinish}
          >

            <FormItem
              {...formItemLayout}
              name={'department'}
              label={'指导部门'}
            >
              <Select
                showSearch
                placeholder={'请选择指导部门'}
              >
                {getOption(departmentList)}
              </Select>
            </FormItem>
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
                  getOption(TeacherList)
                }
              </Select>
            </FormItem>
            <FormItem style={{ display: 'none' }}>
              <Button type={'primary'} htmlType={'submit'} ref={button}>提交</Button>
            </FormItem>
          </Form>
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            rowKey={'id'}
            size={'small'}
          >
          </Table>

        </div>}




    </Drawer >
  )
}

export default connect(({ global }: { global: GlobalModelState }) => {
  return {
    selectValue: global.SelectValue,

    departmentList: global.SelectValue.department
  }
})(ApplyView)