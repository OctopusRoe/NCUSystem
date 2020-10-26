// 报名设置 组件
import React, { Component } from 'react';

import {
  Button,
  Input,
  Form,
  message,
  Modal,
  Select,
  DatePicker,
  Card
} from 'antd';
import { FormattedMessage, formatMessage, connect } from 'umi';

// import { CurrentUser } from '../data.d';
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
  // currentUser?: CurrentUser;
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

const formInfo = {
  teacherValue: [{name: '名字1', phone: '11011211911'},{name: '名字2', phone: '11011211119'}],
  associationType: ['类别1', '类别2', '类别3', '类别4'],
  associationGrade: ['级别1', '级别2', '级别3', '级别4'],
  department: ['部门1', '部门2', '部门3', '部门4']
}


const { Option } = Select;
const { RangePicker } = DatePicker;

class Setting extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props);
  }

  handleFinish = (e: any) => {
    message.success(formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e);
  };

  // 获取图片数据
  testOne = (e: any) => {
    console.log(e);
  };


  render() {
    const { department } = formInfo;

    return (
      <Card className={styles.baseView} >
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
      </Card>
    );
  }
}

export default connect()(Setting)
