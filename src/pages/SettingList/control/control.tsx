// 应用管理 页面

import React, { Component } from 'react';
import styles from './style.less';

import Control from './components/control/control';
import Category from './components/category/category';
import { Menu } from 'antd';
import { CurrentUser, Dispatch, FormattedMessage } from 'umi';
import { GridContent } from '@ant-design/pro-layout';

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = 'control' | 'category' ;
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}

class ControlPage extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      control: <FormattedMessage id="setting.menuMap.control" defaultMessage="Basic Settings" />,
      category: <FormattedMessage id="setting.menuMap.category" defaultMessage="Department Settings" />,
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'control',
    };
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
      case 'control':
        return <Control />;
      case 'category':
        return <Category />;
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

export default ControlPage;
