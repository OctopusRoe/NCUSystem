import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Result, Upload } from 'antd';
import React from 'react';
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

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        <Form.Item
          label="材料清单"
        >
          <Button> <PrinterOutlined />打印《南昌大学学生社团成立申请表》</Button>
        </Form.Item>
        <Form.Item
          label="拍照上传"
        >
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
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" >
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

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step5);
