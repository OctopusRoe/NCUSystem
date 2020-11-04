// 活动广场 组件

import React from 'react'

import { Card, List, Image, Divider, Space } from 'antd'

import { LikeOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';

const ListItem = List.Item

const value:any = []

const testValue = () => {
  for (let i = 0; i < 100; i++) {
    value.push({
      title: `测试用活动名${i}`,
      content: '测试用活动规则1，测试用活动规则2，测试用活动规则3，测试用活动规则4，测试用活动规则5，测试用活动规则6，测试用活动规则7，测试用活动规则8，测试用活动规则9，测试用活动规则10',
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604483398656&di=fd62903774f27486cc86935a48c4480e&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F44%2F30172%2F39bb32ae796d398e.jpg',
      time: new Date().toLocaleDateString(),
      type: '类型1',
      sponsor: '测试用主办单位',
      organizer: '测试用承办单位',
      place: '测试用活动地点',
      scale: '100',
    })
  }
}

const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const ActiveSquare: React.FC<{}> = (props) => {

  testValue()
  return (
    <>
      <Card>
        <List
          itemLayout={'vertical'}
          dataSource={value}
          pagination={{pageSize: 5, size: 'small', onChange:(e)=>console.log(e), showSizeChanger: false}}
          renderItem={
            (item: any, index: number) => (
              <ListItem
                key={index}
                actions={[
                  <IconText icon={LikeOutlined} text={'123'} />
                ]}
                extra={
                  <div style={{width: '250px', height: '156px', overflow: 'hidden'}}>
                    <Image src={item.src} fallback={require('@/assets/images/fail.png')} />
                  </div>
                }
              >
                <ListItem.Meta
                  title={item.title}
                  description={
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div>{`活动时间: ${item.time}`}</div>
                      <Divider type="vertical" />
                      <div>{`活动类型: ${item.type}`}</div>
                      <Divider type="vertical" />
                      <div>{`主办单位: ${item.sponsor}`}</div>
                      <Divider type="vertical" />
                      <div>{`承办单位: ${item.organizer}`}</div>
                      <Divider type="vertical" />
                      <div>{`活动地点: ${item.place}`}</div>
                      <Divider type="vertical" />
                      <div>{`活动规模: ${item.scale}人`}</div>
                    </div>
                  }
                />
                {item.content}
              </ListItem>
            )
          }

        />
      </Card>
    </>
  )
}

export default ActiveSquare