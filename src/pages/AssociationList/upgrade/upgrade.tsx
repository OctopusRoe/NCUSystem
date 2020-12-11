// 社团升级页面

import { Button, Card, Input, Form, Select, Upload, Table } from 'antd';
import { connect, Dispatch } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import Success from './components/success';
import Fail from './components/fail';

import { GlobalModelState } from '@/models/global'
import WaitView from '@/components/waitView'

import { UpgradeState } from './data'

const FormItem = Form.Item;

const { Option } = Select;

interface UpgradeProps {
  submitting: boolean;
  dispatch: Dispatch;
  canTeacherUse: boolean
  teacherCount: number
  canDepartmentUse: boolean
  departmentCount: number
  baseInfo: any
  association: any
  reload: number
  tGUID: string
  dGUID: string
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

const Upgrade: FC<UpgradeProps> = (props) => {

  const {
    canTeacherUse,
    teacherCount,
    canDepartmentUse,
    departmentCount,
    baseInfo,
    association,
    reload,
    tGUID,
    dGUID,
    dispatch
  } = props

  if ( reload === 0 ) {
    return <WaitView />
  }

  if (association === undefined || association?.levelRank === 0) {
    return <Fail />
  }

  if (association && association.isUpgrade) {
    return <Success />
  }

  const data = {
    name: baseInfo?.name ? baseInfo.name : '',
    nameZh: association?.nameZh,
    categoryName: association?.categoryName,
    levelName: association?.levelName,
    guidanceUnitName: association?.guidanceUnitName,
    personNum: association?.personNum,
    setUpdate: association?.setUpDate
  }

  const [, setShowPublicUsers] = React.useState(false);

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

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacher === '') {
      return
    }

    dispatch({
      type: 'associationUpgrade/getTeacherCode',
      payload: getTeacher
    })

    dispatch({
      type: 'associationUpgrade/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartment === '') {
      return
    }

    dispatch({
      type: 'associationUpgrade/getDepartmentCode',
      payload: getTeacher
    })

    dispatch({
      type: 'associationUpgrade/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationUpgrade/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'associationUpgrade/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationUpgrade/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'associationUpgrade/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

  const onFinish = (e: any) => {

    const form = new FormData()
    form.append('PersonId', baseInfo.personId)
    form.append('CommunityId', association.id)
    form.append('Project', e.file.file.originFileObj)
    form.append('TeacherPersonId', e.teacher)
    form.append('TeacherGuid', tGUID)
    form.append('TeacherCode', e.teacherCode)
    form.append('DepartmentId', e.department)
    form.append('DepartmentGuid', dGUID)
    form.append('DepartmentCode', e.departmentCode)

    const data = {
      form: form,
      tGUID: tGUID,
      teacherCode: e.teacherCode,
      dGUID: dGUID,
      departmentCode: e.departmentCode
    }

    dispatch({
      type: 'associationUpgrade/validationCode',
      payload: data
    })
  }

  const columns = [
    {
      title: '年审时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '年审结果',
      dataIndex: 'result',
      key: 'result',
    },
  ];

  if (association && association.isResponsible) {
    return (
      <Card>
        <Form
          key={`${reload}apply`}
          hideRequiredMark
          style={{ paddingTop: '12px' }}
          name="apply"
          initialValues={data}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          autoComplete={'off'}
        >
          <FormItem {...formItemLayout} label={'申请人'} name="name">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'社团名称'} name="nameZh">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'社团类别'} name="categoryName">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'社团级别'} name="levelName">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'指导单位'} name="guidanceUnitName">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'社团成员数'} name="personNum">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'成立年份'} name="setUpdate">
            <Input disabled />
          </FormItem>
          <FormItem {...formItemLayout} label={'年审情况'} name="name">
            <Table columns={columns} bordered size="small" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'材料上传（精品项目）'}
            name="file"
            rules={[
              {
                required: true,
                message: '请上传材料',
              },
            ]}
          >
            <Upload showUploadList={false} fileList={[]}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </FormItem>
          <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
          <Input.Group compact>
            <Form.Item
              name={'teacher'}
              style={{display: 'inline-block', width: '25%'}}
              rules={[{required: true, message: '请选择指导老师!'}]}
            >
              <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
                {
                  association.instructorInfo && association.instructorInfo.map((item: any, index: number) => (
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
              name={'department'}
              style={{display: 'inline-block', width: '25%'}}
              rules={[{required: true, message: '请选择指导部门!'}]}
            >
              <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
                {
                  association.instructorInfo && association.instructorInfo.map((item: any, index: number) => (
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
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" size={'large'}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  // return <Fail />

  return <></>

};

export default connect(
  ({associationUpgrade, global}: {associationUpgrade: UpgradeState, global: GlobalModelState})=>{
    return {
      canTeacherUse: associationUpgrade.canTeacherUse,
      teacherCount: associationUpgrade.teacherCount,
      canDepartmentUse: associationUpgrade.canDepartmentUse,
      departmentCount: associationUpgrade.departmentCount,
      baseInfo: global.baseInfo,
      association: global.association,
      reload: global.reload,
      tGUID: associationUpgrade.tGUID,
      dGUID: associationUpgrade.dGUID
    }
  }
)(Upgrade);
