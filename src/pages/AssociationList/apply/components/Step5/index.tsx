// 申请最后1步组件

import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  formInfo: FormInfo;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

interface FormInfo {
  teacherValue: { name: string; phone: string }[];
  associationType: string[];
  associationGrade: string[];
  department: string[];
}

const Step5: React.FC<Step3Props> = (props) => {
  const { data, dispatch, formInfo } = props;
  const [canUse, setCanUse] = useState<boolean>(true); //倒计时按钮是否可用
  const [count, setCount] = useState(60); //倒计时时间计数
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

  const countDown = () => {
    setCanUse(false);
    setCount(60);
  };

  useEffect(() => {
    if (count > 1) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      setCanUse(true);
    }
  }, [count]);

  const { teacherValue, associationType, associationGrade, department } = formInfo;
  const { Option } = Select;
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
        <Form.Item name={'pickTeacher'} label={'指导老师审批'}>
          <Input.Group compact>
            <Select style={{ width: '25%' }} placeholder={'请选择'}>
              {teacherValue.map((item: any, index: number) => (
                <Option value={item.phone} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            <Button
              style={{ width: '25%' }}
              onClick={countDown}
              disabled={canUse ? false : true}
              type={canUse ? 'primary' : 'default'}
            >
              {canUse ? '点击获取' : `${count}秒后重试`}
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item name={'pickDepartment'} label={'指导部门审批'}>
          <Input.Group compact>
            <Select style={{ width: '25%' }} placeholder={'请选择'}>
              {teacherValue.map((item: any, index: number) => (
                <Option value={item.phone} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Input style={{ width: '50%', borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            <Button
              style={{ width: '25%' }}
              onClick={countDown}
              disabled={canUse ? false : true}
              type={canUse ? 'primary' : 'default'}
            >
              {canUse ? '点击获取' : `${count}秒后重试`}
            </Button>
          </Input.Group>
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
