// 基本信息 组件
import React, { useState, useEffect } from 'react';

import { Button, Input, Form, Select, DatePicker, Tooltip, Upload } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect, FormattedMessage, useIntl, Dispatch} from 'umi';

import CropImgView from '@/components/CropImgview'
import styles from './BaseView.less';
import { BaseInfoState } from '../../data'

import { GlobalModelState } from '@/models/global'

import moment from 'moment'

interface BaseInfoProps {
  association: any
  selectValue: any
  reload: number
  departmentList: any
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

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

const BaseInfo: React.FC<BaseInfoProps> = (props) => {

  const intl = useIntl()

  const {
    association,
    selectValue,
    reload,
    departmentList,
    dispatch
  } = props

  // const [ info ] = associationList.filter((item: any) => item.isResponsible)

  // 指导部门选择改变
  const selectDepartmentChange = (e: number) => {
    // 点击部门后去请求接口，获取老师列表
  }

  // 表单数据获取
  const handleFinish = (e:any) => {

    console.log(e)

    const form = new FormData()
    form.append('Id', association.id)
    form.append('NameZh', e.nameZh)
    form.append('NameEn', e.nameEn)
    form.append('Category', e.category)
    form.append('Level', e.level)
    form.append('GuidanceUnit', e.guidanceUnit)
    form.append('PersonNum', e.personNum)
    form.append('SetUpDate', e.startTime.format('YYYY'))

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
        key={reload}
        layout={"horizontal"}
        onFinish={handleFinish}
        initialValues={{
          ...association,
          startTime: association ? moment(association.setUpDate) : ''
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
        <Form.Item
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
          </Form.Item>
          <Form.Item
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
      association: global.association,
      reload: global.reload,
      selectValue: global.SelectValue,

      departmentList: global.SelectValue.department
    }
  }
)(BaseInfo)
