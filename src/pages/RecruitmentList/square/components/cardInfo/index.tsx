// 卡片详情组件

import React from 'react'

import { Modal, Row, Col, Divider, Image, Switch, Table, Popover, message, Tag, Button } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

import FormatGrid from './formartgrid'
import { TableListItem } from './data'


interface CardInfoProps {
  visible: boolean
  onCancel: () => void
  dataInfo: any
}

// 改变鼠标样式
const changeMouseStyle = {
  cursor: 'pointer'
}

// 测试数据
const testData = () => {

  const valueList = []

  for (let i = 0; i < 100; i++) {
    const value = {
      key: i,
      department: `测试部门${i}`,
      position: `测试职务${i}`,
      requirement: `测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求测试要求${i}`,
      recruit: '10',
      report: '100',
      option: false
    }
    valueList.push(value)
  }

  return valueList
  
}

const clickMe = () => {
  message.error({
    content: '测试用方法',
    duration: 5
  })
}

// 社团详细信息测试数据
const data = [
  [{title: '社团类别', value: '测试类别1'},{title: '成立时间', value: '2010-01-01'},{title: '社团章程', value: <Tag onClick={clickMe} color={"blue"} style={changeMouseStyle} >在线查看</Tag>}],
  [{title: '社团级别', value: '测试级别1'},{title: '学生负责人', value: '测试人员'},{title: '招新QQ群', value: '6655778899',copy: true}],
  [{title: '指导单位', value: '信息工程学院'},{title: '指导老师', value: '测试人员'}]
]


const CardInfo: React.FC<CardInfoProps> = (props) => {

  message.config({
    maxCount: 1,
  })

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
      dataIndex: 'requirement',
      width: '25%',
      key: 'requirement',
      render: (_, record) => {

        const text = (
          <div>
            <p style={{width: '200px'}}>
              {record.requirement}
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
      dataIndex: 'recruit',
      width: '15%',
      key: 'recruit'
    },
    {
      title: '报名数',
      dataIndex: 'report',
      width: '15%',
      key: 'report',
    },
    {
      title: '报名',
      dataIndex: 'option',
      width: '10%',
      key: 'option',
      render: (e, record) => (
        <>
          <Switch checkedChildren="已报名" unCheckedChildren="未报名" onChange={(event)=>{sginUp(event, e, record)}} />
        </>
      ),
    },
  ]

  // Switch 组件的报名方法
  const sginUp = (event: boolean, e: any, record: any) => {
    if (!event) {
      message.warning({
        content: '取消成功',
        duration: 5,
      })
      return
    }

    message.success({
      content: '报名成功',
      duration: 5,
    })

    console.log(record)
  }

  // 模拟触发 antd Image组件的预览方法
  const showImage = () => {
    document.getElementById('square-card-info-image')?.click()
  }

  const { visible, onCancel } = props

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={1200}
      title={props.dataInfo?.title}
      footer={null}
      bodyStyle={{height: '700px'}}
    >
      <Row>
        <Col span={4}>
          <Row justify={'center'} align={'middle'} style={{height: '115px', overflow: 'hidden',}}>
            <img src={'http://www.ncu.edu.cn/img/nculogo.jpg'} style={{height: '115px', width: '115px', borderRadius: '50%'}} onClick={showImage} />
            <Image src={'http://www.ncu.edu.cn/img/nculogo.jpg'} style={{display: 'none'}} id={'square-card-info-image'} />
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
      <Divider dashed style={{fontSize: '14px', color: '#D2D2D2'}} ><ClockCircleOutlined /> 报名截止时间：{new Date().toLocaleDateString()}</Divider>
      <Row>
        <Col span={24}>
          <Table<any>
            size={'small'}
            rowKey="key"
            columns={columns}
            dataSource={testData()}
            pagination={{size: 'small', showSizeChanger: false, pageSize: 10, showTotal: (a,b)=>false}}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default CardInfo