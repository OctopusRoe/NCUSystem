import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Radio, Result, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step5: React.FC<Step3Props> = (props) => {
  const { data, dispatch } = props;
  const [radioValue, setradioValue] = useState(0); //单选按钮组
  const [liked, setLiked] = useState(false); //倒计时按钮是否可用
  const [count, setCount] = useState(60); //倒计时时间计数
  const [btnContent, setBtnContent] = useState('获取验证码');
  const [form] = Form.useForm();
  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'third',
      });
    }
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const RadioChange = (e: any) => {
    setradioValue(e.target.value);
  };

  useEffect(() => {
    clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (count > 0 && count < 60) {
      setBtnContent(`${count}S后重发`);
    } else {
      clearInterval(timeChange);
      setLiked(false);
      setCount(60);
      setBtnContent('获取验证码');
    }
  }, [count]);

  let timeChange: NodeJS.Timeout;
  const countDown = () => {
    timeChange = setInterval(() => setCount((t: number) => --t), 1000);
    setLiked(true);
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        <Form.Item label="材料清单">
          <Button>
            <PrinterOutlined />
            打印《南昌大学学生社团成立申请表》
          </Button>
        </Form.Item>
        <Form.Item label="拍照上传">
          <Upload
            name="logo1"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>正面</div>
            </div>
          </Upload>
          <Upload
            name="logo2"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>反面</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          name="phone"
          label="选择审批人"
          rules={[
            {
              required: true,
              message: '请选择审批人',
            },
          ]}
        >
          <Radio.Group onChange={RadioChange} value={radioValue}>
            <Radio style={radioStyle} value={1}>
              Option A
            </Radio>
            <Radio style={radioStyle} value={2}>
              Option B
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          style={{ display: radioValue === 0 ? 'none' : 'block' }}
        >
          <div>
            <Input style={{ width: '35%' }} placeholder={'请输入验证码'} />
            <Button
              style={{ width: '25%' }}
              onClick={countDown}
              disabled={liked}
              type={liked ? 'default':'primary'}
            >
              {/* {liked ? '获取验证码' : `${count}秒后重试`} */}
              {btnContent}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary">提 交</Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step5);
