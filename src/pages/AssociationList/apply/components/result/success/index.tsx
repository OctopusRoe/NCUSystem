import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React, { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';
import { SuccessProps } from 'antd/lib/progress/progress';
import classNames from 'classnames';

const { Step } = Steps;

// const desc1 = (
//   <div className={styles.title}>
//     <div style={{ margin: '8px 0 4px' }}>
//       <FormattedMessage id="resultandsuccess.success.step1-operator" defaultMessage="Qu Lili" />
//     </div>
//     <div>2016-12-12 12:32</div>
//   </div>
// );

// const desc2 = (
//   <div style={{ fontSize: 12 }} className={styles.title}>
//     <div style={{ margin: '8px 0 4px' }}>
//       <FormattedMessage id="resultandsuccess.success.step2-operator" defaultMessage="Zhou Maomao" />
//     </div>
//   </div>
// );


const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      {/* <DingdingOutlined style={{ marginLeft: 8 }} /> */}
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      {/* <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} /> */}
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);


const content = (
  <>
    <Descriptions
      title={formatMessage({
        id: 'resultandsuccess.success.operate-title',
        defaultMessage: 'Project Name',
      })}
    ></Descriptions>
    <br />
    {/* <Steps progressDot current={2}>
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="resultandsuccess.success.step1-title"
              defaultMessage="Create project"
            />
          </span>
        }
        description={desc1}
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="resultandsuccess.success.step2-title"
              defaultMessage="Departmental preliminary review"
            />
          </span>         
        }
        description={desc2}
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="resultandsuccess.success.step5-title"
              defaultMessage="Departmental preliminary review"
            />
          </span>
        }
        description={desc2}
      />    
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              id="resultandsuccess.success.step4-title"
              defaultMessage="Financial review"
            />
          </span>
        }
      />    
    </Steps> */}
    <Steps  current={1}>
      <Step title="注册登记" description={desc1} />
      <Step title="业务指导单位" description={desc2} />
      <Step title="校团委" />
      <Step title="完成" />
    </Steps>
  </>
);

const extra = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="resultandsuccess.success.btn-return" defaultMessage="Back to list" />
    </Button>
  </Fragment>
);

const Success: React.FC<SuccessProps> = () => {
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="success"
          title={formatMessage({ id: 'resultandsuccess.success.title' })}
          subTitle={formatMessage({ id: 'resultandsuccess.success.description' })}
          extra={extra}
          style={{ marginBottom: 16 }}
        >
          {content}
        </Result>
      </Card>
    </GridContent>
  );
};

export default Success;
