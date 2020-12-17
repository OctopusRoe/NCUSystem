// 申请最后1步组件

import React, { useEffect, useState } from 'react';
import ApplyUploadView from '@/components/ApplyUploadView/uploadView';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { StateType } from '../../model';
import { BaseInfoState, } from './data'
import { StepstateType } from './model';

import { GlobalModelState } from '@/models/global'


interface Step3Props {
  data?: StateType['step'];
  dispatch: Dispatch;
  submitting?: boolean;
  association: any;
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
  const {
    data,
    dispatch,
    submitting,
  } = props;


  const [form] = Form.useForm();
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
        payload: 'third',
      });
    }
  };

  const onFinish = (value: any) => { };
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  };


  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item label="材料清单">
          <Button>
            <PrinterOutlined />
            打印《南昌大学学生社团成立申请表》
          </Button>
        </Form.Item>
        <Form.Item
          label="拍照上传"
          name="Front"
          rules={[{ required: true, message: '请上传申请材料正面' }]}
        >
          <ApplyUploadView id="Front" imgTip="正面" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          name="Opposite"
          rules={[{ required: true, message: '请上传申请材料反面' }]}
        >
          <ApplyUploadView id="Opposite" imgTip="反面" />
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
          <Button type="primary" htmlType={'submit'} onClick={onValidateForm} loading={submitting}>
            提 交
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
    global,
  }: {
    formAndstepForm: StateType;
    applyStep5: StepstateType;
    global: GlobalModelState;
    associationBaseInfo: BaseInfoState;
  }) => ({
    data: formAndstepForm.step,
    association: global.association,
  }),
)(Step5);
