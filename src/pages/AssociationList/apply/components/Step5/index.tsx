// 申请最后1步组件

import { PlusOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';

import styles from './index.less';

import { StepstateType } from './model'

interface Step3Props {
  data?: StateType['step'];
  dispatch: Dispatch;
  formInfo: FormInfo;
  canTeacherUse: boolean;
  teacherCount: number;
  canDepartmentUse: boolean;
  departmentCount: number;
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

const { Option } = Select;

const Step5: React.FC<Step3Props> = (props) => {
  const { data, dispatch, formInfo, canTeacherUse, teacherCount, canDepartmentUse, departmentCount } = props;
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

  const { teacherValue, associationType, associationGrade, department } = formInfo;

  // 保存指导老师电话
  const [ getTeacherPhone, setGetTeacherPhone ] = useState<string>('')

  // 保存指导部门电话
  const [ getDepartmentPhone, setGetDepartmentPhone ] = useState<string>('')

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacherPhone(e)
  }

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartmentPhone(e)
  }

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacherPhone === '') {
      return
    }
    dispatch({
      type: 'applyStep5/setTeacherCount',
      payload: [60, false]
    })
  }

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartmentPhone === '') {
      return
    }
    dispatch({
      type: 'applyStep5/setDepartmentCount',
      payload: [60, false]
    })
  }

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'applyStep5/setTeacherCount',
          payload: [teacherCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'applyStep5/setTeacherCount',
        payload: [1, true]
      })
    }
  },[teacherCount])

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'applyStep5/setDepartmentCount',
          payload: [departmentCount - 1, false]
        })
      }, 1000)
    } else {
      dispatch({
        type: 'applyStep5/setDepartmentCount',
        payload: [1, true]
      })
    }
  }, [departmentCount])

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
        <Form.Item  {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'teacherPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导老师!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'teacherCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
          <Button
            style={{width: '25%'}}
            onClick={teacherCountDown}
            disabled={canTeacherUse ? false : true}
            type={canTeacherUse ? 'primary' : 'default'}
          >
            {canTeacherUse ? '点击获取' : `${teacherCount}秒后重试`}
          </Button>
        </Input.Group>
      </Form.Item>
      <Form.Item  {...formItemLayout} label={'指导部门审批'} style={{ marginBottom: '0px'}}>
        <Input.Group compact>
          <Form.Item
            name={'departmentPhone'}
            style={{display: 'inline-block', width: '25%'}}
            rules={[{required: true, message: '请选择指导部门!'}]}
          >
            <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
              {
                teacherValue.map((item: any, index: number) => (
                  <Option value={item.phone} key={index}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            name={'departmentCode'}
            style={{display: 'inline-block', width: '50%'}}
            rules={[{required: true, message: '请输入手机验证码!'}]}
          >
            <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
          </Form.Item>
          <Button
            style={{width: '25%'}}
            onClick={departmentCountDown}
            disabled={canDepartmentUse ? false : true}
            type={canDepartmentUse ? 'primary' : 'default'}
          >
            {canDepartmentUse ? '点击获取' : `${departmentCount}秒后重试`}
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
          <Button type="primary" htmlType={'submit'}>提 交</Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(({ formAndstepForm, applyStep5 }: { formAndstepForm: StateType, applyStep5: StepstateType }) => ({
  data: formAndstepForm.step,
  canTeacherUse: applyStep5.canTeacherUse,
  teacherCount: applyStep5.teacherCount,
  canDepartmentUse: applyStep5.canDepartmentUse,
  departmentCount: applyStep5.departmentCount,
}))(Step5);
