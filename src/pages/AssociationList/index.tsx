// 社团管理页面

import React, { useEffect } from 'react';
import { Avatar, Skeleton } from 'antd';

import { Dispatch, connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { ModalState } from '@/models/userInfoHead'
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data';
import styles from './style.less';

interface AssociationListProps {
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
  const loading = currentUser && Object.keys(currentUser).length
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1}} active />
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
  )
}

const ExtraContent: React.FC<{}> = (props) => (
  <div className={styles.extraImg}>
    <img
      alt="这是一个标题"
      src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    />
  </div>
);

const AssociationList: React.FC<AssociationListProps> = (props) => {

  const { dispatch, currentUser, children } = props;
  const { location } = props as any
  useEffect(()=>{
    dispatch({
      type: 'dashboardAndworkplace/init',
    });
    return function cleanUp() {
      dispatch({
        type: 'dashboardAndworkplace/clear',
      })
    }
  },[])


  if (!currentUser || !currentUser.userid) {
    return null
  }

  switch (location.pathname) {
    case '/association/member':
    case '/association/settings':
    case '/association/upgrade':
    case '/association/active':
      return (
        <PageHeaderWrapper
          content={<PageHeaderContent currentUser={currentUser} />}
          extraContent={<ExtraContent />}
        >
          {children}
        </PageHeaderWrapper>
      )
      break
    default:
      return <PageHeaderWrapper>{children}</PageHeaderWrapper>
      break
  }

};

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
)(AssociationList);
