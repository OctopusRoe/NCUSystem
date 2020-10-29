// 栅格化排版 组件

import React from 'react'

import { Row, Col, Typography } from 'antd'

interface FormatGridProps {
  data: Data[]
}

export interface Data {
  title: string
  value: string | React.ReactNode
  copy?: boolean
}

const { Paragraph } = Typography

const FormatGrid: React.FC<FormatGridProps> = (props) => {

  const { data } = props

  return (
    <Row>
      {
        data.map((item: Data, index) => {

          if (item.copy) {
            return (
              <Col span={6} key={index}>
                <Row>
                  <Col span={8}>
                    <Row justify={'end'}><p style={{color: '#939393'}}>{item.title}：</p></Row>
                  </Col>
                  <Col span={16}><Paragraph copyable>{item.value}</Paragraph></Col>
                </Row>
              </Col>
            )
          }

          return (
            <Col span={6} key={index}>
              <Row>
                <Col span={8}>
                  <Row justify={'end'}><p style={{color: '#939393'}}>{item.title}：</p></Row>
                </Col>
                <Col span={16}><p>{item.value}</p></Col>
              </Row>
            </Col>
          )
        })
      }

    </Row>
  )
}

export default FormatGrid