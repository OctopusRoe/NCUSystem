// 基本信息 组件
import React, { Component } from 'react';

import { Button, Input, Form, message, Modal, Select, DatePicker, Tooltip, Upload, Radio } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { FormattedMessage, formatMessage} from 'umi';

import { CurrentUser } from '../data.d';
import UploadView from '@/components/UploadView/uploadView'
import styles from './BaseView.less';

interface FormInfo {
  teacherValue: {name: string, phone: string}[]
  associationType: string[]
  associationGrade: string[]
  department: string[]
}

interface BaseViewProps {
  formInfo: FormInfo
  currentUser?: CurrentUser;
}

interface BaseViewState {
  visible: boolean
  [name: string]: any
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

class BaseInfo extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      showCode: false,      // 是否显示获取验证码
      getTeacherPhone: '',  // 保存审批电话
      liked: true,          // 倒计时按钮是否可用
      count: 1              // 倒计时时间倒数
    }
  }

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (e:any) => {
    message.success(formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e)
  };

  test = (e: any) => {
    console.log(e)
  }

  // 获取图片数据
  testOne = (e: any) => {
    console.log(e)
  }

  // 获取验证码的方法
  getCode = async (e: any) => {
    if (this.state.getTeacherPhone !== '') {
      this.countDown()
      console.log('以获取电话号码', this.state.getTeacherPhone)
    } else {
      message.warning({
        content: '请选择审批老师',
        duration: 5
      })
    }
  }

  // 选择审批老师电话
  changeValue = (e: any) => {
    this.setState({
      getTeacherPhone: this.props.formInfo.teacherValue[e.target.value].phone,
      showCode: true
    })
  }

  // 倒计时递归方法
  countDown = () => {
    const count = this.state.count
    if (count === 1) {//当为0的时候，liked设置为true，button按钮显示内容为 获取验证码
        this.setState({
            count: 60,
            liked: true,
        })
    } else {
        this.setState({
            count: count - 1,
            liked: false,
        })
        setTimeout(() => this.countDown(), 1000)//每一秒调用一次
    }
  }

  render() {
    const { currentUser, formInfo } = this.props;
    const { teacherValue, associationType, associationGrade, department } = formInfo

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <Form
          layout={"horizontal"}
          onFinish={this.handleFinish}
          initialValues={currentUser}
          autoComplete={'off'}
          hideRequiredMark
        >
          <Form.Item
            {...formItemLayout}
            name={"logo"}
            label={formatMessage({ id: 'info.infoBase.logo'})}
          >
            <UploadView id="logoImg" name="logo" title="学校LOGO" onChange={this.testOne.bind(this)} />
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
            <UploadView id="backgroundImg" name="background" title="登录页背景" />
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
            <Radio.Group onChange={this.changeValue}>
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
            style={{display: this.state.showCode ? 'block' : 'none'}}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.codeNumber-message' }, {}),
              },
            ]}
          >
            <div>
              <Input style={{ width: '35%' }} placeholder={'请输入验证码'} />
              <Button
                style={{width: '25%'}}
                onClick={this.countDown}
                disabled={this.state.liked ? false : true}
                type={this.state.liked ? 'primary' : 'default'}
              >
                {this.state.liked ? '获取验证码' : `${this.state.count}秒后重试`}
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
        <Modal
          visible={this.state.visible}
        >
        </Modal>
      </div>
    );
  }
}

export default BaseInfo;
