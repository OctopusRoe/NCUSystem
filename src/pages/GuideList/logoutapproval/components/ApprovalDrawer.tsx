import React, { useState } from 'react';

import { Button, Col, Divider, Drawer, Row, Table, Input, message, Spin } from 'antd';

import { connect, Dispatch } from 'umi'

import { logoutApprovalState } from '../data'

interface ApprovalDrawerProps {
  info: any
  loading: any
  drawerVisible: boolean;
  oncancel: () => void;
}

const { TextArea } = Input

const ApprovalDrawer: React.FC<ApprovalDrawerProps> = (props) => {

  const { drawerVisible, info, loading, oncancel } = props;
  
  const [childrenDrawerVisible, setChildrenDrawerVisible] = useState(false)

  const [ applyNum, setApplyNum ] = useState<number>(0)

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
                    <p>{info.nameZh}</p>
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
                    <p>{info.nameEn}</p>
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
                    <p>{info.category}</p>
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
                    <p>{info.level}</p>
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
                    <p>{info.approvalTeacher}</p>
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
                    <p>{info.guidanceUnit}</p>
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
                    <p>{info.personNum}</p>
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
                    <p>{info.setUpDate}</p>
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
                    <p>{info.name}</p>
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
        title: '学号',
        dataIndex: 'personId',
        key: 'personId',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college'
      }
    ];

    return (
      <>
        <Table
          key={'personId'}
          columns={columns}
          size="small"
          dataSource={info.member}
          pagination={{pageSize: 5}}
        />
      </>
    );
  };

  const Tab3 = () => {
    const columns = [
      {
        title: '审批人',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '审批时间',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '审批单位',
        dataIndex: 'department',
        key: 'department'
      },
      {
        title: '审批结果',
        dataIndex: 'result',
        key: 'result'
      }
    ]

    return (
      <>
        <Table
          key={'id'}
          columns={columns}
          size={'small'}
          pagination={{pageSize: 5}}
        />
      </>
    )
  }

  const applyFunc = () => {

    const input = document.getElementById('logout-approval-textArea')?.innerHTML

    // 拒绝的分支
    if (applyNum === 0) {
      message.error('拒绝')
      return
    }

    // 同意的分支
    message.success('同意')
    return
  }

  return (
    <Drawer
      destroyOnClose
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
          <Button onClick={
            () => {
              setApplyNum(1)
              setChildrenDrawerVisible(true)
            }
          }
            type="primary"
            style={{ marginRight: 8 }}
          >
            审批通过
          </Button>
          <Button onClick={
              () => {
                setApplyNum(0)
                setChildrenDrawerVisible(true)
              }
            } 
            type="primary"
            danger
          >
            拒绝通过
          </Button>
        </div>
      }
    >
      {
        loading ? 
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Spin size={'large'} delay={300} />
        </div>
        :
        <div>
          <Tab1 />
          <Divider style={{ fontSize: '16px' }}>成员代表</Divider>
          <Tab2 />
          <Divider style={{ fontSize: '16px' }}>审批意见</Divider>
          <Tab3 />
        </div>
      }
      <Drawer
        destroyOnClose
        title={applyNum !== 0 ? '同意建议' : '拒绝理由'}
        width={400}
        closable={false}
        onClose={() => setChildrenDrawerVisible(false)}
        visible={childrenDrawerVisible}
      >
        <TextArea id={'logout-approval-textArea'} rows={4} />
        <div style={{ paddingTop: '50px', textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              // oncancel();
              applyFunc()
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

export default connect(
  ({logoutApproval}: {logoutApproval: logoutApprovalState}) => ({
    loading: logoutApproval.infoLoading,
    info: logoutApproval.info
  })
)(ApprovalDrawer)
