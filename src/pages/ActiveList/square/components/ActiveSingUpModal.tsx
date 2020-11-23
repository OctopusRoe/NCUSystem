// 活动广场中的活动详情组件

import React from 'react'

import { Modal, Row, Col, Image, Divider } from 'antd'

import { ClockCircleOutlined } from '@ant-design/icons'

interface ActiveInfoModalProps {
  visible: boolean
  info: Info 
  onCancel: () => void
}

interface Info {
  src: string
  data: {title: string, value: string}[][]
}



const ActiveSingUpModal: React.FC<ActiveInfoModalProps> = (props) => {

  const { visible, info, onCancel } = props
  
  if (!info) {
    return <></>
  }

  return (
  <Modal
    width={1200}
    visible={visible}
    onCancel={onCancel}
    title={'详细信息'}
    footer={null}
    bodyStyle={{height: '700px'}}
  >
    <Row>
      <Col span={24}>
        {
          info.data.map((item: {title: string, value: string}[], index: number) => (
            <Row key={index}>
              {
                item.map((e: {title: string, value: string}, i: number) => (
                  <Col span={8} key={i}>
                    <Row>
                      <Col span={9}>
                        <Row justify={'end'}><p style={{color: '#939393'}}>{e.title}：</p></Row>
                      </Col>
                      <Col span={15}>
                        {e.value}
                      </Col>
                    </Row>
                  </Col>
                ))
              }
            </Row>
          ))
        }
      </Col>
    </Row>
    <Divider dashed style={{fontSize: '14px', color: '#D2D2D2'}} ><ClockCircleOutlined /> 活动时间：{new Date().toLocaleDateString()}</Divider>
    <Row justify={'center'} align={'middle'} style={{height: '424px', overflow: 'hidden'}}>
      <Image src={info.src} style={{width: '100%'}} />
    </Row>
  </Modal>
  )
}

export default ActiveSingUpModal