// 卡片详情组件

import React, { useState, useEffect } from 'react'

import { Modal, Row, Col, Divider, Image, Switch, Table, Popover, Tag, Button, message } from 'antd'
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons'

import FormatGrid from './formartgrid'
import { TableListItem } from './data'
import { connect, Dispatch } from 'umi'

import getPort from '@/services/global'
import FileViewer from '@/assets/react-file-viewer/index'

interface CardInfoProps {
  visible: boolean
  joinNumber: number
  onCancel: () => void
  dataInfo: any
  afterClose: () => void
  dispatch: Dispatch
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

const CardInfo: React.FC<CardInfoProps> = (props) => {

  const { dataInfo,  afterClose, visible, onCancel, dispatch, joinNumber } = props

  if (!dataInfo) {
    return <></>
  }

  const [count, setCount] = useState<string>('')

  const [fileVisible, setFileVible] = useState<boolean>(false)

  // 社团详细信息测试数据
  const data = [
    [{title: '社团类别', value: dataInfo.category},{title: '成立时间', value: dataInfo.createDate},{title: '社团章程', value: <Tag onClick={() => setFileVible(true)} color={"blue"} style={changeMouseStyle} >在线查看</Tag>}],
    [{title: '社团级别', value: dataInfo.level},{title: '学生负责人', value: dataInfo.responsible},{title: '招新QQ群', value: dataInfo.qq,copy: true}],
    [{title: '指导单位', value: dataInfo.guidanceUnit},{title: '指导老师', value: dataInfo.instructor}]
  ]

  // 每列属性
  const columns: TableListItem[] = [
    {
      title: '部门',
      dataIndex: 'department',
      width: '20%',
      key: 'department',
    },
    {
      title: '职务',
      dataIndex: 'position',
      width: '15%',
      key: 'position', 
    },
    {
      title: '招新要求',
      dataIndex: 'request',
      width: '25%',
      key: 'request',
      render: (_, record: any) => {
        const text = (
          <div>
            <p style={{width: '200px'}}>
              {record.request}
            </p>
          </div>
        )

        return (
          <div>
            <Popover content={text} trigger={'click'}>
              <Tag color={"blue"} style={changeMouseStyle}>查看</Tag>
            </Popover>
          </div>
        )
      }
    },
    {
      title: '招新数',
      dataIndex: 'number',
      width: '15%',
      key: 'number'
    },
    {
      title: '报名数',
      dataIndex: 'entryNumber',
      width: '15%',
      key: 'entryNumber',
    },
    {
      title: '报名',
      dataIndex: 'option',
      width: '10%',
      key: 'option',
      render: (e, record: any) => (
        <>
          <Switch
            checkedChildren="已报名"
            unCheckedChildren="未报名"
            onChange={(event)=>{sginUp(event, e, record)}}
            defaultChecked={record.isEnter}
            disabled={ joinNumber >= 2 ? true : false}
          />
        </>
      ),
    },
  ]

  // Switch 组件的报名方法
  const sginUp = (event: boolean, e: any, record: any) => {

    if (!event) {

      record.entryNumber--
      record.isEnter = event
      dispatch({
        type: 'recruitmentSquare/cancelAssociation',
        payload: record.id
      })

      setCount(new Date().getTime().toString())
      return
    }

    dispatch({
      type: 'recruitmentSquare/signAssociation',
      payload: record.id
    })

    record.entryNumber++
    record.isEnter = event

    setCount(new Date().getTime().toString())

  }

  // 模拟触发 antd Image组件的预览方法
  const showImage = () => {
    document.getElementById('square-card-info-image')?.click()
  }

  const downLoad = () => {
    dispatch({
      type: 'recruitmentSquare/downFile',
      payload: {
        url: `${getPort('registapproval/getconstitution')}?Url=${escape(dataInfo.constitution)}`,
        name: dataInfo.name
      }
    })
  }

  useEffect(() => {}, [count])

  return (
    <Modal
      destroyOnClose
      visible={visible}
      onCancel={() => {onCancel(); afterClose()}}
      width={1200}
      title={dataInfo.name}
      footer={null}
      bodyStyle={{height: '700px'}}
    >
      <Row>
        <Col span={4}>
          <Row justify={'center'} align={'middle'} style={{height: '115px', overflow: 'hidden',}}>
            <img src={`${getPort('image/')}${escape(dataInfo.logo)}`} style={{height: '115px', width: '115px', borderRadius: '50%'}} onClick={showImage} />
            <Image src={`${getPort('image/')}${escape(dataInfo.logo)}`} style={{display: 'none'}} id={'square-card-info-image'} />
          </Row>
        </Col>
        <Col span={20}>
          {
            data.map((item: any, index: number) => (
              <FormatGrid data={item} key={index} />
            ))
          }
        </Col>
        </Row>
      <Divider dashed style={{fontSize: '14px', color: '#D2D2D2'}} ><ClockCircleOutlined /> 报名截止时间：{dataInfo.endDate && dataInfo.endDate.split('T')[0]}</Divider>
      <Row>
        <Col span={24}>
          <Table<any>
            size={'small'}
            rowKey="id"
            columns={columns}
            dataSource={dataInfo.positon}
            pagination={{size: 'small', showSizeChanger: false, pageSize: 10, showTotal: (a,b)=>false}}
          />
        </Col>
      </Row>
      <Modal
        destroyOnClose
        title="社团章程"
        width={800}
        bodyStyle={{height: '700px'}}
        visible={fileVisible}
        onCancel={() => setFileVible(false)}
        footer={<Button type='primary' onClick={downLoad}><DownloadOutlined />下载</Button>}
      >
        <FileViewer fileType={'docx'} filePath={`${getPort('registapproval/getconstitution')}?Url=${escape(dataInfo.constitution)}`} />
      </Modal>
    </Modal>
  )
}

export default connect()(CardInfo)