// 社团管理 大事记组件

import React, { useEffect, useState } from 'react';

import { Timeline, Card, Row, Col, Typography, Button, Image, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ChronicleForm from './components/chronicleForm';
import { connect, Dispatch } from 'umi';
import { ChronicleState } from './data';
import getPort from '@/services/global';

const { Text, Title } = Typography;

// 随机选择颜色的方法
const getColor = (index: number) => {
  switch (index % 3) {
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'gray';
    default:
      return 'gray';
  }
};

interface ChronicleProps {
  dataSource: any;
  loading: boolean;
  dispatch: Dispatch;
}

const Chronicle: React.FC<ChronicleProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { dataSource, dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'communityMemorabilia/searchChronicle',
      payload: {},
    });
  }, []);

  const deleteChronicle = (id: any) => {
    dispatch({
      type: 'communityMemorabilia/deleteChronicle',
      payload: id,
    });

    setTimeout(() => {
      reloadValue();
    }, 0.5 * 1000);
  };

  // 更新后的回调
  const reloadValue = () => {
    dispatch({
      type: 'communityMemorabilia/searchChronicle',
      payload: {},
    });

    dispatch({
      type: 'communityMemorabilia/loading',
      payload: true,
    });
  };

  return (
    <>
      <Card>
        <Row style={{ paddingTop: '20px' }}>
          <Col span={2} />
          <Col span={20}>
            <Timeline mode={'alternate'} pending={true}>
              <Timeline.Item
                style={{ height: '100px' }}
                dot={
                  <Button
                    type={'dashed'}
                    style={{ borderRadius: '5px', color: 'rgba(0,0,0,0.45)' }}
                    onClick={() => setVisible(true)}
                  >
                    添加大事记
                  </Button>
                }
              />
              {dataSource.map((item: any, index: number) => {
                if (index % 2 !== 0) {
                  return (
                    <Timeline.Item
                      label={
                        <Title level={5} style={{ paddingRight: '40px' }}>
                          {item.time.slice(0, 10)}
                        </Title>
                      }
                      key={index}
                      color={getColor(index)}
                      style={{ paddingLeft: '20px' }}
                    >
                      <Row>
                        <Text type="secondary">{item.title}</Text>
                      </Row>
                      <Row style={{ marginTop: '8px' }}>
                        <Text style={{ letterSpacing: '1px' }}>{item.content}</Text>
                      </Row>
                      {item.images[0] !== '' ? (
                        <Row gutter={8} style={{ marginTop: '16px' }}>
                          {item.images.map((src: string, i: number) => (
                            <Col key={i} span={4}>
                              <Image
                                src={getPort('image/') + escape(src)}
                                style={{ borderRadius: '5px', overflow: 'hidden' }}
                              />
                            </Col>
                          ))}
                        </Row>
                      ) : null}
                      <Row style={{ marginTop: '8px' }}>
                        <Popconfirm
                          title={'确定要删除？'}
                          onConfirm={() => deleteChronicle(item.id)}
                        >
                          <Button
                            size={'small'}
                            icon={<DeleteOutlined />}
                            type={'link'}
                            title={'删除'}
                          />
                        </Popconfirm>
                      </Row>
                    </Timeline.Item>
                  );
                }
                return (
                  <Timeline.Item
                    label={
                      <Title level={5} style={{ paddingLeft: '20px' }}>
                        {item.time.slice(0, 10)}
                      </Title>
                    }
                    key={index}
                    color={getColor(index)}
                    style={{ paddingRight: '40px' }}
                  >
                    <Row justify={'end'}>
                      <Text type="secondary">{item.title}</Text>
                    </Row>
                    <Row style={{ marginTop: '8px' }} justify={'end'}>
                      <Text style={{ letterSpacing: '1px' }}>{item.content}</Text>
                    </Row>
                    {item.images[0] !== '' ? (
                      <Row gutter={8} style={{ marginTop: '16px' }} justify={'end'}>
                        {item.images.map((src: string, i: number) => (
                          <Col key={i} span={4}>
                            <Image
                              src={getPort('image/') + escape(src)}
                              style={{ borderRadius: '5px', overflow: 'hidden' }}
                            />
                          </Col>
                        ))}
                      </Row>
                    ) : null}
                    <Row style={{ marginTop: '8px' }} justify={'end'}>
                      <Popconfirm title={'确定要删除？'} onConfirm={() => deleteChronicle(item.id)}>
                        <Button
                          size={'small'}
                          icon={<DeleteOutlined />}
                          type={'link'}
                          title={'删除'}
                        />
                      </Popconfirm>
                    </Row>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </Col>
          <Col span={2} />
        </Row>
      </Card>
      <ChronicleForm visible={visible} onClose={() => setVisible(false)} afterClose={reloadValue} />
    </>
  );
};

export default connect(({ communityMemorabilia }: { communityMemorabilia: ChronicleState }) => {
  return { dataSource: communityMemorabilia.chronicleList, loading: communityMemorabilia.loading };
})(Chronicle);
