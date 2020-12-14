import { Button, Col, Divider, Drawer, Row, Table, Tag, Image } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import getPort from '@/services/global';
import { connect, Dispatch } from 'umi';

interface ApprovalDrawerProps {
  drawerVisible: boolean;
  oncancel: () => void;
  infoData: any;
  dispatch: Dispatch;
  detailId: any;
  afterClose: () => void;
}

const ApprovalDrawer: React.FC<ApprovalDrawerProps> = (props) => {
  const { drawerVisible, oncancel, infoData, dispatch, detailId, afterClose } = props;
  
  console.log(infoData);

  const [childrenDrawerVisible, setChildrenDrawerVisible] = useState(false);

  const LeftData = [
    { key: '社团中文全称：', value: infoData !== undefined ? infoData.nameZh : '' },
    { key: '社团英文全称：', value: infoData !== undefined ? infoData.nameEn : '' },
    { key: '社团类别：', value: infoData !== undefined ? infoData.category : '' },
    { key: '社团级别：', value: infoData !== undefined ? infoData.level : '' },
  ];

  const rightData = [
    { key: '指导单位：', value: infoData !== undefined ? infoData.guidance : '' },
    { key: '成员最高数：', value: infoData !== undefined ? infoData.memberCount : '' },
    {
      key: '社团章程：',
      value: <Tag color={'blue'}>在线查看</Tag>,
    },
    {
      key: '申请材料：',
      value: (
        <>
          <Tag color={'blue'} onClick={() => document.getElementById('frontImg')?.click()}>查看正面</Tag>
          <Tag color={'blue'} onClick={() => document.getElementById('oppositeImg')?.click()}>查看反面</Tag>
        </>
      ),
    },
  ];

  const TopTab = () => {
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
              {rightData.map((item: any, index) => {
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

  const BottomTab = () => {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '工号/学号',
        dataIndex: 'personId',
        key: 'personId',
      },
      {
        title: '学院/部门',
        dataIndex: 'college',
        key: 'college',
      },
    ];

    return (
      <>
        <Table
          columns={columns}
          dataSource={infoData !== undefined ? infoData.members : ''}
          size="small"
        />
      </>
    );
  };

  //审批通过
  const through = () => {
    const data = {
      Id: detailId,
      Status: 1,
    };
    console.log(data);

    // dispatch({
    //   type: 'communityRegisterApproval/registerAudit',
    //   payload: data,
    // });

    oncancel();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  return (
    <Drawer
      title="注册审批"
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
          <Button onClick={() => through()} type="primary" style={{ marginRight: 8 }}>
            审批通过
          </Button>
          <Button onClick={() => setChildrenDrawerVisible(true)} type="primary" danger>
            拒绝通过
          </Button>
        </div>
      }
    >
      <div>
        <TopTab />
        <Divider style={{ fontSize: '16px' }}>组织成员信息</Divider>
        <BottomTab />
      </div>

      <Image src={getPort('image/') + escape(infoData !== undefined ? infoData.opposite : '')} style={{ display: 'none' }} id='oppositeImg' />
      <Image src={getPort('image/') + escape(infoData !== undefined ? infoData.front : '')} style={{ display: 'none' }} id='frontImg' />
      <Drawer
        title="拒绝理由"
        width={400}
        closable={false}
        onClose={() => setChildrenDrawerVisible(false)}
        visible={childrenDrawerVisible}
      >
        <TextArea rows={10} id="textValue" />
        <div style={{ paddingTop: '50px', textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              const data = {
                Id: detailId,
                Status: 2,
                Value: document.getElementById('textValue')?.innerHTML,
              };
              console.log(data);

              // dispatch({
              //   type: 'communityRegisterApproval/registerAudit',
              //   payload: data,
              // });
              oncancel();
              setChildrenDrawerVisible(false);
              setTimeout(() => {
                afterClose();
              }, 0.5 * 1000);
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
