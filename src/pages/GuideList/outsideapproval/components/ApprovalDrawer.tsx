import { Button, Col, Divider, Drawer, Row, Spin, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
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
  const { drawerVisible, oncancel, infoData, dispatch, detailId, afterClose, loading } = props;
  const [childrenDrawerVisible, setChildrenDrawerVisible] = useState(false);
  const [num, setNum] = useState(0)   //1同意  2拒绝

  const LeftData = [
    { name: '社团中文全称：', value: infoData !== undefined ? infoData.nameZh : '' },
    { name: '社团英文全称：', value: infoData !== undefined ? infoData.nameEn : '' },
    { name: '社团类别：', value: infoData !== undefined ? infoData.category : '' },
    { name: '社团级别：', value: infoData !== undefined ? infoData.level : '' },
    { name: '申请人：', value: infoData !== undefined ? infoData.name : '' },
    { name: '外出事由：', value: infoData !== undefined ? infoData.reason : '' },
  ];

  const RightData = [
    { name: '指导单位：', value: infoData !== undefined ? infoData.guidanceUnit : '' },
    { name: '指导审批人：', value: infoData !== undefined ? infoData.approvalTeacher : '' },
    { name: '离/返校时间：', value: infoData !== undefined ? infoData.setUpDate : '' },
    { name: '外出地点：', value: infoData !== undefined ? infoData.place : '' },
    { name: '外出负责人：', value: infoData !== undefined ? infoData.responsible : '' },
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
                          <p style={{ color: '#939393' }}>{item.name}</p>
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
                          <p style={{ color: '#939393' }}>{item.name}</p>
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

  const MembersList = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '学号',
        dataIndex: 'personId',
        key: 'personId',
      },
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
      },
    ];

    return (
      <>
        <Table
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={infoData !== undefined ? infoData.members : ''}
          size="small" />
      </>
    );
  };

  const ApprovalList = () => {
    const columns = [
      {
        title: '审批人',
        dataIndex: 'name',
        key: 'apr',
      },
      {
        title: '审批时间',
        dataIndex: 'personId',
        key: 'time',
      },
      {
        title: '审批单位',
        dataIndex: 'college',
        key: 'cof',
      },
      {
        title: '审批结果',
        dataIndex: 'college',
        key: 'reus',
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
      title="外出审批"
      width={720}
      onClose={() => {
        //关闭时重置loading 状态
        dispatch({
          type: 'communityOutRegistration/cleanDetail'
        })
        oncancel();

      }}
      visible={drawerVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => { setChildrenDrawerVisible(true); setNum(1) }} type="primary" style={{ marginRight: 8 }}>
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
        </div> :
        <div>
          <Details />
          <Divider >外出成员</Divider>
          <MembersList />
          <Divider >审批意见</Divider>
          <ApprovalList />
        </div>
      }



      <Drawer
        destroyOnClose
        title={num === 1 ? '同意建议' : '拒绝理由'}
        width={400}
        closable={false}
        onClose={() =>
          setChildrenDrawerVisible(false)
        }
        visible={childrenDrawerVisible}
      >
        <TextArea rows={10} />
        <div style={{ paddingTop: '50px', textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'communityOutRegistration/cleanDetail'
              })
              oncancel();
              setChildrenDrawerVisible(false);
            }}
          >
            确定
          </Button>
        </div>
      </Drawer>
    </Drawer >
  );
};

export default connect()(ApprovalDrawer);
