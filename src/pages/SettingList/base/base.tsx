import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/base';
import { CurrentUser } from './data.d';
import styles from './base.less';

import Department from './components/department'
import AcademicYear from './components/academicyear'
import AssociationType from './components/associationtype'
import Specialty from './components/specialty'
import SetClass from './components/setclass'

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = 'base' | 'department' | 'academicyear' | 'associationtype' | 'specialty' | 'setclass';
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}

class Base extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      base: (
        <FormattedMessage id="setting.menuMap.basic" defaultMessage="Basic Settings" />
      ),
      department: (
        <FormattedMessage
          id="setting.menuMap.department"
          defaultMessage="Department Settings"
        />
      ),
      academicyear: (
        <FormattedMessage
          id="setting.menuMap.academicyear"
          defaultMessage="Academicyear Settings"
        />
      ),
      associationtype: (
        <FormattedMessage
          id="setting.menuMap.associationtype"
          defaultMessage="Associationtype Settings"
        />
      ),
      specialty: (
        <FormattedMessage
          id="setting.menuMap.specialty"
          defaultMessage="Specialty Settings"
        />
      ),
      setclass: (
        <FormattedMessage
          id="setting.menuMap.setclass"
          defaultMessage="Setclass Settings"
        />
      )
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndsettings/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'department':
        return <Department />;
      case 'academicyear':
        return <AcademicYear />;
      case 'associationtype':
        return <AssociationType />;
      case 'specialty':
        return <Specialty />;
      case 'setclass':
        return <SetClass />;
      default:
        break;
    }

    return null;
  };

  render() {
    // const { currentUser } = this.props;
    // if (!currentUser.userid) {
    //   return '';
    // }
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(Base);
