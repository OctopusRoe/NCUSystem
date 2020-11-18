// 申请第2步组件
import React from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const Step2: React.FC<Step2Props> = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { getFieldsValue } = form;
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
        payload: 'info',
      });
    }
  };

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'third',
      });
    }
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        autoComplete="off"
      >
        <Form.Item label="姓名" name="name">
          <Input style={{ width: '50%' }} disabled={true} />
        </Form.Item>
        <Form.Item label="学号" name="stuid">
          <Input style={{ width: '50%' }} disabled={true} />
        </Form.Item>
        <Form.Item
          label="是否挂科"
          name="test"
          rules={[{ required: true, message: '请选择是否挂科' }]}
        >
          <Radio.Group>
            <Radio value="true">是</Radio>
            <Radio value="false">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="学习成绩班级排名"
          name="ranking"
          rules={[{ required: true, message: '请输入学习成绩班级排名' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>%</div>} />
        </Form.Item>
        <Form.Item
          label="在校期间所获荣誉"
          name="honor"
          rules={[{ required: true, message: '请输入校期间所获荣誉' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入在校期间所获荣誉" />
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
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            下一步
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(
  ({
    formAndstepForm,
    loading,
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
  }),
)(Step2);
