// 申请最后1步组件

import ApplyUploadView from '@/components/ApplyUploadView/uploadView';
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { StateType } from '../../model';

import { StepstateType } from './model';

export interface GlobalModelState {
  baseInfo: any;
}

export interface BaseInfoState {
  canTeacherUse: boolean;
  teacherCount: number;
  canDepartmentUse: boolean;
  departmentCount: number;
  tGUID: string;
  dGUID: string;
}

interface Step3Props {
  data?: StateType['step'];
  dispatch: Dispatch;
  formInfo: FormInfo;
  canTeacherUse: boolean;
  teacherCount: number;
  canDepartmentUse: boolean;
  departmentCount: number;
  submitting?: boolean;
  baseInfo: any;
  tGUID: string;
  dGUID: string;
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
  const {
    data,
    dispatch,
    canTeacherUse,
    teacherCount,
    canDepartmentUse,
    departmentCount,
    submitting,
    baseInfo,
    tGUID,
    dGUID,
  } = props;
  const [form] = Form.useForm();
  if (!data) {
    return null;
  }

  console.log(baseInfo);

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

  // 保存指导老师电话
  const [getTeacher, setGetTeacher] = useState<string>('');

  // 保存指导部门电话
  const [getDepartment, setGetDepartment] = useState<string>('');

  // 选择指导老师电话
  const selectTeacher = (e: string) => {
    setGetTeacher(e);
  };

  // 选择指导部门电话
  const selectDepartment = (e: string) => {
    setGetDepartment(e);
  };

  // 老师设置倒计时方法
  const teacherCountDown = () => {
    if (getTeacher === '') {
      return;
    }
    dispatch({
      type: 'associationBaseInfo/getTeacherCode',
      payload: getTeacher,
    });

    dispatch({
      type: 'associationBaseInfo/setTeacherCount',
      payload: [60, false],
    });
  };

  // 部门设置倒计时方法
  const departmentCountDown = () => {
    if (getDepartment === '') {
      return;
    }
    dispatch({
      type: 'associationBaseInfo/getDepartmentCode',
      payload: getDepartment,
    });

    dispatch({
      type: 'associationBaseInfo/setDepartmentCount',
      payload: [60, false],
    });
  };

  // 老师倒计时
  useEffect(() => {
    if (teacherCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationBaseInfo/setTeacherCount',
          payload: [teacherCount - 1, false],
        });
      }, 1000);
    } else {
      dispatch({
        type: 'associationBaseInfo/setTeacherCount',
        payload: [1, true],
      });
    }
  }, [teacherCount]);

  // 部门倒计时
  useEffect(() => {
    if (departmentCount > 1) {
      setTimeout(() => {
        dispatch({
          type: 'associationBaseInfo/setDepartmentCount',
          payload: [departmentCount - 1, false],
        });
      }, 1000);
    } else {
      dispatch({
        type: 'associationBaseInfo/setDepartmentCount',
        payload: [1, true],
      });
    }
  }, [departmentCount]);

  const onFinish = (value: any) => {};
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/submitStepForm',
        payload: {
          ...data,
          ...values,
          TeacherGuid: tGUID,
          DepartmentGuid: dGUID,
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
        <Form.Item {...formItemLayout} label={'指导老师审批'} style={{ marginBottom: '0px' }}>
          <Input.Group compact>
            <Form.Item
              name={'Teacher'}
              style={{ display: 'inline-block', width: '25%' }}
              rules={[{ required: true, message: '请选择指导老师!' }]}
            >
              <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectTeacher}>
                {baseInfo.communityList[0].instructorInfo.map((item: any) => (
                  <Option value={item.personId} key={item.personId}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={'TeacherCode'}
              style={{ display: 'inline-block', width: '50%' }}
              rules={[{ required: true, message: '请输入手机验证码!' }]}
            >
              <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            </Form.Item>
            <Button
              style={{ width: '25%' }}
              onClick={teacherCountDown}
              disabled={canTeacherUse ? false : true}
              type={canTeacherUse ? 'primary' : 'default'}
            >
              {canTeacherUse ? '点击获取' : `${teacherCount}秒后重试`}
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item {...formItemLayout} label={'指导部门审批'} style={{ marginBottom: '0px' }}>
          <Input.Group compact>
            <Form.Item
              name={'Department'}
              style={{ display: 'inline-block', width: '25%' }}
              rules={[{ required: true, message: '请选择指导部门!' }]}
            >
              <Select style={{ width: '100%' }} placeholder={'请选择'} onChange={selectDepartment}>
                {baseInfo.communityList[0].instructorInfo.map((item: any) => (
                  <Option value={item.personId} key={item.personId}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={'DepartmentCode'}
              style={{ display: 'inline-block', width: '50%' }}
              rules={[{ required: true, message: '请输入手机验证码!' }]}
            >
              <Input style={{ borderRight: 'none' }} placeholder={'请输入手机验证码'} />
            </Form.Item>
            <Button
              style={{ width: '25%' }}
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
    associationBaseInfo,
  }: {
    formAndstepForm: StateType;
    applyStep5: StepstateType;
    global: GlobalModelState;
    associationBaseInfo: BaseInfoState;
  }) => ({
    data: formAndstepForm.step,
    canTeacherUse: associationBaseInfo.canTeacherUse,
    teacherCount: associationBaseInfo.teacherCount,
    canDepartmentUse: associationBaseInfo.canDepartmentUse,
    departmentCount: associationBaseInfo.departmentCount,
    baseInfo: global.baseInfo,
    tGUID: associationBaseInfo.tGUID,
    dGUID: associationBaseInfo.dGUID,
  }),
)(Step5);
