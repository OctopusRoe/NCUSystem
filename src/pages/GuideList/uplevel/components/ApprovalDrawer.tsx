import { Button, Col, Divider, Drawer, Row, Table, Tabs, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';

interface ApprovalDrawerProps {
  drawerVisible: boolean;
  oncancel: () => void;
}

const ApprovalDrawer: React.FC<ApprovalDrawerProps> = (props) => {
  const { drawerVisible, oncancel } = props;
  const [childrenDrawerVisible, setChildrenDrawerVisible] = useState(false);
  const Tab1 = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>社团中文全称：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>南昌大学南昌大学南昌大学</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>社团英文全称：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>XXXXXXXXXXXXXX</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>社团类别：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>创新创业类</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>社团级别：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>一级社团</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>申请人：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>曲丽丽</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>指导单位：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>校团委</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>社团成员数：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>1213</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>成立年份：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>1213</p>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>精品项目：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <Tag color={'blue'}>在线查看</Tag>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end">
                  <Col>
                    <p style={{ color: '#939393' }}>指导审批人：</p>
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Row>
                  <Col>
                    <p>曲丽丽</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  const Tab2 = () => {
    const columns = [
      {
        title: '年审时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '年审结果',
        dataIndex: 'result',
        key: 'result',
      },
    ];

    return (
      <>
        <Table columns={columns}  size="small" />
      </>
    );
  };

  return (
    <Drawer
      title="升级审批"
      width={720}
      onClose={() => oncancel()}
      visible={drawerVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => oncancel()} type="primary" style={{ marginRight: 8 }}>
            审批通过
          </Button>
          <Button onClick={() => setChildrenDrawerVisible(true)} type="primary" danger>
            拒绝通过
          </Button>
        </div>
      }
    >
      <div>
        <Tab1 />
        <Divider style={{ fontSize: '16px' }}>年审情况</Divider>
        <Tab2 />
      </div>
      <Drawer
        title="拒绝理由"
        width={400}
        closable={false}
        onClose={() => setChildrenDrawerVisible(false)}
        visible={childrenDrawerVisible}
      >
        <TextArea rows={4} />
        <div style={{ paddingTop: '50px', textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              oncancel();
              setChildrenDrawerVisible(false);
            }}
          >
            确定
          </Button>
        </div>
      </Drawer>
    </Drawer>
  );
};

export default ApprovalDrawer;
