
import React, { Component } from 'react';
import { Avatar, Card, Col, Divider, Input, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect, Dispatch } from 'umi';
import { RouteChildrenProps } from 'react-router';
import { ModalState } from './model';
import { CurrentUser } from './data.d';
import styles from './Center.less';

import ShowImage from '@/components/ShowImgView'
import CropImgView from '@/components/CropImgview'

const operationTabList = [
  {
    key: 'userInfo',
    tab: (
      <span>个人资料</span>
    ),
  },
  {
    key: 'accountSetting',
    tab: (
      <span>账号设置</span>
    ),
  },
  {
    key: 'associationReport',
    tab: (
      <span>社团报告单</span>
    ),
  },
];

interface CenterProps extends RouteChildrenProps {
  dispatch: Dispatch;
  currentUser: Partial<CurrentUser>;
  currentUserLoading: boolean;
}
interface CenterState {
  tabKey?: 'userInfo' | 'accountSetting' | 'associationReport';
}

class UserPage extends Component<CenterProps, CenterState> {
  // static getDerivedStateFromProps(
  //   props: accountAndcenterProps,
  //   state: accountAndcenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;

  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }

  //   return null;
  // }

  state: CenterState = {
    tabKey: 'userInfo',
  };

  public input: Input | null | undefined = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndcenter/fetchCurrent',
    });
    dispatch({
      type: 'accountAndcenter/fetch',
    });
  }

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as CenterState['tabKey'],
    });
  };

  renderChildrenByTabKey = (tabKey: CenterState['tabKey']) => {
    switch (tabKey) {
      case 'userInfo':
        return <ShowImage src={'1111'} style={{width: '102px', height: '102px'}} id={'testone'} />;
      case 'accountSetting':
        return <CropImgView id={'testCropImg'} />;
      case 'associationReport':
        return <div>3</div>;
      default:
        break;
    }
    return
  };

  render() {
    const { tabKey } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
              {/* {!dataLoading && ( */}
                <div>
                  <div className={styles.avatarHolder}>
                    {/* <img alt="" src={currentUser.avatar} /> */}
                    <img alt="" style={{width: '100px', height: '140px'}} src={'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg'}  />
                    {/* <div className={styles.name}>{currentUser.name}</div> */}
                    <div className={styles.name}>章棚</div>
                    <div>学生 - 信息工程学院</div>
                  </div>
                  <Divider dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>所在社团</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map((item) => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              {/* )} */}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(
  ({
    loading,
    accountAndcenter,
  }: {
    loading: { effects: { [key: string]: boolean } };
    accountAndcenter: ModalState;
  }) => ({
    currentUser: accountAndcenter.currentUser,
    currentUserLoading: loading.effects['accountAndcenter/fetchCurrent'],
  }),
)(UserPage);
