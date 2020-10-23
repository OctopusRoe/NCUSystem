// 基本信息 组件
import React, { Component } from 'react';

import {
  Button,
  Input,
  Form,
  message,
  Modal,
  Select,
  DatePicker,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi';

import { CurrentUser } from '../data.d';
import CropImgView from '@/components/CropImgview';
import styles from './BaseView.less';
import TextArea from 'antd/lib/input/TextArea';

interface FormInfo {
  teacherValue: { name: string; phone: string }[];
  associationType: string[];
  associationGrade: string[];
  department: string[];
}

interface BaseViewProps {
  formInfo: FormInfo;
  currentUser?: CurrentUser;
}

interface BaseViewState {
  visible: boolean;
  [name: string]: any;
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
const { RangePicker } = DatePicker;
class Setting extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      showCode: false, // 是否显示获取验证码
      getTeacherPhone: '', // 保存审批电话
      liked: true, // 倒计时按钮是否可用
      count: 1, // 倒计时时间倒数
    };
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

  handleFinish = (e: any) => {
    message.success(formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e);
  };

  test = (e: any) => {
    console.log(e);
  };

  // 获取图片数据
  testOne = (e: any) => {
    console.log(e);
  };


  render() {
    const { formInfo } = this.props;
    const { department } = formInfo;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <Form
          layout={'horizontal'}
          onFinish={this.handleFinish}
          // initialValues={currentUser}
          autoComplete={'off'}
          hideRequiredMark
        >
          <Form.Item
            {...formItemLayout}
            name={'class'}
            label={formatMessage({ id: 'info.infoBase.class' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.class-message' }, {}),
              },
            ]}
          >
            <Select placeholder={'请选择届数'}>
              {department.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={'logo'}
            label={formatMessage({ id: 'info.infoBase.code' })}
          >
            <CropImgView id="associationLogo" onChange={this.testOne.bind(this)} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name={'department'}
            label={formatMessage({ id: 'info.infoBase.department' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.department-message' }, {}),
              },
            ]}
          >
            <Select placeholder={'请选择部门'}>
              {department.map((item: any, index: number) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={'requirements'}
            label="招新要求"
            rules={[{ required: true, message: '请输入招新要求' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={'count'}
            label={
              <span>
                招新人数
                {/* <span style={{ color: '#00000073' }}>
                  （最高）
                  <Tooltip title="超过最高数后无法加入新成员">
                    <QuestionCircleOutlined style={{ marginRight: 4 }} />
                  </Tooltip>
                  &nbsp;
                </span> */}
              </span>
            }
            rules={[{ required: true, message: '请输入招新人数' }]}
          >
            <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name={'time'}
            label="报名时间"
            rules={[{ required: true, message: '请选择报名时间' }]}
          >
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              //   onChange={onChange}
              //   onOk={onOk}
            />
          </Form.Item>
          <Form.Item {...submitFormLayout}>
            <div>
              <Button htmlType="submit" type="primary" size={'large'}>
                <FormattedMessage id="setting.basic.update" defaultMessage="Update Information" />
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Modal visible={this.state.visible}></Modal>
      </div>
    );
  }
}

export default Setting;
