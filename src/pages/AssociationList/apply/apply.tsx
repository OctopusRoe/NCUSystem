// 注册申请 组件

import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { connect } from 'umi';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step5 from './components/Step5';
import styles from './style.less';
import Success from './components/result/success';
import Fail from './components/result/fail';

const { Step } = Steps;

interface StepFormProps {
  current: StateType['current'];
}

const formInfo = {
  teacherValue: [{name: '名字1', phone: '11011211911'},{name: '名字2', phone: '11011211119'}],
  associationType: ['类别1', '类别2', '类别3', '类别4'],
  associationGrade: ['级别1', '级别2', '级别3', '级别4'],
  department: ['部门1', '部门2', '部门3', '部门4']
}
const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'second':
      return { step: 1, component: <Step2 /> };
    case 'third':
      return { step: 2, component: <Step3 /> };
    case 'fifth':
      return { step: 4, component: <Step5 formInfo={formInfo}/> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const StepForm: React.FC<StepFormProps> = ({ current }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <>
      <Card bordered={false}>
        <div>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="社团基本信息填写" />
            <Step title="社团发起人信息填写" />
            <Step title="社团组织成员信息填写" />
            <Step title="申请材料提交" />
          </Steps>
          {stepComponent}
        </div>
        <Success/>
        <Fail/>
      </Card>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  current: formAndstepForm.current,
}))(StepForm);
