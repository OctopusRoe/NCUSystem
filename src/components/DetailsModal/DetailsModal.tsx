import { Col, Row, Table, Image, Tabs } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import FormatGrid from './FormatGrid';

interface DetailsModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  infoData: any;
}

const DetailsModal: React.FC<DetailsModalProps> = (props) => {
  const { modalVisible, onCancel, infoData } = props;
  const { TabPane } = Tabs;
  const callback = () => {};
<<<<<<< HEAD

=======
>>>>>>> 779cd07408c631891edef0c4c759aaf5c850b94d
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
    [
      { title: '姓名', value: infoData !== undefined ? infoData.name : '' },
      { title: '籍贯', value: '' },
      { title: '专业', value: '' },
      { title: '手机号', value: infoData !== undefined ? infoData.phone : '', copy: true },
    ],
    [
      { title: '学号', value: infoData !== undefined ? infoData.personId : '', copy: true },
      { title: '民族', value: '' },
      { title: '学制', value: '' },
      { title: 'QQ号', value: '', copy: true },
    ],
    [
      { title: '性别', value: infoData !== undefined ? (infoData.gender === 0 ? '男' : '女') : '' },
      { title: '学院', value: infoData !== undefined ? infoData.college : '' },
      { title: '入学时间', value: '' },
    ],
    [
      { title: '身份证号', value: infoData !== undefined ? infoData.idcard : '', copy: true },
      { title: '班级', value: infoData !== undefined ? infoData.class : '' },
      { title: '政治面貌', value: '' },
    ],
  ];

  return (
    <Modal
      title="详情信息"
      footer={null}
      visible={modalVisible}
      onCancel={onCancel}
      width="1200px"
      destroyOnClose
    >
      <div>
        <Row>
          <Col span={4} style={{ textAlign: 'center' }}>
            <Row justify={'center'} align={'middle'} style={{ overflow: 'hidden' }}>
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
            {data.map((item: any, index: number) => (
              <FormatGrid data={item} key={index} />
            ))}
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" onChange={callback} style={{ marginTop: '20px' }}>
          <TabPane tab="社团档案" key="1">
            <Table
              columns={columns1}
              dataSource={data1}
              size={'large'}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                size: 'small',
                showTotal: () => false,
              }}
            />
          </TabPane>
          <TabPane tab="活动档案" key="2">
            <Table
              columns={columns1}
              dataSource={data1}
              size={'large'}
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
                size: 'small',
                showTotal: () => false,
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default DetailsModal;
