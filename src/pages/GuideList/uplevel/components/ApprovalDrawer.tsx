import React, { useState } from 'react';
import { Button, Col, Divider, Drawer, Row, Spin, Table, Tabs, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { connect, Dispatch } from 'umi';

interface ApprovalDrawerProps {
  drawerVisible: boolean;
  oncancel: () => void;
  infoData: any;
  dispatch: Dispatch;
  detailId: any;
  afterClose: () => void;
  loading: any
}

const ApprovalDrawer: React.FC<ApprovalDrawerProps> = (props) => {
  const { drawerVisible, oncancel, infoData, dispatch, detailId, loading, afterClose } = props;
  const [childrenDrawerVisible, setChildrenDrawerVisible] = useState(false);
  const [num, setNum] = useState(0)
  console.log(infoData);

  const LeftData = [
    { key: '社团中文全称：', value: infoData !== null && infoData !== undefined ? infoData.nameZh : '' },
    { key: '社团英文全称：', value: infoData !== null && infoData !== undefined ? infoData.nameEn : '' },
    { key: '社团类别：', value: infoData !== null && infoData !== undefined ? infoData.category : '' },
    { key: '社团级别：', value: infoData !== null && infoData !== undefined ? infoData.level : '' },
    { key: '申请人：', value: infoData !== null && infoData !== undefined ? infoData.name : '' },
  ];

  const RightData = [
    { key: '指导单位：', value: infoData !== null && infoData !== undefined ? infoData.guidanceUnit : '' },
    { key: '社团成员数：', value: infoData !== null && infoData !== undefined ? infoData.approvalTeacher : '' },
    { key: '成立年份：', value: infoData !== null && infoData !== undefined ? infoData.setUpDate : '' },
    { key: '精品项目：', value: infoData !== null && infoData !== undefined ? infoData.place : '' },
    { key: '指导审批人：', value: infoData !== null && infoData !== undefined ? infoData.responsible : '' },
  ];



  const Details = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Row>
              {LeftData.map((item: any, index) => {
                return (
                  <React.Fragment key={`left${index}`}>
                    <Col span={8}>
                      <Row justify="end">
                        <Col>
                          <p style={{ color: '#939393' }}>{item.key}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <p>{item.value}</p>
                        </Col>
                      </Row>
                    </Col>
                  </React.Fragment>
                );
              })}
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              {RightData.map((item: any, index) => {
                return (
                  <React.Fragment key={`right${index}`}>
                    <Col span={8}>
                      <Row justify="end">
                        <Col>
                          <p style={{ color: '#939393' }}>{item.key}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col>
                          <p>{item.value}</p>
                        </Col>
                      </Row>
                    </Col>
                  </React.Fragment>
                );
              })}
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  const AuditList = () => {
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
        <Table columns={columns} pagination={{ pageSize: 5 }} size="small" />
      </>
    );
  };


  const ApprovalList = () => {
    const columns = [
      {
        title: '审批人',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '审批时间',
        dataIndex: 'personId',
        key: 'personId',
      },
      {
        title: '审批单位',
        dataIndex: 'college',
        key: 'college',
      },
      {
        title: '审批结果',
        dataIndex: 'college',
        key: 'college',
      },
    ];

    return (
      <>
        <Table
          columns={columns}
          pagination={false}
          size="small" />
      </>
    );
  };



  return (
    <Drawer
      destroyOnClose
      title="升级审批"
      width={720}
      onClose={() => {
        dispatch({
          type: 'communityUpgradeApproval/cleanDetail'
        });
        oncancel()
      }}

      visible={drawerVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => { setChildrenDrawerVisible(true); setNum(2) }} type="primary" style={{ marginRight: 8 }}>
            审批通过
          </Button>
          <Button onClick={() => { setChildrenDrawerVisible(true); setNum(2) }} type="primary" danger>
            拒绝通过
          </Button>
        </div>
      }
    >

      {loading ?
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size={'large'} delay={300} />
        </div>
        :
        <div>
          <Details />
          <Divider>年审情况</Divider>
          <AuditList />
          <Divider >审批意见</Divider>
          <ApprovalList />
        </div>
      }

      <Drawer
        destroyOnClose
        title={num === 1 ? '同意建议' : '拒绝理由'}
        width={400}
        closable={false}
        onClose={() => setChildrenDrawerVisible(false)}
        visible={childrenDrawerVisible}
      >
        <TextArea rows={10} />
        <div style={{ paddingTop: '50px', textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'communityUpgradeApproval/cleanDetail'
              })
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

export default connect()(ApprovalDrawer);
