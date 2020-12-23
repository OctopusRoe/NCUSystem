// 活动广场中的活动详情组件

import React, { useEffect } from 'react'

import { Modal, Row, Col, Image, Divider, Spin, Switch } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { connect, Dispatch } from 'umi'
import { SquareState } from '../data'

import getPort from '@/services/global'

interface ActiveInfoModalProps {
  visible: boolean
  info: any
  onCancel: () => void
  dispatch: Dispatch
}

interface Info {
  src: string
  data: {title: string, value: string}[][]
}

const strlength = (str: string) => {
  if (!str) {
    return
  }
  return str.split(',').join(' ')
}

const ActiveSingUpModal: React.FC<ActiveInfoModalProps> = (props) => {

  const { visible, info, onCancel, dispatch } = props

  const InfoValue = {
    src: `${getPort('image/')}${escape(info.posters)}`,
    data: [
      [
        { title: '活动名称', value: info.name },
        { title: '活动类型', value: info.type },
        { title: '活动时间', value: `${info.startTime && info.startTime.split('T')[0].split('-').join('/')} - ${info.endTime && info.endTime.split('T')[0].split('-').join('/')}` },
      ],
      [
        { title: '主办单位', value: strlength(info.sponsor) },
        { title: '承办单位', value: strlength(info.organizer) },
        { title: '活动规模', value: info.scale },
      ],
      [
        { title: '活动详情', value: info.detail },
        { title: '活动地点', value: info.place },
        {
          title: '报名',
          
          value: (
            <Switch
              checkedChildren="已报名"
              unCheckedChildren="未报名"
              defaultChecked={info.isSignUp}
              onChange={(event) => {

                if (event) {
                  dispatch({
                    type: 'activeSquare/signActive',
                    payload: {
                      Id: info.id,
                      status: Number(event) - 1
                    }
                  })
                  return
                }

                dispatch({
                  type: 'activeSquare/signActive',
                  payload: {
                    Id: info.id,
                    status: Number(event) + 1
                  }
                })
              }}
            />
          ),
        },
      ],
    ],
  };

  return (
  <Modal
    width={1200}
    visible={visible}
    onCancel={onCancel}
    title={'详细信息'}
    footer={null}
    bodyStyle={{height: '700px'}}
  >
    {
      info.name ?
      <div>
        <Row>
          <Col span={24}>
            {
              InfoValue.data.map((item: {title: string, value: string}[], index: number) => (
                <Row key={index}>
                  {
                    item.map((e: {title: string, value: string}, i: number) => (
                      <Col span={8} key={i}>
                        <Row>
                          <Col span={9}>
                            <Row justify={'end'}><p style={{color: '#939393'}}>{e.title}：</p></Row>
                          </Col>
                          <Col span={15} style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
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
        <Divider dashed style={{fontSize: '14px', color: '#D2D2D2'}} ><ClockCircleOutlined /> 活动时间：{`${info.startTime && info.startTime.split('T')[0].split('-').join('/')} - ${info.endTime && info.endTime.split('T')[0].split('-').join('/')}`}</Divider>
        <Row justify={'center'} align={'middle'} style={{height: '424px', overflow: 'hidden'}}>
          <Image src={InfoValue.src} style={{width: '100%'}} />
        </Row>
      </div> :
      <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Spin size={'large'} />
      </div>
    }
  </Modal>
  )
}

export default connect(
  ({activeSquare}: {activeSquare: SquareState}) => ({
    info: activeSquare.info
  })
)(ActiveSingUpModal)