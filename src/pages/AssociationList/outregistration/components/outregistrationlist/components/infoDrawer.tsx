import { Button, Col, Divider, Drawer, Row, Table } from 'antd';
import React from 'react';

interface InfoDrawerProps {
  drawervisible: boolean;
  onCancel: () => void;
}

const InfoDrawer: React.FC<InfoDrawerProps> = (props) => {
  const { drawervisible, onCancel } = props;
  const columns = [
    {
      title: '学号',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '姓名',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: '学院',
      dataIndex: 'result',
      key: 'result',
    },
  ];
  return (
    <>
      <Drawer
        title="外出详情"
        width={720}
        onClose={onCancel}
        visible={drawervisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" onClick={onCancel}>
              关闭
            </Button>
          </div>
        }
      >
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>离/返校时间：</p>
              </Col>
              <Col span={18}>
                <p>2020.10.02--2020.10.03</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>外出地点：</p>
              </Col>
              <Col span={18}>
                <p>南昌大学</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>外出事由：</p>
              </Col>
              <Col span={18}>
                <p>XXXXXXXXXXXXXXXXXX</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>指导审批人：</p>
              </Col>
              <Col span={18}>
                <p>XXX</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>指导审批部门：</p>
              </Col>
              <Col span={18}>
                <p>XXXXXXXXXXX</p>
              </Col>
            </Row>
            <Row>
              <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                <p>外出负责人：</p>
              </Col>
              <Col span={18}>
                <p>姓名-手机号XXXXXXXXXX</p>
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Divider style={{ fontSize: '16px' }}>外出成员</Divider>
        <Table columns={columns} size="small" />
      </Drawer>
    </>
  );
};

export default InfoDrawer;
