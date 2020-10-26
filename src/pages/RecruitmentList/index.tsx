// 招新管理 页面
import { Avatar, Skeleton } from 'antd';
import React, { Component } from 'react';

import { Dispatch, connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ModalState } from '@/models/userInfoHead';
import styles from './style.less';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data';

interface WorkplaceProps {
  currentUser?: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {currentUser.name}
        </div>
        <div>
          {currentUser.title} | {currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: React.FC<{}> = () => (
  <div className={styles.extraImg}>
    <img
      alt="这是一个标题"
      src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    />
  </div>
);

class RecruitmentList extends Component<WorkplaceProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  render() {
    const { currentUser, children } = this.props;
    const { location } = this.props as any
    if (!currentUser || !currentUser.userid) {
      return null;
    }

    if (location.pathname === '/recruitment/square') {
      return <>{children}</>
    }
    
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({ dashboardAndworkplace: { currentUser }, }: {
    dashboardAndworkplace: ModalState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    currentUser,
  }),
)(RecruitmentList);