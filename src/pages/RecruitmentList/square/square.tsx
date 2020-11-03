// 招新广场 组件

import React, { useEffect, useState } from 'react';

import { Card, Col, Form, List, Row, Select, Typography, Input, Tag } from 'antd';

import { ClockCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ListItemDataType } from './data';

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
  listAndsearchAndprojects: StateType;
  loading: boolean;
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


const Square: React.FC<ProjectsProps> = ({
  dispatch,
  listAndsearchAndprojects: { list = [] },
  loading,
}) => {

  const [ visible, setVisible ] = useState(false)
  const [ dataInfo, setDataInfo ] = useState<any>()
  const [ getChildren, setGetChildren ] = useState<string>()

  useEffect(() => {
    dispatch({
      type: 'listAndsearchAndprojects/fetch',
      payload: {
        count: 8,
      },
    });
  }, []);

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
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
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} onClick={()=>{showModal(item)}} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{'已报名数: 10'}</span>
              <div className={styles.avatarList}>
              <Tag icon={<ClockCircleOutlined />} color={"blue"}>
                截止时间：2020-10-29
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
              type: 'listAndsearchAndprojects/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="社团类别" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">一类社团</TagSelect.Option>
                <TagSelect.Option value="cat2">二类社团</TagSelect.Option>
                <TagSelect.Option value="cat3">三类社团</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow grid last>
            <Row>
              <Col xl={5} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} name="department" label={'指导单位'} initialValue={'full'}>
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
        break
      }
    return
  }

  return (
    <PageContainer
      tabList={tabList}
      onTabChange={(key)=>setGetChildren(key)}
    >
      {getChildrenNode()}
      <CardInfo onCancel={()=>{setVisible(false)}} dataInfo={dataInfo} visible={visible} />
    </PageContainer>
  );
};

export default connect(
  ({
    listAndsearchAndprojects,
    loading,
  }: {
    listAndsearchAndprojects: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    listAndsearchAndprojects,
    loading: loading.models.listAndsearchAndprojects,
  }),
)(Square);
