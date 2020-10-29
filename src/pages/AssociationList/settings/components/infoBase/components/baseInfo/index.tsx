// 基本信息 组件
import React, { useState, useEffect } from 'react';

import { Button, Input, Form, message, Select, DatePicker, Tooltip, Upload, Radio } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage} from 'umi';

import CropImgView from '@/components/CropImgview'
import styles from './BaseView.less';

interface FormInfo {
  teacherValue: {name: string, phone: string}[]
  associationType: string[]
  associationGrade: string[]
  department: string[]
}

interface BaseInfoProps {
  formInfo: FormInfo
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


const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const { Option } = Select


const BaseInfo: React.FC<BaseInfoProps> = (props) => {

  // 是否显示获取验证码
  const [ showCode, setShowCode ] = useState<boolean>(false)
  // 倒计时按钮是否可用
  const [ canUse, setCanUse ] = useState<boolean>(true)
  // 倒计时时间倒数
  const [ count, setCount ] = useState<number>(1)
  // 保存审批电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  const handleFinish = (e:any) => {
    message.success(formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e)
  };

  // 获取图片数据
  const testOne = (e: any) => {
    console.log(e)
  }

  // 选择审批老师电话
  const changeValue = (e: any) => {
    setGetTeacherPhone(props.formInfo.teacherValue[e.target.value].phone)
    setShowCode(true)
  }

  // 倒计时递归方法
  const countDown = () => {
    setCanUse(false)
    setCount(60)
  }

  useEffect(()=> {
    if (count > 1) {
      setTimeout(() => {setCount(count - 1)}, 1000)
    } else {
      setCanUse(true)
    }
  },[count])

  const { formInfo } = props;
  const { teacherValue, associationType, associationGrade, department } = formInfo

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
          label={formatMessage({ id: 'info.infoBase.logo'})}
        >
          <CropImgView id="associationLogo" onChange={testOne.bind(this)} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"fullname-cn"}
          label={formatMessage({ id: 'info.infoBase.fullname-cn' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.fullname-cn-message' }, {}),
            },
          ]}
        >
          <Input placeholder="请输入社团中文全称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"fullname-en"}
          label={formatMessage({ id: 'info.infoBase.fullname-en' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.fullname-en-message' }, {}),
            },
          ]}
        >
          <Input placeholder="请输入社团英文全称" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"typeof"}
          label={formatMessage({ id: 'info.infoBase.typeof' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.typeof-message' }, {}),
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
          label={formatMessage({ id: 'info.infoBase.level' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.level-message' }, {}),
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
          label={formatMessage({ id: 'info.infoBase.department' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.department-message' }, {}),
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
          label={formatMessage({ id: 'info.infoBase.regulations' })}
        >
          <Upload showUploadList={false} fileList={[]}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"startTime"}
          label={formatMessage({ id: 'info.infoBase.startTime' })}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.startTime-message' }, {}),
            },
          ]}
        >
          <DatePicker picker="year" style={{width: '100%'}}></DatePicker>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"syssimpleimg"}
          label={formatMessage({ id: 'info.infoBase.syssimpleimg' })}
        >
          <CropImgView id="syssimpleimg" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name={"pickTeacher"}
          label={formatMessage({ id: 'info.infoBase.pickeLeader'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.pickeLeader-message' }, {}),
            },
          ]}
        >
          <Radio.Group onChange={changeValue}>
            {
              teacherValue.map((item: any, index: number) => (
                <Radio style={radioStyle} value={index} key={index}>{`${item.name} - ${item.phone}`}</Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item 
          {...submitFormLayout}
          name={'codeNumber'}
          style={{display: showCode ? 'block' : 'none'}}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'info.infoBase.codeNumber-message' }, {}),
            },
          ]}
        >
          <div>
            <Input style={{ width: '35%', borderRight: 'none' }} placeholder={'请输入验证码'} />
            <Button
              style={{width: '25%'}}
              onClick={countDown}
              disabled={canUse ? false : true}
              type={canUse? 'primary' : 'default'}
            >
              {canUse ? '获取验证码' : `${count}秒后重试`}
            </Button>
          </div>
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

export default BaseInfo;
