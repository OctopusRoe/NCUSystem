// 基本信息 组件
import React, { useState, useEffect } from 'react';

import { Button, Input, Form, message, Select, DatePicker, Tooltip, Upload } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect, FormattedMessage, useIntl, Dispatch} from 'umi';

import CropImgView from '@/components/CropImgview'
import styles from './BaseView.less';
import { BaseInfoState } from '../../data'


interface FormInfo {
  teacherValue: {name: string, phone: string}[]
  associationType: string[]
  associationGrade: string[]
  department: string[]
}

interface BaseInfoProps {
  formInfo: FormInfo
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  dispatch: Dispatch
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

const { Option } = Select

const BaseInfo: React.FC<BaseInfoProps> = (props) => {

  const intl = useIntl()

  const { canTeacherUse, teacherCount, canDepartmentUse, departmentCount, formInfo, dispatch } = props
  const { teacherValue, associationType, associationGrade, department } = formInfo
  
  // 保存指导老师电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  // 保存指导部门电话
  const [ getDepartmentPhone, setGetDepartmentPhone ] = useState<string>('')

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacherPhone(e)
  }

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartmentPhone(e)
  }

  // 获取图片数据
  const testOne = (e: any) => {
    console.log(e)
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacherPhone === '') {
      return
    }
    dispatch({
      type: 'associationBaseInfo/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartmentPhone === '') {
      return
    }
    dispatch({
      type: 'associationBaseInfo/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationBaseInfo/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'associationBaseInfo/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationBaseInfo/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'associationBaseInfo/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  // 表单数据获取
  const handleFinish = (e:any) => {
    message.success(intl.formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e)
  }

  return (
    <div className={styles.baseView}>
      <Form
        layout={"horizontal"}
        onFinish={handleFinish}
        // initialValues={currentUser}
        autoComplete={'off'}
        hideRequiredMark
      >
        <Form.Item
          {...formItemLayout}
          name={"logo"}
          label={intl.formatMessage({ id: 'info.infoBase.logo'})}
        >
          <CropImgView id="associationLogo" onChange={testOne.bind(this)} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"fullname-cn"}
          label={intl.formatMessage({ id: 'info.infoBase.fullname-cn' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.fullname-cn-message' }, {}),
            },
          ]}
        >
          <Input placeholder="请输入社团中文全称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"fullname-en"}
          label={intl.formatMessage({ id: 'info.infoBase.fullname-en' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.fullname-en-message' }, {}),
            },
          ]}
        >
          <Input placeholder="请输入社团英文全称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"typeof"}
          label={intl.formatMessage({ id: 'info.infoBase.typeof' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.typeof-message' }, {}),
            },
          ]}
        >
          <Select placeholder={'请选择社团类别'}>
            {
              associationType.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"level"}
          label={intl.formatMessage({ id: 'info.infoBase.level' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.level-message' }, {}),
            },
          ]}
        >
          <Select placeholder={'请选择社团级别'}>
            {
              associationGrade.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"department"}
          label={intl.formatMessage({ id: 'info.infoBase.department' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.department-message' }, {}),
            },
          ]}
        >
          <Select placeholder={'请选择指导部门'}>
            {
              department.map((item: any, index: number) => (
                <Option value={item} key={index}>{item}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"member"}
          label={
            <span>
              社团成员数
              <span style={{ color: '#00000073' }}>（最高）
              <Tooltip title='超过最高数后无法加入新成员'>
                  <QuestionCircleOutlined style={{ marginRight: 4 }} />
                </Tooltip>
              &nbsp;</span>
            </span>
          }
          rules={[{ required: true, message: '请输入成员数量' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{color: '#bfbfbf'}}>人</div>} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"regulations"}
          label={intl.formatMessage({ id: 'info.infoBase.regulations' })}
        >
          <Upload showUploadList={false} fileList={[]}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"startTime"}
          label={intl.formatMessage({ id: 'info.infoBase.startTime' })}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'info.infoBase.startTime-message' }, {}),
            },
          ]}
        >
          <DatePicker picker="year" style={{width: '100%'}}></DatePicker>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"syssimpleimg"}
          label={intl.formatMessage({ id: 'info.infoBase.syssimpleimg' })}
        >
          <CropImgView id="syssimpleimg" />
        </Form.Item>
        <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'teacherPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导老师!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'teacherCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
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
      <Form.Item  {...formItemLayout} label={'指导部门审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'departmentPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导部门!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'departmentCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
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
          <div>
            <Button htmlType="submit" type="primary" size={'large'}>
              <FormattedMessage
                id="setting.basic.update"
                defaultMessage="Update Information"
              />
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default connect(
  ({ associationBaseInfo }: {
    associationBaseInfo: BaseInfoState
  })=>{
    return {
      canTeacherUse: associationBaseInfo.canTeacherUse,
      teacherCount: associationBaseInfo.teacherCount,
      canDepartmentUse: associationBaseInfo.canDepartmentUse,
      departmentCount: associationBaseInfo.departmentCount
    }
  }
)(BaseInfo)
