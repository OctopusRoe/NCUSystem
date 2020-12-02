// 基本信息 组件
import React, { useState, useEffect } from 'react';

import { Button, Input, Form, message, Select, DatePicker, Tooltip, Upload } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect, FormattedMessage, useIntl, Dispatch} from 'umi';

import CropImgView from '@/components/CropImgview'
import styles from './BaseView.less';
import { BaseInfoState } from '../../data'

import { GlobalModelState } from '@/models/global'

import moment from 'moment'

interface BaseInfoProps {
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  baseInfo: any
  selectValue: any
  tGUID: string
  dGUID: string
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

  const { 
    canTeacherUse,
    teacherCount,
    canDepartmentUse,
    departmentCount,
    baseInfo,
    selectValue,
    tGUID,
    dGUID,
    dispatch 
  } = props
  
  // 保存指导老师电话
  const [ getTeacher, setGetTeacher ] = useState<string>('')

  // 保存指导部门电话
  const [ getDepartment, setGetDepartment ] = useState<string>('')

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacher(e)
  }

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartment(e)
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacher === '') {
      return
    }

    dispatch({
      type: 'associationBaseInfo/getTeacherCode',
      payload: getTeacher
    })

    dispatch({
      type: 'associationBaseInfo/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartment === '') {
      return
    }

    dispatch({
      type: 'associationBaseInfo/getDepartmentCode',
      payload: getDepartment
    })

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

    console.log(e)

    const form = new FormData()
    form.append('Id', baseInfo.id)
    form.append('NameZh', e.nameZh)
    form.append('NameEn', e.nameEn)
    form.append('Category', e.category)
    form.append('Level', e.level)
    form.append('GuidanceUnit', e.guidanceUnit)
    form.append('PersonNum', e.personNum)
    form.append('SetUpDate', e.startTime.format('YYYY'))
    form.append('TeacherGuid', tGUID)
    form.append('TeacherCode', e.teacherCode)
    form.append('DepartmentGuid', dGUID)
    form.append('DepartmentCode', e.departmentCode)

    if (typeof e.logo !== 'string') {
      form.append('Logo', e.logo.originFileObj)
    }

    if (typeof e.constitution !== 'string') {
      form.append('Constitution', e.constitution.file.originFileObj)
    }

    if (typeof e.thumbnail !== 'string') {
      form.append('Thumbnail', e.thumbnail.originFileObj)
    }
    
    const data = {
      teacher: {
        guid: tGUID,
        code: e.teacherCode
      },
      department: {
        guid: dGUID,
        code: e.departmentCode
      },
      form: form
    }

    dispatch({
      type: 'associationBaseInfo/validationCode',
      payload: data
    })

  }

  return (
    <div className={styles.baseView}>
      <Form
        layout={"horizontal"}
        onFinish={handleFinish}
        initialValues={{
          ...baseInfo,
          startTime: baseInfo ? moment(baseInfo.setUpDate) : ''
        }}
        autoComplete={'off'}
        hideRequiredMark
      >
        <Form.Item
          {...formItemLayout}
          name={"logo"}
          label={intl.formatMessage({ id: 'info.infoBase.logo'})}
        >
          <CropImgView id="associationLogo" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"nameZh"}
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
          name={"nameEn"}
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
          name={"category"}
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
              selectValue.type && selectValue.type.map((item: any, index: number) => (
                <Option value={item.id} key={index}>{item.name}</Option>
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
              selectValue.level && selectValue.level.map((item: any, index: number) => (
                <Option value={item.id} key={index}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"guidanceUnit"}
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
              selectValue.department && selectValue.department.map((item: any, index: number) => (
                <Option value={item.id} key={index}>{item.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"personNum"}
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
          name={"constitution"}
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
          name={"thumbnail"}
          label={intl.formatMessage({ id: 'info.infoBase.syssimpleimg' })}
        >
          <CropImgView id="thumbnail" />
        </Form.Item>
        <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'teacherId'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导老师!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
              {
                baseInfo.instructorInfo && baseInfo.instructorInfo.map((item: any) => (
                  <Option value={item.personId} key={item.personId}>
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
            name={'departmentId'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导部门!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
              {
                baseInfo.instructorInfo && baseInfo.instructorInfo.map((item: any) => (
                  <Option value={item.personId} key={item.personId}>
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
  ({ associationBaseInfo, global }: {
    associationBaseInfo: BaseInfoState,
    global: GlobalModelState
  })=>{
    return {
      canTeacherUse: associationBaseInfo.canTeacherUse,
      teacherCount: associationBaseInfo.teacherCount,
      canDepartmentUse: associationBaseInfo.canDepartmentUse,
      departmentCount: associationBaseInfo.departmentCount,
      baseInfo: global.baseInfo,
      selectValue: global.SelectValue,
      tGUID: associationBaseInfo.tGUID,
      dGUID: associationBaseInfo.dGUID
    }
  }
)(BaseInfo)
