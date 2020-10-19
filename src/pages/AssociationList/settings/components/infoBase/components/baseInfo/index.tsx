// 基本信息 组件

import { Button, Input, Form, message, Modal, Radio, Space } from 'antd';
import { FormattedMessage, formatMessage} from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import UploadView from '@/components/UploadView/uploadView'
import styles from './BaseView.less';

interface BaseViewProps {
  teacherValue: {name: string, phone: string}[]
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

class BaseInfo extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
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

  testOne = (e: any) => {
    console.log(e)
  }

  getCode = (e: any) => {
    console.log(e)
  }

  render() {
    const { currentUser, teacherValue } = this.props;

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
            <Input placeholder="请输入社团类别" />
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
            <Input placeholder="请输入社团级别" />
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
            <Input placeholder="请输入指导部门" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"member"}
            label={formatMessage({ id: 'info.infoBase.member' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.member-message' }, {}),
              },
            ]}
          >
            <Input placeholder="请输入成员数量" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"regulations"}
            label={formatMessage({ id: 'info.infoBase.regulations' })}
          >
            <UploadView id="regulations" name="regulations" title="regulations" />
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
            <Input placeholder="请输入成立时间" />
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
            label={formatMessage({ id: 'info.infoBase.teacher'})}
          >
            <Radio.Group>
              {teacherValue.map((item:any,index:number)=>{
                return (
                  <Radio style={radioStyle} value={index} key={index}>
                    <Space>
                      <div>{item.name}</div>
                      <div>{item.phone}</div>
                    </Space>
                  </Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"verification"}
            label={formatMessage({ id: 'info.infoBase.teacher'})}
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...submitFormLayout}
          >
            <div>
              <Button htmlType="submit" type="primary">
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
