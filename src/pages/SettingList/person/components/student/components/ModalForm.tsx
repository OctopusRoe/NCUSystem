import { Col, Form, Input, Radio, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';

const ModalForm: React.FC<{}> = (porps) => {
  return (
    <>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} >
        <Row justify="center">
          <Col span={24}>
            <FormItem name="category" label="用户类别">
              <Radio.Group>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem name="userName" label="姓名">
              <Input style={{ width: '50%' }} />
            </FormItem>
            <FormItem name="id" label="学号/工号">
              <Input style={{ width: '50%' }} />
            </FormItem>
            <FormItem name="sex" label="性别">
              <Radio.Group>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem name="IdCard" label="身份证号">
              <Input style={{ width: '80%' }} />
            </FormItem>
            <FormItem name="phone" label="手机号">
              <Input style={{ width: '50%' }} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ModalForm;
