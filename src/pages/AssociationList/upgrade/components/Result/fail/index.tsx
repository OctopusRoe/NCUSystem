import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Result } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React, { Fragment } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';
import { SuccessProps } from 'antd/es/progress/progress';

const Content = (
  <Fragment>
    <div className={styles.title}>
      <FormattedMessage
        id="resultandfail.error.hint-title"
        defaultMessage="The content you submitted has the following error:"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <ExclamationCircleOutlined style={{ marginRight: 8 }} className={styles.error_icon} />
      <FormattedMessage
        id="resultandfail.error.hint-text1"
        defaultMessage="Your account has been frozen"
      />
    </div>
  </Fragment>
);


const Fail: React.FC<SuccessProps> = () => {
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status='warning'
          title={formatMessage({ id: 'resultandfail.error.title' })}
          subTitle={formatMessage({ id: 'resultandfail.error.description' })}
          extra={
            <Button type="primary">
              <FormattedMessage id="resultandfail.error.btn-text" defaultMessage="Return to modify" />
            </Button>
          }
          style={{ marginTop: 48, marginBottom: 16 }}
        >
          {Content}
        </Result>
      </Card>
    </GridContent>
  )
}


export default Fail
