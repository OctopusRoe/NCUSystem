import { Button, Col, Row, Space, Table, Tabs } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

interface DetailsModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const TestList = () => {
  return (
    <div>
      <FormItem>
        <Space>
          <Button type="primary">关闭</Button>
        </Space>
      </FormItem>
    </div>
  );
};

const DetailsModal: React.FC<DetailsModalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const { TabPane } = Tabs;
  const callback = (key: any) => {};

  const columns1 = [
    {
      title: '年份',
      dataIndex: 'time',
      key:'time'
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      key:'name'
    },
    {
      title: '部门',
      dataIndex: 'department',
      key:'department'
    },
    {
      title: '职务',
      dataIndex: 'position',
      key:'position'
    },
    {
      title: '考核结果',
      dataIndex: ' result',
      key:'result'
    },
  
  ];

  const columns2 = [
    {
      title: '社团名称',
      dataIndex: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
    },
    {
      title: '社团骨干',
      dataIndex: ' backbone',
    },
    {
      title: '在团时间',
      dataIndex: 'time',
    },
  ];


  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    
  ];


  return (
    <Modal
      title="详情信息"
      footer={<TestList />}
      visible={modalVisible}
      onCancel={() => onCancel()}
      width="1200px"
      bodyStyle={{ height: '600px' }}
    >
      <div>
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <img
              width="100px"
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg"
            />
          </Col>
          <Col span={2}>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>姓名：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>学号/工号：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>性别：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>身份证号：</p>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Col>
                <p>曲丽丽</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>32564315135</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>女</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>269854122369874445</p>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>民族：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>籍贯：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>班级：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>专业：</p>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Col>
                <p>汉族</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>上海</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>20信息技术9班</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>信息技术</p>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>学制：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>入学时间：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>手机号：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>QQ号：</p>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Col>
                <p>4年制</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>2020.09.01</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>36262626321</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>565452999</p>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}>政治面貌：</p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}></p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}></p>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <p style={{ color: '#00000073' }}></p>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <Col>
                <p>预备党员</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p></p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p></p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p></p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }}>
          <TabPane tab="社团档案" key="1">
            <Table columns={columns1} dataSource={data} size="middle" />
          </TabPane>
          <TabPane tab="活动档案" key="2">
          <Table columns={columns2} dataSource={data} size="middle" />
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default DetailsModal;
