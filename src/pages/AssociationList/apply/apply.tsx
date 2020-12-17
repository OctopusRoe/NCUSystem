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
import WaitView from '@/components/waitView/index';

const { Step } = Steps;
export interface GlobalModelState {
  association: any;
  global: any;
  reload: any;
}
interface StepFormProps {
  current: StateType['current'];
  association: any;
  global: any;
  reload: any;
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'second':
      return { step: 1, component: <Step2 /> };
    case 'third':
      return { step: 2, component: <Step3 /> };
    case 'fifth':
      return { step: 4, component: <Step5 /> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const StepForm: React.FC<StepFormProps> = ({ current, association, reload }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  if (reload === 0) {
    //加载中
  } else if (association === undefined) {
    //未注册社团----注册页面
  } else if (association !== undefined) {
    //已注册一个社团---无权限
  }

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: association === undefined ? 'block' : 'none' }}>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="社团基本信息填写" />
            <Step title="社团发起人信息填写" />
            <Step title="社团组织成员信息填写" />
            <Step title="申请材料提交" />
          </Steps>
          {stepComponent}
          <Success />
        </div>

        <div style={{ display: association === undefined || reload === 0 ? 'none' : 'block' }}>
          <Fail
            nameEN={association !== undefined ? association.nameEn : ''}
            nameZH={association !== undefined ? association.nameZh : ''}
          />
        </div>
        <div style={{ display: reload === 0 ? 'block' : 'none' }}>
          <WaitView />
        </div>
      </Card>
    </>
  );
};

export default connect(
  ({ formAndstepForm, global }: { formAndstepForm: StateType; global: GlobalModelState }) => ({
    current: formAndstepForm.current,
    association: global.association,
    reload: global.reload,
  }),
)(StepForm);
