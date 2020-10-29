// 基础设置 页面

import React from 'react';

import { Button, Input, Form, message,  Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { connect, FormattedMessage,  useIntl} from 'umi';

import { CurrentUser } from '../data.d';
import UploadView from '@/components/UploadView/uploadView'
import styles from './BaseView.less';

interface BaseViewProps {
  currentUser?: CurrentUser;
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

const BaseView: React.FC<BaseViewProps> = (props) => {

  const intl = useIntl()

  const getAvatarURL = () => {
    const { currentUser } = props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  const handleFinish = (e:any) => {
    message.success(intl.formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e)
  }

  const testOne = (e: any) => {
    console.log(e)
  }

    const { currentUser } = props;

    return (
      <div className={styles.baseView}>
        <Form
          layout={"horizontal"}
          onFinish={handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            {...formItemLayout}
            name={"fullname"}
            label={intl.formatMessage({ id: 'setting.basic.fullname' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.fullname-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入学校名称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"syssimplename"}
            label={intl.formatMessage({ id: 'setting.basic.syssimplename' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.syssimplename-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入系统简称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"sysfullname"}
            label={intl.formatMessage({ id: 'setting.basic.sysfullname' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.profile-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入系统全称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"copyright"}
            label={intl.formatMessage({ id: 'setting.basic.copyright' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.copyright-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入版权信息" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"help"}
            label={intl.formatMessage({ id: 'setting.basic.help'})}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.help-message' }, {}),
              },
            ]}
          >
            <Upload
              accept={"application/pdf"}
              showUploadList={false}
              fileList={[]}
            >
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"logo"}
            label={intl.formatMessage({ id: 'setting.basic.logo'})}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.logo-message' }, {}),
              },
            ]}
          >
            <UploadView id="logoImg" onChange={testOne} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"favicon"}
            label={intl.formatMessage({ id: 'setting.basic.favicon' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.favicon-message' }, {}),
              },
            ]}
          >
            <UploadView id="faviconImg" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"background"}
            label={intl.formatMessage({ id: 'setting.basic.background' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.background-message' }, {}),
              },
            ]}
          >
            <UploadView id="backgroundImg" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"logonLogo"}
            label={intl.formatMessage({ id: 'setting.basic.logonLogo' })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'setting.basic.logonLogo-message' }, {}),
              },
            ]}
          >
            <UploadView id="logonLogoImg" />
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
      </div>
    );
}


export default connect()(BaseView);
