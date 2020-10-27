// 招新广场 组件

import React, { FC, useEffect } from 'react';

import { Card, Col, Form, List, Row, Select, Typography, Input, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ListItemDataType } from './data';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

interface ProjectsProps {
  dispatch: Dispatch;
  listAndsearchAndprojects: StateType;
  loading: boolean;
}

const Square: FC<ProjectsProps> = ({
  dispatch,
  listAndsearchAndprojects: { list = [] },
  loading,
}) => {


  const mainSearch = (
    <div style={{ textAlign: 'center' }}>
      <Input.Search
        placeholder="请输入"
        enterButton="搜索"
        size="large"
        style={{ maxWidth: 522, width: '100%' }}
      />
    </div>
  )

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
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
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
              <Tag icon={<CheckCircleOutlined />} color="success">
                招新中
              </Tag>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <PageContainer
      tabList={[{ tab: '招新列表' }]}
      content={mainSearch}
    >
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
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="排序" name="author">
                    <Select placeholder="不限" style={{ width: '100px' }}>
                      <Option value="time" >按时间</Option>
                      <Option value="hot">按热度</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="业务指导单位" name="rate">
                    <Select placeholder="不限" style={{ width: '200px' }}>
                      <Option value="full">全部</Option>
                      <Option value="school">校团委</Option>
                      <Option value="normal">信息工程学院</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <div className={styles.cardList}>{cardList}</div>
      </div>
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
