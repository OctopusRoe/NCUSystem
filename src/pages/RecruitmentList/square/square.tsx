// 招新广场 组件

import React, { useEffect, useState } from 'react';
import { Card, Col, Form, List, Row, Select, Typography, Input, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { ListItemDataType, SquareState } from './data';
import { GlobalModelState } from '@/models/global'

import getPort from '@/services/global'
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import CardInfo from './components/cardInfo'
import SingUp from './components/singUp'
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ProjectsProps {
  dispatch: Dispatch;
  recruitmentSquare: SquareState;
  department: [],
  type: [],
}

// 切换按钮列表
const tabList = [
  {key: 'recruit', tab: '招新列表'},
  {key: 'signUp', tab: '我的报名'}
]

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

// Option 渲染函数
const getOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <Option value={0} >未查询到数据</Option>
  }

  return list.map((item: any, index: number) => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
}

// TagSelect.Option 渲染函数
const getTagSelectOption = (list: any[]) => {
  if (!list || list.length === 0) {
    return <TagSelect.Option value={0} >未查询到数据</TagSelect.Option>
  }

  return list.map((item: any, index: number) => (
      <TagSelect.Option value={item.id} key={item.id} >{item.name}</TagSelect.Option>
    ))

}

const Square: React.FC<ProjectsProps> = ({
  dispatch,
  recruitmentSquare: { list = [], loading, count, joinNumber },
  department,
  type
}) => {

  const [ visible, setVisible ] = useState(false)
  const [ dataInfo, setDataInfo ] = useState<any>()
  const [ getChildren, setGetChildren ] = useState<string>()

  // 保存选择的社团类别
  const [ selectType, setSelectType ] = useState<[]>([])

  // 保存选择的指导单位
  const [ selectDepartment, setSelectDepartment ] = useState<number | null>(null)

  // 保存选择的排序
  const [ sort, setSort ] = useState<string>('')

  // 保存 input 输入框输入的搜索内容
  const [ inputSearch, setInputSearch ] = useState<string>('')

  // 保存分页数
  const [ current, setCurrent ] = useState<number>(1)

  useEffect(() => {
    dispatch({
      type: 'recruitmentSquare/searchPosterList',
      payload: {},
    });

    dispatch({
      type: 'recruitmentSquare/getJoinNumber',
    });

    return () => {
      dispatch({
        type: 'recruitmentSquare/clean'
      });
    }
  }, []);

  // 分页器改变的方法
  const pageSizeChange = (page: number, pageSize: number | undefined) => {
    
    const data = {
      pageIndex: page,
      key: inputSearch,
      category: selectType,
      guidance: selectDepartment,
      orderby: sort
    }

    dispatch({
      type: 'recruitmentSquare/loading',
      payload: true
    })

    dispatch({
      type: 'recruitmentSquare/searchPosterList',
      payload: data
    })

    setCurrent(page)
  }

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      pagination={{ showSizeChanger: false, pageSize: 8, onChange: pageSizeChange, total: count, current: current }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable onClick={()=>{showModal(item)}} cover={<img alt={item.name} src={`${getPort('image/')}${escape(item.poster)}`} style={{height: '239px'}} />}>
            <Card.Meta
              title={<a>{item.name}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.slogan}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{`已报名数: ${item.entryNumber}`}</span>
              <div className={styles.avatarList}>
              <Tag icon={<ClockCircleOutlined />} color={"blue"}>
                截止时间：{item.endDate.split('T')[0]}
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
          // onValuesChange={(e) => {
          // 已禁止
          // 表单项变化时请求数据
          // 模拟查询表单生效
          // }}
        >
          <StandardFormRow title="社团类别" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable onChange={(e: any) => {
                  // 单击后调用查询接口，并且把数据保存起来，分页器调用
                  setSelectType(e)
                  dispatch({
                    type: 'recruitmentSquare/loading',
                    payload: true
                  })
                  dispatch({
                    type: 'recruitmentSquare/searchPosterList',
                    payload: {category: e}
                  })
                }}
              >
                {getTagSelectOption(type)}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow grid last>
            <Row>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="department" label={'指导单位'} initialValue={'allValue'}>
                  <Select showSearch style={{ width: '200px' }} onChange={(e: any) => {
                      // 单击后调用查询接口，并且把数据保存起来，分页器调用
                      if ( e === 'allValue' ) {
                        setSelectDepartment(null)
                        dispatch({
                          type: 'recruitmentSquare/loading',
                          payload: true
                        })
                        dispatch({
                          type: 'recruitmentSquare/searchPosterList',
                          payload: {guidance: null}
                        })
                        return
                      }

                      setSelectDepartment(e)
                      dispatch({
                        type: 'recruitmentSquare/loading',
                        payload: true
                      })
                      dispatch({
                        type: 'recruitmentSquare/searchPosterList',
                        payload: {guidance: e}
                      })
                    }}
                  > 
                    {department && <Option value={'allValue'} key={'allValue'} >全部</Option>}
                    {getOption(department)}
                  </Select>
                </FormItem>
              </Col>
              <Col xl={4} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="time" label={'排序方式'} style={{width: '200px'}} initialValue={'Date'}>
                  <Select style={{ width: '100px' }} onChange={(e: any) => {
                      // 单击后调用查询接口，并且把数据保存起来，分页器调用
                      setSort(e)
                      dispatch({
                        type: 'recruitmentSquare/loading',
                        payload: true
                      })
                      dispatch({
                        type: 'recruitmentSquare/searchPosterList',
                        payload: {orderby: e}
                      })
                    }}
                  >
                    <Option value="Date" >按时间</Option>
                    <Option value="Hot">按热度</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="searchInput" label={'关键字'} initialValue={''}>
                  <Input.Search
                    placeholder={'请输入'}
                    style={{width: '250px'}}
                    enterButton={"搜索"}
                    autoComplete={'off'}
                    onSearch={(e: string) => {
                      // input 搜索框的搜索方法
                      setInputSearch(e)
                      dispatch({
                        type: 'recruitmentSquare/loading',
                        payload: true
                      })
                      dispatch({
                        type: 'recruitmentSquare/searchPosterList',
                        payload: {key: e}
                      })
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  )

  const showModal = (item: any) => {
    setVisible(true)
    setDataInfo(item)
  }

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
      <CardInfo
        joinNumber={joinNumber}
        afterClose={() => setDataInfo({})}
        onCancel={()=>{setVisible(false)}}
        dataInfo={dataInfo}
        visible={visible}
      />
    </PageContainer>
  );
};

export default connect(
  ({recruitmentSquare, global}: {
    recruitmentSquare: SquareState,
    global: GlobalModelState
  }) => ({
    recruitmentSquare,
    department: global.SelectValue.department,
    type: global.SelectValue.type
  }),
)(Square);
