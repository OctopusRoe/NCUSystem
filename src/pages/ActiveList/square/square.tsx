// 活动广场 组件

import React, { useEffect, useState } from 'react';

import { Card, Col, Form, List, Row, Select, Typography, Input, Tag, Switch, message } from 'antd';

import { ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { ListItemDataType, SquareState } from './data';
import { GlobalModelState } from '@/models/global';

import getPort from '@/services/global'
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import SingUp from './components/singUp';
import styles from './style.less';
// import ActiveInfoModal from '@/components/ActiveInfoModal/ActiveInfoModal';
import ActiveSingUpModal from './components/ActiveSingUpModal'

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ProjectsProps {
  dispatch: Dispatch;
  activeSquare: SquareState;
  loading: boolean;
  activeType: any;
  department: any;
}

// 切换按钮列表
const tabList = [
  { key: 'recruit', tab: '活动列表' },
  { key: 'signUp', tab: '我的报名' },
];

// grid layout of form item
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

const ActiveSquare: React.FC<ProjectsProps> = ({
  dispatch,
  activeSquare: { list = [], loading, count },
  activeType,
  department
}) => {

  const [visible, setVisible] = useState(false);
  const [getChildren, setGetChildren] = useState<string>();

  // 保存选择的活动类别
  const [ selectType, setSelectType ] = useState<[]>([])

  // 保存选择的主办单位
  const [ selectSponsor, setSelectSponsor ] = useState<number | null>(null)

  // 保存选择的排序
  const [ sort, setSort ] = useState<string>('')

  // 保存 input 输入框输入的搜索内容
  const [ inputSearch, setInputSearch ] = useState<string>('')

  // 保存分页数
  const [ current, setCurrent ] = useState<number>(1)

  useEffect(() => {
    dispatch({
      type: 'activeSquare/searchPosterList',
      payload: {}
    })

    return () => {
      dispatch({
        type: 'activeSquare/clean'
      })
    }
  }, [])

  // 分页器改变的方法
  const pageSizeChange = (page: number, pageSize: number | undefined) => {
    
    const data = {
      pageIndex: page,
      key: inputSearch,
      category: selectType,
      guidance: selectSponsor,
      orderby: sort
    }

    dispatch({
      type: 'activeSquare/loading',
      payload: true
    })

    dispatch({
      type: 'activeSquare/searchPosterList',
      payload: data
    })

    setCurrent(page)
  }

  const showModal = (item: any) => {

    dispatch({
      type: 'activeSquare/getInfo',
      payload: item.id
    })

    setVisible(true);
  };

  // Switch 组件的报名方法
  const sginUp = (event: boolean) => {
    if (!event) {
      message.warning({
        content: '取消成功',
        duration: 5,
      });
      return;
    }
  };

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      pagination={{ showSizeChanger: false, pageSize: 8, onChange: pageSizeChange, total: count, current: current }}
      loading={loading}
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
      renderItem={(item: any, index: number) => (
        <List.Item key={index}>
          <Card
            className={styles.card}
            hoverable
            onClick={() => showModal(item)} 
            cover={<img alt={item.name} src={`${getPort('image/')}${escape(item.posters)}`} style={{height: '239px'}} />}
          >
            <Card.Meta
              title={<a>{item.name}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.detail}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{`活动规模: ${item.scale}人`}</span>
              <div className={styles.avatarList}>
                <Tag icon={<ClockCircleOutlined />} color={'blue'}>
                  {`截止时间：${item.endTime.split('T')[0]}`}
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
          <StandardFormRow title="活动类型" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable onChange={(e: any) => {
                // 单击后调用查询接口，并且把数据保存起来，分页器调用
                setSelectType(e)
                dispatch({
                  type: 'activeSquare/loading',
                  payload: true
                })
                dispatch({
                  type: 'activeSquare/searchPosterList',
                  payload: {type: e}
                })
              }}
              
              >
                {getTagSelectOption(activeType)}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow grid last>
            <Row>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem
                  {...formItemLayout}
                  name="department"
                  label={'主办单位'}
                  initialValue={'allValue'}
                >
                  <Select style={{ width: '200px' }} onChange={(e: any) => {
                    // 单击后调用查询接口，并且把数据保存起来，分页器调用
                    if (e === 'allValue') {
                      setSelectSponsor(null)
                      dispatch({
                        type: 'activeSquare/loading',
                        payload: true
                      })
                      dispatch({
                        type: 'activeSquare/searchPosterList',
                        payload: {sponsor: null}
                      })
                      return
                    }

                    setSelectSponsor(e)
                    dispatch({
                      type: 'activeSquare/loading',
                      payload: true
                    })
                    dispatch({
                      type: 'activeSquare/searchPosterList',
                      payload: {sponsor: e}
                    })
                  }}
                  >
                    {department && <Option value={'allValue'} key={'allValue'} >全部</Option>}
                    {getOption(department)}
                  </Select>
                </FormItem>
              </Col>
              <Col xl={4} lg={10} md={12} sm={24} xs={24}>
                <FormItem
                  {...formItemLayout}
                  name="time"
                  label={'排序方式'}
                  style={{ width: '200px' }}
                  initialValue={'Date'}
                >
                  <Select style={{ width: '100px' }} onChange={(e: string) => {
                    // 单击后调用查询接口，并且把数据保存起来，分页器调用
                    setSort(e)
                    dispatch({
                      type: 'activeSquare/loading',
                      payload: true
                    })
                    dispatch({
                      type: 'activeSquare/searchPosterList',
                      payload: {orderby: e}
                    })
                  }}>
                    <Option value="Date">按时间</Option>
                    <Option value="Hot">按热度</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="searchInput" label={'关键字'} initialValue={''}>
                  <Input.Search
                    placeholder={'请输入'}
                    style={{ width: '250px' }}
                    enterButton={'搜索'}
                    onSearch={(e: string) => {
                      // input 搜索框的搜索方法
                      setInputSearch(e)
                      dispatch({
                        type: 'activeSquare/loading',
                        payload: true
                      })
                      dispatch({
                        type: 'activeSquare/searchPosterList',
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
  );

  const getChildrenNode = () => {
    switch (getChildren) {
      case 'recruit':
        return SquareList;
      case 'signUp':
        return <SingUp />;
      default:
        return SquareList;
    }
    return;
  };

  return (
    <PageContainer tabList={tabList} onTabChange={(key) => setGetChildren(key)}>
      {getChildrenNode()}
      <ActiveSingUpModal visible={visible} onCancel={() => setVisible(false)} />
    </PageContainer>
  );
};

export default connect(
  ({
    activeSquare,
    global
  }: {
    activeSquare: SquareState;
    global: GlobalModelState
  }) => ({
    activeSquare,
    activeType: global.SelectValue.activeType,
    department: global.SelectValue.department
  }),
)(ActiveSquare);
