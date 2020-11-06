// 活动广场 组件

import React, { useEffect, useState } from 'react';

import { Card, Col, Form, List, Row, Select, Typography, Input, Tag } from 'antd';

import { ClockCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ListItemDataType } from './data';

import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import SingUp from './components/singUp'
import styles from './style.less';

import ActiveInfoModal from '@/components/ActiveInfoModal/ActiveInfoModal'

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ProjectsProps {
  dispatch: Dispatch;
  listAndsearchAndprojects: StateType;
  loading: boolean;
}

// 切换按钮列表
const tabList = [
  {key: 'recruit', tab: '招新列表'},
  {key: 'signUp', tab: '我的报名'}
]

// grid layout of form item
const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const value:any = []

const testValue = () => {
  for (let i = 0; i < 100; i++) {
    value.push({
      title: `测试用活动名${i}`,
      content: '测试用活动规则1，测试用活动规则2，测试用活动规则3，测试用活动规则4，测试用活动规则5',
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

const ActiveSquare: React.FC<ProjectsProps> = ({
  dispatch,
  listAndsearchAndprojects: {list = []},
  loading
}) => {

  // creat test data of list
  testValue()

  const [ visible, setVisible ] = useState(false)
  const [ dataInfo, setDataInfo ] = useState<any>()
  const [ getChildren, setGetChildren ] = useState<string>()

  const showModal = (item: any) => {
    const testValue = {
      src: item.src,
      data: [
        [{title: '活动名称', value: item.title},{title: '活动类型', value: item.type},{title: '活动时间', value: item.time}],
        [{title: '主办单位', value: item.sponsor},{title: '承办单位', value: item.organizer}, {title: '活动规模', value: item.scale}],
        [{title: '活动地点', value: item.place}],
        [{title: '活动详情', value: item.content}]
      ]
    }
    setDataInfo(testValue)
    setVisible(true)
  }

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      pagination={{showSizeChanger: false, pageSize: 8}}
      // loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={value}
      renderItem={(item:any,index: number) => (
        <List.Item key={index}>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.src} onClick={() => showModal(item)} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.content}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{`活动规模: ${item.scale}人`}</span>
              <div className={styles.avatarList}>
              <Tag icon={<ClockCircleOutlined />} color={"blue"}>
                {`截止时间：${new Date().toLocaleDateString()}`}
              </Tag>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const SquareList = (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={() => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            dispatch({
              type: 'ActiveSquare/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="活动类型" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">一类活动</TagSelect.Option>
                <TagSelect.Option value="cat2">二类活动</TagSelect.Option>
                <TagSelect.Option value="cat3">三类活动</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow grid last>
            <Row>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="department" label={'主办单位'} initialValue={'full'}>
                  <Select style={{ width: '200px' }}>
                    <Option value="full">全部</Option>
                    <Option value="school">校团委</Option>
                    <Option value="normal">信息工程学院</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={4} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="time" label={'排序方式'} style={{width: '200px'}} initialValue={'time'}>
                  <Select style={{ width: '100px' }}>
                    <Option value="time" >按时间</Option>
                    <Option value="hot">按热度</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="searchInput" label={'关键字'} initialValue={''}>
                  <Input.Search placeholder={'请输入'} style={{width: '250px'}} enterButton={"搜索"} />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  )

  const getChildrenNode = () => {

    switch (getChildren) {
      case 'recruit':
        return SquareList;
      case 'signUp':
        return <SingUp />;
      default:
        return SquareList;
      }
    return
  }

  return (
    <PageContainer
      tabList={tabList}
      onTabChange={(key)=>setGetChildren(key)}
    >
      {getChildrenNode()}
    <ActiveInfoModal visible={visible} info={dataInfo} onCancel={() => setVisible(false)} />
    </PageContainer>
  )
}

export default connect((
  {
    listAndsearchAndprojects,
    loading
  }
  :
  {
    listAndsearchAndprojects: StateType;
    loading: { models: { [key: string]: boolean } };
  }
)=>(
  {
    listAndsearchAndprojects,
    loading: loading.models.ActiveSquare,
  }
))(ActiveSquare)