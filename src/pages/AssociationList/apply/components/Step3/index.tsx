import React from 'react';
import { Form, Button, Input, Space } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface Step2Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step3: React.FC<Step2Props> = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
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
        payload: 'second',
      });
    }
  };

  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'fifth',
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
          label="指导老师"
          name="teachername"
        >
          <Form.List name="teacher">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        {...field}
                        name={[field.name, 'first']}
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: '请输入工号' }]}
                      >
                        <Input placeholder="请输入工号" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'second']}
                        fieldKey={[field.fieldKey, 'second']}
                        rules={[{ required: true, }]}
                      >
                        <Input disabled={true} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'last']}
                        fieldKey={[field.fieldKey, 'last']}
                        rules={[{ required: true, }]}
                      >
                        <Input disabled={true} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> 点击添加
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="社团成员"
          name="name"
        >

          <Form.List name="users">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        {...field}
                        name={[field.name, 'first']}
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: '请输入学号' }]}
                      >
                        <Input placeholder="请输入学号" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'second']}
                        fieldKey={[field.fieldKey, 'second']}
                        rules={[{ required: true, }]}
                      >
                        <Input disabled={true} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'last']}
                        fieldKey={[field.fieldKey, 'last']}
                        rules={[{ required: true, }]}
                      >
                        <Input disabled={true} />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> 点击添加
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
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
)(Step3);
