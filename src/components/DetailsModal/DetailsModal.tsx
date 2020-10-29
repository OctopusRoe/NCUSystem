import { Button, Col, Row, Space, Table,Image, Tabs, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import React from 'react';
import FormatGrid from './FormatGrid';

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
      key: 'time',
    },
    {
      title: '社团名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '考核结果',
      dataIndex: ' result',
      key: 'result',
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

  const data1 = [
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
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '5',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
  ];

  const showImage = () => {
    document.getElementById('details-modal-image')?.click();
  };

  const data = [
    [{title: '姓名', value: '曲丽丽'},{title: '籍贯', value: '新疆维吾尔自治区'},{title: '专业', value:'信息技术'},{title:'手机号',value:'1366654888',copy: true}],
    [{title: '学号', value: '4565545458',copy: true},{title: '民族', value: '维吾尔族'},{title: '学制', value:'四年制'},{title:'QQ号',value:'136665488',copy: true}],
    [{title: '性别', value: '女'},{title: '学院', value: '信息工程学院'},{title: '入学时间', value: '2020-09-12'}],
    [{title: '身份证号', value: '36565415255695845X',copy: true},{title: '班级', value: '20XXXXXXXXX'},{title: '政治面貌', value: '群众'}],
  ]

  return (
    <Modal
      title="详情信息"
      footer={null}
      visible={modalVisible}
      onCancel={onCancel}
      width="1200px"
    >
      <div>
      <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Row
              justify={'center'}
              align={'middle'}
              style={{ overflow: 'hidden' }}
            >
              <img
                src={
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg'
                }
                style={{ width: '100px' }}
                onClick={showImage}
              />
              <Image
                src={
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4043543360,109021256&fm=26&gp=0.jpg'
                }
                style={{ display: 'none' }}
                id={'details-modal-image'}
              />
            </Row>
          </Col>
          <Col span={20}>
          {
            data.map((item: any, index: number) => (
              <FormatGrid data={item} key={index} />
            ))
          }
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }}>
          <TabPane tab="社团档案" key="1">
            <Table columns={columns1} dataSource={data1} size={"large"} pagination={{pageSize: 5, showSizeChanger: false, size: 'small', showTotal: (a,b)=>false}}/>
          </TabPane>
          <TabPane tab="活动档案" key="2">
            <Table columns={columns1} dataSource={data1} size={"large"} pagination={{pageSize: 5, showSizeChanger: false, size: 'small', showTotal: (a,b)=>false}}/>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default DetailsModal;
