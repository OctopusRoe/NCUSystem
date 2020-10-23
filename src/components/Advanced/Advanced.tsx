import { GridContent } from '@ant-design/pro-layout';
import { Button, Card, Checkbox, Col, Descriptions, Radio, Row, Table } from 'antd';
import React, { useState } from 'react';
import styles from './style.less';

const operationTabList = [
  {
    key: 'tab1',
    tab: '基本信息',
  },
  {
    key: 'tab2',
    tab: '发起人信息',
  },
  { key: 'tab3', tab: '组织成员信息' },
  { key: 'tab4', tab: '申请材料信息' },
];

const Base = () => {
  return (
    <>
      <Descriptions style={{ marginBottom: 24 }}>
        <Descriptions.Item label="社团中文全称">南昌大学南昌大学南昌大学</Descriptions.Item>
        <Descriptions.Item label="社团英文全称">南昌大学南昌大学南昌大学</Descriptions.Item>
        <Descriptions.Item label="社团类别">创新创业类</Descriptions.Item>
        <Descriptions.Item label="社团级别">一级社团</Descriptions.Item>
        <Descriptions.Item label="业务指导单位">校团委</Descriptions.Item>
        <Descriptions.Item label="社团成员数">18112345678</Descriptions.Item>
        <Descriptions.Item label="社团章程">
          <a>社团章程</a>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const Initiator = () => {
  return (
    <>
      <Descriptions style={{ marginBottom: 24 }}>
        <Descriptions.Item label="姓名">刘小小</Descriptions.Item>
        <Descriptions.Item label="学号">20170808151</Descriptions.Item>
        <Descriptions.Item label="在校期间所获荣誉">
          全国计算机优秀证书
          <br /> 优秀青年写作楷模证书
          <br /> 院大学生英语演讲三等奖 <br />
          优秀共青团员
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const Table1 = () => {
  const columns = [
    {
      title: '指导老师姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '工号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '部门',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <Table columns={columns} />
    </>
  );
};

const Table2 = () => {
  const columns = [
    {
      title: '社团组织成员',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '院系',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <Table columns={columns} />
    </>
  );
};

const contentList = {
  tab1: <Base />,
  tab2: <Initiator />,
  tab3: (
    <>
      <Table1 />
      <Table2 />
    </>
  ),
  tab4: <></>,
};

const optionsWithDisabled = [
  { label: 'Appasdsasadsadasdsale', value: 'Appsssle' },
  { label: 'Pedasdadasdaar', value: 'Pear' },
  { label: 'Orasdasdasdasdange', value: 'Orange' },
  { label: 'Appasdsasadsadasdsale', value: 'Apsdapsssle' },
  { label: 'Pedasdadasdaar', value: 'Pesaaar' },
  { label: 'Orasdasdasdasdange', value: 'Oransaage' },
];

function onChange(checkedValues: any) {
  console.log('checked = ', checkedValues);
}

const Advanced: React.FC<{}> = () => {
  const [operationKey, setOperationKey] = useState<string>('tab1');
  const [radiovalue, setradiovalue] = useState(1);
  const [displ, setDisplay] = useState('none');
  const onOperationTabChange = (key: string) => {
    setOperationKey(key);
  };

  const redioOnchange = (e: any) => {
    if (e.target.value === 1) {
      setDisplay('none');
    } else if (e.target.value === 2) {
      setDisplay('');
    }
  };

  return (
    <div className={styles.main}>
      <GridContent>
        <Card title="社团注册信息" style={{ marginBottom: 24 }} bordered={false}>
          <Descriptions style={{ marginBottom: 24 }}>
            <Descriptions.Item>
              <Card
                className={styles.tabsCard}
                bordered={false}
                tabList={operationTabList}
                onTabChange={onOperationTabChange}
              >
                {contentList[operationKey]}
              </Card>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="申请审批" style={{ marginBottom: 24 }} bordered={false}>
          <Row justify="center">
            <Col span={12}>
              <Row justify="center">
                <Col span={4} style={{ textAlign: 'right' }}>
                  请选择：
                </Col>
                <Col span={8}>
                  <Radio.Group defaultValue={radiovalue} onChange={redioOnchange}>
                    <Radio value={1}>通过</Radio>
                    <Radio value={2}>拒绝</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: '10px', display: displ }}>
                <Col span={4} style={{ textAlign: 'right' }}>
                  拒绝理由：
                </Col>
                <Col span={8}>
                  <Checkbox.Group options={optionsWithDisabled} onChange={onChange} />
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: '50px' }}>
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Button type="default" style={{ marginRight: '50px' }}>
                    取消
                  </Button>
                  <Button type="primary">确定</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </GridContent>
    </div>
  );
};

export default Advanced;
