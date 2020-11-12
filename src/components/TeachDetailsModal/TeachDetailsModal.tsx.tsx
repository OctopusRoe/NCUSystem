import { Col, Row, Image, Table, Tabs } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import FormatGrid from './FormatGrid';

interface TeachDetailsModalProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const TeachDetailsModal: React.FC<TeachDetailsModalProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const { TabPane } = Tabs;
  const callback = () => {};

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

  const showImage = () => {
    document.getElementById('details-modal-image')?.click();
  };

  const data = [
    [{title: '姓名', value: '曲丽丽'},{title: '籍贯', value: '新疆维吾尔自治区'},{title: '职务', value:'XXXXX'},{title:'手机号',value:'1366654888',copy: true}],
    [{title: '工号', value: '4565545458',copy: true},{title: '民族', value: '维吾尔族'},{title: '部门', value: '信息工程学院'},{title:'QQ号',value:'136665488',copy: true}],
    [{title: '性别', value: '女'},{title: '政治面貌', value: '群众'},{title: '入职时间', value: '2020-09-12'}],
    [{title: '身份证号', value: '36565415255695845X',copy: true},{title: '学历', value: '20XXXXXXXXX'},{title: '教龄', value: '2年'}],
  ]


  return (
    <Modal
      title="详情信息"
      footer={null}
      visible={modalVisible}
      onCancel={onCancel}
      width={"1200px"}
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
            <Table columns={columns1} dataSource={data1} size={"large"} pagination={{pageSize: 5, showSizeChanger: false, size: 'small', showTotal: (a,b)=>false}} />
          </TabPane>
          <TabPane tab="活动档案" key="2">
            <Table columns={columns1} dataSource={data1} size={"large"} pagination={{pageSize: 5, showSizeChanger: false, size: 'small', showTotal: (a,b)=>false}}/>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default TeachDetailsModal;
