// 社团注销页面

import React,{ useState, useEffect } from 'react';

import { Card, Form, Input, message, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { connect, Dispatch } from 'umi';

interface DeleteProps {
  dispatch: Dispatch
  formValue: any
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
}

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

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

const { Option } = Select;

const teacherValue = [{name: '名字1', phone: '11011211911'},{name: '名字2', phone: '11011211119'}]

const FormItem = Form.Item
const { TextArea } = Input

const Delete: React.FC<DeleteProps> = (props) => {

  
  const { formValue, canTeacherUse, teacherCount, canDepartmentUse, departmentCount, dispatch } = props

  // 控制刷新
  const [ count, setCount ] = useState<any>(0)

  // 保存审批电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  const handleFinish = (e:any) => {
    message.success('ok');
    console.log(e)
  };

  // 选择审批老师电话 value = e.target.value
  const changeValue = (e: any) => {
    setGetTeacherPhone(teacherValue[e.target.value].phone)
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    dispatch({
      type: 'deleteModel/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    dispatch({
      type: 'deleteModel/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'deleteModel/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'deleteModel/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'deleteModel/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'deleteModel/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  const setStudentId = async (e: string, i: number) => {

    if (e === '') {
      return
    }
    await dispatch({
      type: 'deleteModel/setNewFormValue',
      payload: [i, e],
    })
    setCount(e)
  }

  // 控制页面刷新
  useEffect(() => {
  },[count])

  // 退出组件清除成员列表
  useEffect(()=>{
    return function () {
      dispatch({
        type: 'deleteModel/cleanAll',
        payload: []
      })
    }
  },[])

  return (
    <Card>
      <Form
        onFinish={handleFinish}
        style={{paddingTop: '12px'}}
        layout={"horizontal"}
        autoComplete={'off'}
        hideRequiredMark
        initialValues={formValue}
      >
        <FormItem
          {...formItemLayout}
          label={'申请人'}
          name={'apply-name'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'社团名称'}
          name={'association-name'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'社团类别'}
          name={'association-type'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'社团级别'}
          name={'association-grade'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'指导单位'}
          name={'department'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'成立年份'}
          name={'time'}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'注销原因'}
          name={'cause'}
          rules={[
            {
              required: true,
              message: '请输入注销原因!'
            }
          ]}
        >
          <TextArea showCount maxLength={100} rows={6} placeholder={'请输入注销原因'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'成员代表'}
        >
          <Form.List
            name={'student-member-list'}
          >
            {
              (fields, {add, remove}) => (
                <>
                  {
                    fields.map((item: any, index: number) => (
                      <div key={item.fieldKey} style={{ display: 'flex'}}>
                        <FormItem
                          name={[item.name, 'one']}
                          fieldKey={[item.fieldKey, 'one']}
                          rules={[{required: true, message: '请输入学号!'}]}
                          style={{width: '100%', marginRight: '8px' }}
                        >
                          <Input placeholder={'请输入学号'} onBlur={(e)=> setStudentId(e.target.value, item.name)} />
                        </FormItem>
                        <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
                          <div style={{padding: '4px 11px'}}>
                            {formValue['student-member-list'][item.name] && formValue['student-member-list'][item.name].two}
                          </div>
                        </div>
                        <MinusCircleOutlined
                          title={'移除'}
                          onClick={() => {
                            remove(item.name)
                            dispatch({
                              type: 'deleteModel/rmFormValue',
                              payload: item.name
                            })
                          }}
                        />
                      </div>
                    ))
                  }
                  <FormItem>
                    <Button
                      type={'dashed'}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加
                    </Button>
                  </FormItem>
                </>
              )
            }
          </Form.List>
        </FormItem>
        <Form.Item  {...formItemLayout} name={'pickTeacher'} label={'指导老师审批'}>
          <Input.Group compact>
            <Select style={{ width: '25%' }} placeholder={'请选择'}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
            <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            <Button
              style={{width: '25%'}}
              onClick={teacherCountDown}
              disabled={canTeacherUse ? false : true}
              type={canTeacherUse ? 'primary' : 'default'}
            >
              {canTeacherUse ? '点击获取' : `${teacherCount}秒后重试`}
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item  {...formItemLayout} name={'pickDepartment'} label={'指导部门审批'}>
          <Input.Group compact>
            <Select style={{ width: '25%' }} placeholder={'请选择'}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
            <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            <Button
              style={{width: '25%'}}
              onClick={departmentCountDown}
              disabled={canDepartmentUse ? false : true}
              type={canDepartmentUse ? 'primary' : 'default'}
            >
              {canDepartmentUse ? '点击获取' : `${departmentCount}秒后重试`}
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item
          {...submitFormLayout}
        >
          <Button htmlType={'submit'} type={'primary'} size={'large'}>提交</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(
  (state: any) => {
    return {
      formValue: state.deleteModel.formValue,
      canTeacherUse: state.deleteModel.canTeacherUse,
      teacherCount: state.deleteModel.teacherCount,
      canDepartmentUse: state.deleteModel.canDepartmentUse,
      departmentCount: state.deleteModel.departmentCount
    }
  }
)(Delete);
