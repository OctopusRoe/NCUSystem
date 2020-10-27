// 卡片详情组件

import React from 'react'

import { Modal, Row, Col, List, Divider, Card } from 'antd'

interface CardInfoProps {
  visible: boolean
  onCancel: () => void
  dataInfo: any
}

const CardInfo: React.FC<CardInfoProps> = (props) => {

  const data = [
    {title: '社团名称', info: '家园工作室'},
    {title: '社团类别', info: '测试类别1'},
    {title: '社团级别', info: '测试级别1'},
    {title: '指导单位', info: '信息工程学院'},
    {title: '成立时间', info: '2010-01-01'},
    {title: '社团简介', info: '测试社团简介...'},
  ]
  console.log(props.dataInfo)
  const { visible, onCancel } = props
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={1000}
      title={props.dataInfo?.title}
      footer={null}
      bodyStyle={{padding: 0}}
    >
      <Row>
        <Col span={12}>
          <img src={props.dataInfo?.cover} style={{width: '100%'}} />
        </Col>
        <Col span={12}>
          <List
            header={<div>社团详情</div>}
            itemLayout={"horizontal"}
            grid={{column: 2}}
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item>
                <div style={{display: 'flex', padding: '12px'}}>
                  <div>{item.title}</div>
                  <div style={{paddingLeft: '20px'}}>{item.info}</div>
                </div>
                <Divider style={{margin: 0}} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Modal>
  )
}

export default CardInfo