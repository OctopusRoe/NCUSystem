// 社团注销页面

import React,{ useState, useEffect } from 'react';

import { Card, Form, Input, message, Radio, Button } from 'antd'


import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom'

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

const info: {one: InputInfo, two?: InputInfo, three?: InputInfo} = {
  one: {
    name: 'one',
    message: '请输入成员代表学号!',
    placeHodel: '请输入成员代表学号',
  },
  two: {
    name: 'two',
    message: '请输入成员代表学号来获取姓名!',
    disabled: true,
  }
}

const teacherValue = [{name: '名字1', phone: '11011211911'},{name: '名字2', phone: '11011211119'}]

const FormItem = Form.Item
const { TextArea } = Input

const Delete: React.FC<{}> = () => {

  // 是否显示获取验证码
  const [ showCode, setShowCode ] = useState<boolean>(false)
  // 倒计时按钮是否可用
  const [ canUse, setCanUse ] = useState<boolean>(true)
  // 倒计时时间倒数
  const [ count, setCount ] = useState<number>(1)
  // 保存审批电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  const handleFinish = (e:any) => {
    message.success('ok');
    console.log(e)
  };

  // 选择审批老师电话 value = e.target.value
  const changeValue = (e: any) => {
    setGetTeacherPhone(teacherValue[e.target.value].phone)
    setShowCode(true)
  }

  // 倒计时递归方法
  const countDown = () => {
    setCanUse(false)
    setCount(60)
  }

  // 倒计时的设置
  useEffect(()=> {
    if (count > 1) {
      setTimeout(() => {setCount(count - 1)}, 1000)
    } else {
      setCanUse(true)
    }
  },[count])

  return (
    <Card>
      <Form
        onFinish={handleFinish}
        style={{paddingTop: '12px'}}
        layout={"horizontal"}
        autoComplete={'off'}
        hideRequiredMark
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
          initialValue={''}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'社团类别'}
          name={'association-type'}
          initialValue={''}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'社团级别'}
          name={'association-grade'}
          initialValue={''}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'指导单位'}
          name={'department'}
          initialValue={''}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'成立年份'}
          name={'time'}
          initialValue={''}
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
          name={'student-member'}
        >
          {/* 此处使用的 FormList 组件需要重新开发 */}
          <FormListCom inputTwo inputList={[]} info={info}  onFinish={()=>{console.log('e')}} /> 
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={"pickTeacher"}
          label={'选择审批人'}
          rules={[
            {
              required: true,
              message: '请选择审批人!',
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
        </FormItem>
        <Form.Item 
          {...submitFormLayout}
          name={'codeNumber'}
          style={{display: showCode ? 'block' : 'none'}}
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        >
          <div>
            <Input style={{ width: '35%', borderRight: 'none' }} placeholder={'请输入验证码'}  />
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
          <Button htmlType={'submit'} type={'primary'} size={'large'}>提交</Button>
        </Form.Item>


      </Form>
    </Card>
  );
};

export default Delete;
