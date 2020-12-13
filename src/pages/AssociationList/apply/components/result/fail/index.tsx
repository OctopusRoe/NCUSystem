import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Result } from 'antd';
import { connect, FormattedMessage } from 'umi';
import React, { Fragment } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import styles from './index.less';

interface failProps {
  nameZH: string;
  nameEN: string;
}

const Fail: React.FC<failProps> = ({ nameZH, nameEN }) => {
  const Content = (
    <Fragment>
      <div className={styles.title}>
        <FormattedMessage
          id="resultandfail.error.hint-title3"
          defaultMessage="已注册的学生社为："
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <ExclamationCircleOutlined style={{ marginRight: 8 }} className={styles.error_icon} />
        <FormattedMessage id="communityName" defaultMessage={`${nameZH}(${nameEN})`} />
      </div>
    </Fragment>
  );

  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="error"
          title={'没有权限'}
          subTitle={'您已经注册了一个学生社团，无法再次注册'}
          // extra={
          //   <Button type="primary">
          //     <FormattedMessage
          //       id="resultandfail.error.btn-text"
          //       defaultMessage="Return to modify"
          //     />
          //   </Button>
          // }
          style={{ marginTop: 48, marginBottom: 16 }}
        >
          {Content}
        </Result>
      </Card>
    </GridContent>
  );
};

export default connect()(Fail);
