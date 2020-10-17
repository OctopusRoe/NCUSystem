// 详情信息展示 组件
import { Col, Row, Tabs } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface InfomodalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const Infomodal: React.FC<InfomodalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const { TabPane } = Tabs;
  return (
    <>
      <Modal
        title="用户信息"
        visible={modalVisible}
        onOk={() => onCancel()}
        onCancel={() => onCancel()}
        okText="确定"
        cancelText="取消"
        width="800px"
        bodyStyle={{ height: '400px', overflowY: 'scroll' }}
      >
        <Row>
          <Col span={8}>
            <Row justify="center">
              <Col>
                <img
                  width="100px"
                  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg"
                />
              </Col>
            </Row>
            <Row justify="center">
              <Col style={{ marginTop: '15px' }}>
                <span style={{ color: '#1890FF' }}> 用户名</span>
              </Col>
            </Row>
            <Row justify="center">
              <Col style={{ marginTop: '5px' }}>教工-信息工程学院</Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={7} style={{ textAlign: 'right' }}>
                <p>学号/工号：</p>
                <p>性别：</p>
                <p>身份证号：</p>
                <p>民族：</p>
                <p>籍贯：</p>
                <p>班级：</p>
                <p>专业：</p>
                <p>学制：</p>
                <p>入学时间：</p>
                <p>手机号：</p>
                <p>QQ号：</p>
                <p>政治面貌：</p>
                <p>手机号：</p>
              </Col>
              <Col span={17} style={{ color: '#888888' }}>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
                <p>null</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" style={{ marginTop: '20px' }}>
              <TabPane tab="社团" key="1"></TabPane>
              <TabPane tab="用户组" key="2"></TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Infomodal;
