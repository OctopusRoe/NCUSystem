import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/base';
import { CurrentUser } from './data.d';
import styles from './base.less';

import Department from './components/department'
import AcademicYear from './components/academicyear'
import Specialty from './components/specialty'
import SetClass from './components/setclass'
import OnlinePlatform from './components/onlinePlatform'
import AssociationType from './components/associationtype'
import AssociationGrade from './components/associationgrade'
import DepartmentType from './components/departmenttype'
import MicroSystem from './components/microsystem'
import ActiveType from './components/activeType'

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = 'base' | 'department' | 'academicyear' | 'specialty' | 'setclass' | 'onlineplatform'  | 'associationtype' | 'associationgrade' | 'departmenttype' | 'activetype' | 'microsystem';
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
      ),
      onlineplatform: (
        <FormattedMessage
          id="setting.menuMap.onlineplatform"
          defaultMessage="Onlineplatform Settings"
        />
      ),
      associationgrade: (
        <FormattedMessage
          id="setting.menuMap.associationgrade"
          defaultMessage="Associationgrade Settings"
        />
      ),
      associationtype: (
        <FormattedMessage
          id="setting.menuMap.associationtype"
          defaultMessage="Associationtype Settings"
        />
      ),
      departmenttype: (
        <FormattedMessage
          id="setting.menuMap.departmenttype"
          defaultMessage="Departmenttype Settings"
        />
      ),
      activetype: (
        <FormattedMessage
          id="setting.menuMap.activetype"
          defaultMessage="Departmenttype Settings"
        />
      ),
      microsystem: (
        <FormattedMessage
          id="setting.menuMap.microsystem"
          defaultMessage="Microsystem Settings"
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
    // 访问接口处
    // 获取网络平台类别
    this.props.dispatch({
      type: 'baseOnlinePlatform/getType'
    })
    // 获取社团级别
    this.props.dispatch({
      type: 'baseAssociationGrade/getGrade'
    })
    // 获取社团类别
    this.props.dispatch({
      type: 'baseAssociationType/getType'
    })
    // 获取单位类别
    this.props.dispatch({
      type: 'baseDepartmentType/getType'
    })
    // 获取活动类别
    this.props.dispatch({
      type: 'baseActiveType/getType'
    })
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
      case 'specialty':
        return <Specialty />;
      case 'setclass':
        return <SetClass />;
      case 'onlineplatform':
        return <OnlinePlatform />;
      case 'associationgrade':
        return <AssociationGrade />;
      case 'associationtype':
        return <AssociationType />;
      case 'departmenttype':
        return <DepartmentType />;
      case 'activetype':
        return <ActiveType />;
      case 'microsystem':
        return <MicroSystem />
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

export default connect()(Base);
