// 社团管理 大事记组件

import React from 'react'

import { Timeline, Card, Row, Col, Typography, Button, Image, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import ChronicleForm from './components/chronicleForm'

const timeLindData = [
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: ['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg']},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
]

const { Text } = Typography

// 随机选择颜色的方法
const getColor = (index: number) => {
  const a = index % 3
  switch (a) {
    case 1:
      return 'blue';
    case 2:
      return 'green';
    case 3:
      return 'gray';
    default:
      return 'gray';
  }
}

const Chronicle: React.FC<{}> = (props) => {
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card>
            <Row>
              <Col span={20}>
                <Timeline mode={'left'}>
                  {
                    timeLindData.map((item: any, index: number) => (
                      <Timeline.Item label={item.time} key={index} color={getColor(index)} >
                        <Row>
                          <Text type="secondary">{item.title}</Text>
                        </Row>
                        <Row>
                          <Text>{item.content}</Text>
                        </Row>
                        {
                          item.src.length > 0 ? (
                            <Row gutter={8} style={{marginTop: '8px'}}>
                              {
                                item.src.map((src: string, i: number) => (
                                  <Col key={i} span={8}>
                                    <Image src={src} />
                                  </Col>
                                ))
                              }
                            </Row>
                          ) : 
                            null
                        }
                        <Row style={{marginTop: '8px'}}>
                          <Popconfirm title={'删除'}>
                            <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={'删除'} />
                          </Popconfirm >
                        </Row>
                      </Timeline.Item>
                    ))
                  }
                </Timeline>
              </Col>
              <Col span={4} />
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'新增大事记'}>
            <ChronicleForm />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Chronicle