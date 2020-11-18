// 申请第3步组件

import React, { useState, useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

import FormListCom, { InputInfo } from '@/components/FormListCom/formlistcom';

interface Step2Props {
  data?: StateType['step'];
  dispatch: Dispatch;
  submitting?: boolean;
  teacherValueList: any;
  memberValueList: any;
}

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

const teacherInfo: { one: InputInfo; two: InputInfo; three: InputInfo } = {
  one: {
    message: '请输入工号!',
    placeHodel: '请输入工号',
  },
  two: {
    disabled: true,
  },
  three: {
    disabled: true,
  },
};

const Step3: React.FC<Step2Props> = (props) => {
  const { teacherValueList, memberValueList } = props;
  const [count, setCount] = useState<any>(0);
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
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
  };

  const onValidateForm = async () => {
    if (teacherValueList.length == 0) {
      message.warning('指导老师信息未输入');
    } else if (memberValueList.length == 0) {
      message.warning('社团成员信息未输入');
    } else {
      const values = await validateFields();
      console.log(values);
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
    }
  };

  // 手动控制页面刷新
  useEffect(() => {}, [count]);

  // 指导老师失去焦点后的动作
  const teacherOnBlur = (e: string, i: number) => {
    dispatch({
      type: 'associationApplyStep3/setTeacherValueList',
      payload: [i, e],
    });

    setCount(e);
  };

  // 指导老师点击删除的动作
  const teacherRemove = (i: number) => {
    dispatch({
      type: 'associationApplyStep3/rmTeacherValueList',
      payload: i,
    });
  };

  // 成员列表失去焦点后的动作
  const memberOnBlur = (e: string, i: number) => {
    dispatch({
      type: 'associationApplyStep3/setMemberValueList',
      payload: [i, e],
    });

    setCount(e);
  };

  // 成员列表点击删除的动作
  const memberRemove = (i: number) => {
    dispatch({
      type: 'associationApplyStep3/rmMemberValueList',
      payload: i,
    });
  };

  // 退出组件清除成员列表
  // useEffect(()=>{
  //   return function () {
  //     dispatch({
  //       type: 'associationApplyStep3/cleanAll',
  //       payload: []
  //     })
  //   }
  // },[])

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        autoComplete={'off'}
        onFinish={onFinish}
        initialValues={{ teacherName: teacherValueList, memberName: memberValueList }}
      >
        <Form.Item
          label="指导老师"
          name="teacher"
        >
          <FormListCom
            info={teacherInfo}
            formListName={'teacherName'}
            showInput={{ two: true, three: true }}
            valueList={teacherValueList}
            onBlurFun={teacherOnBlur}
            removeFun={teacherRemove}
          />
        </Form.Item>
        <Form.Item label="社团成员" name="membe">
          <FormListCom
            info={teacherInfo}
            formListName={'memberName'}
            showInput={{ two: true, three: true }}
            valueList={memberValueList}
            onBlurFun={memberOnBlur}
            removeFun={memberRemove}
          />
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
          <Button type="primary" onClick={onValidateForm} htmlType="submit" loading={submitting}>
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
    associationApplyStep3,
  }: {
    formAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
    associationApplyStep3: {
      teacherValueList: any[];
      memberValueList: any[];
    };
  }) => ({
    submitting: loading.effects['formAndstepForm/submitStepForm'],
    data: formAndstepForm.step,
    teacherValueList: associationApplyStep3.teacherValueList,
    memberValueList: associationApplyStep3.memberValueList,
  }),
)(Step3);
