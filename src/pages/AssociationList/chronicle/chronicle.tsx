// 社团管理 大事记组件

import React, { useState } from 'react'

import { Timeline, Card, Row, Col, Typography, Button, Image, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import ChronicleForm from './components/chronicleForm'

const timeLindData = [
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: ['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg']},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: ['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg','https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1689053532,4230915864&fm=26&gp=0.jpg']},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
  {time: '2020-10-01', title: '这是一条测试用数据title', content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容', src: []},
]

const { Text, Title } = Typography

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
}

const Chronicle: React.FC<{}> = (props) => {

  const [ visible, setVisible ] = useState<boolean>(false)

  return (
    <>
      <Card>
        <Row style={{paddingTop: '20px'}}>
          <Col span={2} />
          <Col span={20}>
            <Timeline mode={'alternate'} pending>
              <Timeline.Item
                style={{height: '100px'}}
                dot={
                  <Button type={'dashed'} style={{borderRadius: '5px', color: 'rgba(0,0,0,0.45)'}} onClick={()=> setVisible(true)}>今日大事记</Button>
                  }
              />
              {
                timeLindData.map((item: any, index: number) => {
                  if (index % 2 !== 0) {
                    return (
                      <Timeline.Item label={<Title level={5} style={{paddingRight: '40px'}}>{item.time}</Title>} key={index} color={getColor(index)} style={{paddingLeft: '20px'}} >
                        <Row>
                          <Text type="secondary">{item.title}</Text>
                        </Row>
                        <Row style={{marginTop: '8px'}}>
                          <Text style={{letterSpacing: '1px'}}>{item.content}</Text>
                        </Row>
                        {
                          item.src.length > 0 ? (
                            <Row gutter={8} style={{marginTop: '16px'}}>
                              {
                                item.src.map((src: string, i: number) => (
                                  <Col key={i} span={4} >
                                    <Image src={src} style={{borderRadius: '5px', overflow: 'hidden'}} />
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
                    )
                  }
                  return (
                    <Timeline.Item label={<Title level={5} style={{paddingLeft: '20px'}}>{item.time}</Title>} key={index} color={getColor(index)} style={{paddingRight: '40px'}} >
                      <Row justify={'end'}>
                        <Text type="secondary">{item.title}</Text>
                      </Row>
                      <Row style={{marginTop: '8px'}} justify={'end'}>
                        <Text style={{letterSpacing: '1px'}}>{item.content}</Text>
                      </Row>
                      {
                        item.src.length > 0 ? (
                          <Row gutter={8} style={{marginTop: '16px'}} justify={'end'}>
                              {
                                item.src.map((src: string, i: number) => (
                                  <Col key={i} span={4} >
                                    <Image src={src} style={{borderRadius: '5px', overflow: 'hidden'}} />
                                  </Col>
                                ))
                              }
                            </Row>
                        ) : 
                          null
                      }
                      <Row style={{marginTop: '8px'}} justify={'end'}>
                        <Popconfirm title={'删除'}>
                          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={'删除'} />
                        </Popconfirm >
                      </Row>
                    </Timeline.Item>
                  )
                })
              }
            </Timeline>
          </Col>
          <Col span={2} />
        </Row>
      </Card>
      <ChronicleForm visible={visible} onClose={()=>setVisible(false)} />
    </>
  )
}

export default Chronicle