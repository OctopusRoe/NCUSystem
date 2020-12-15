import React from 'react';
import { Button, Col, Divider, Drawer, Row, Table, Spin } from 'antd';

import { Dispatch, connect } from 'umi'

import { OutregistrationListState } from '../../../data'

interface InfoDrawerProps {
  drawervisible: boolean
  info: any
  isquery: boolean
  cause: string
  onCancel: () => void
  dispatch: Dispatch
}

const InfoDrawer: React.FC<InfoDrawerProps> = (props) => {
  const { drawervisible, info, isquery, cause, onCancel, dispatch } = props;
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
      key: 'college',
    },
  ];

  const onClose = () => {
    onCancel()
    dispatch({
      type: 'outregistrationList/cleanInfo'
    })
  }

  return (
    <>
      <Drawer
        destroyOnClose
        title="外出详情"
        width={720}
        onClose={onClose}
        visible={drawervisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" onClick={onClose}>
              关闭
            </Button>
          </div>
        }
      >
        {
          isquery ? 
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Spin size={'large'} delay={300} />
            </div> 
            :
            <div>
              <Row>
                <Col span={2}></Col>
                <Col span={20}>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>离/返校时间：</p>
                    </Col>
                    <Col span={18}>
                      <p>{info?.date && info.date.split('/').join(' -- ')}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>外出地点：</p>
                    </Col>
                    <Col span={18}>
                      <p>{info?.place && info.place.split(',').join('-')}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>外出事由：</p>
                    </Col>
                    <Col span={18}>
                      <p>{cause}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>指导审批人：</p>
                    </Col>
                    <Col span={18}>
                      <p>{info.approvalTeacher}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>指导审批部门：</p>
                    </Col>
                    <Col span={18}>
                      <p>{info.department}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} style={{ textAlign: 'right', color: '#939393' }}>
                      <p>外出负责人：</p>
                    </Col>
                    <Col span={18}>
                      <p>{info.responsible}</p>
                    </Col>
                  </Row>
                </Col>
                <Col span={2}></Col>
              </Row>
              <Divider style={{ fontSize: '16px' }}>外出成员</Divider>
              <Table
                columns={columns}
                dataSource={info.members}
                size="small"
                pagination={{defaultPageSize: 10, hideOnSinglePage: true, defaultCurrent: 1, size: 'small'}}
              />
            </div>
          }
      </Drawer>
    </>
  );
};

export default connect(
  ({outregistrationList}: {outregistrationList: OutregistrationListState}) => ({
    info: outregistrationList.info,
    isquery: outregistrationList.isquery
  })
)(InfoDrawer);
