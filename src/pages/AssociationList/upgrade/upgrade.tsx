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
  submitting: boolean
  dispatch: Dispatch
  baseInfo: any
  association: any
  reload: number
  departmentList: any
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

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

const Upgrade: FC<UpgradeProps> = (props) => {

  const {
    baseInfo,
    association,
    reload,
    departmentList,
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

  const [, setShowPublicUsers] = React.useState(false)

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo)
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2')
  };

  // 指导部门选择改变
  const selectDepartmentChange = (e: number) => {
    // 点击部门后去请求接口，获取老师列表
  }

  const onFinish = (e: any) => {

    const form = new FormData()
    form.append('PersonId', baseInfo.personId)
    form.append('CommunityId', association.id)
    form.append('Project', e.file.file.originFileObj)
    form.append('TeacherPersonId', e.teacher)
    form.append('DepartmentId', e.department)

    const data = {
      form: form,
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
          <FormItem
            {...formItemLayout}
            label={'指导部门'}
            name={'selectDepartment'}
          >
            <Select
              showSearch
              style={{width: '50%'}}
              placeholder={'请选择'}
              onChange={selectDepartmentChange}
            >
              {getOption(departmentList)}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'指导老师'}
            name={'selectTeacher'}
          >
            <Select
              showSearch
              style={{width: '50%'}}
              placeholder={'请选择'}
            >
              {getOption(departmentList)}
            </Select>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" size={'large'}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  return <></>

};

export default connect(
  ({associationUpgrade, global}: {associationUpgrade: UpgradeState, global: GlobalModelState})=>{
    return {
      baseInfo: global.baseInfo,
      association: global.association,
      reload: global.reload,
      departmentList: global.SelectValue.department
    }
  }
)(Upgrade);
