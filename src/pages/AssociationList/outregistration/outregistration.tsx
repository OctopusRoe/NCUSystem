// 外出登记 组件

import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import styles from './base.less';

// 菜单组件
import Outregistrationform from './components/outregistrationform'
import Outregistrationlist from './components/outregistrationlist/Outregistrationlist'

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
}

type SettingsStateKeys = 'baseInfo' | 'organization' | 'position' | 'newmedia';
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}


const formInfo = {
  teacherValue: [{name: '名字1', phone: '11011211911'},{name: '名字2', phone: '11011211119'}],
  associationType: ['类别1', '类别2', '类别3', '类别4'],
  associationGrade: ['级别1', '级别2', '级别3', '级别4'],
  department: ['部门1', '部门2', '部门3', '部门4']
}

class OutRegistration extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      baseInfo: (
        <FormattedMessage id="info.menuMap.apply" defaultMessage="BaseInfo Info" />
      ),
      organization: (
        <FormattedMessage id="info.menuMap.list" defaultMessage="Organization Info" />
      ),
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'baseInfo',
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
      case 'baseInfo':
        return <Outregistrationform/>;
      case 'organization':
        return <Outregistrationlist />;
      default:
        break;
    }

    return null;
  };

  render() {
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

export default connect()(OutRegistration);
