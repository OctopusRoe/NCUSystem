import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select, Tabs, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { connect, Dispatch } from 'umi';
import { SetClassState } from '../../../SettingList/base/data';

interface AddModalProps {
  modalVisible: boolean;
  onCancel: () => void;
  afterClose: () => void;
  dispatch: Dispatch;
  classData: any;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

const { Option } = Select;
const { TabPane } = Tabs;
const userType = [
  { id: 1, type: '学生' },
  { id: 2, type: '教职工' },
];
const AddModal: React.FC<AddModalProps> = (props) => {
  const { modalVisible, onCancel, afterClose, dispatch, classData } = props;
  const [tabKey, settabKey] = useState('1');
  //Tab栏change
  const callBack = (key: string) => {
    settabKey(key);
  };

  //modal框确定按钮
  const okChange = () => {
    tabKey === '1'
      ? document.getElementById('add-submit-1')?.click()
      : document.getElementById('add-submit-2')?.click();
  };

  //单个添加
  const onFinish = (values: any) => {
    values.class = parseInt(values.class);
    dispatch({
      type: 'settingPerson/addPerson',
      payload: values,
    });

    onCancel();

    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  // 下载模板的方法
  const downLoadFunc = () => {
    dispatch({
      type: 'settingPerson/getTemplate',
    });
  };

  //批量导入
  const onFinishSingle = (e: any) => {
    dispatch({
      type: 'settingPerson/upLoad',
      payload: e.upload.fileList[0].originFileObj,
    });
    onCancel();
    setTimeout(() => {
      afterClose();
    }, 0.5 * 1000);
  };

  function onChange(value: any) {
    console.log(`selected ${value}`);
    const data = {
      query: value,
    };
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data,
    });
  }

  function onBlur() {
    console.log('blur');
    // 退出组件后清除调用的数据
    return () => {
      dispatch({
        type: 'baseSetClass/cleanState',
      });
    };
  }

  function onFocus() {
    console.log('focus');
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: {},
    });
  }

  function onSearch(val: any) {
    console.log('search:', val);

    const data = {
      query: val,
    };
    dispatch({
      type: 'baseSetClass/searchClass',
      payload: data,
    });
  }

  return (
    <>
      <Modal
        destroyOnClose
        title="新增用户"
        visible={modalVisible}
        onCancel={onCancel}
        onOk={okChange}
        okText="确定"
        cancelText="取消"
      >
        <Tabs type="card" onChange={callBack}>
          <TabPane tab="单个添加" key="1">
            <Form
              {...layout}
              name="add"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              hideRequiredMark //去除前面红色*号
              autoComplete={'off'} //输入框输入记录
            >
              <Form.Item
                name="category"
                label="用户类别"
                rules={[{ required: true, message: '请选择用户类别' }]}
              >
                <Radio.Group>
                  {userType.map((item:any) => (
                    <Radio value={item.id} key={item.id}>
                      {item.type}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                name="personId"
                label="学号/工号"
                rules={[{ required: true, message: '请输入学号/工号' }]}
              >
                <Input placeholder="请输入学号/工号" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: '请选择性别' }]}
              >
                <Radio.Group>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="idcard"
                label="身份证号"
                rules={[
                  { required: true, message: '请输入身份证号' },
                  {
                    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
                    message: '身份证号码格式错误',
                  },
                ]}
              >
                <Input placeholder="请输入身份证号" />
              </Form.Item>
              <Form.Item
                name="college"
                label="学院/单位"
                rules={[{ required: true, message: '请输入学院/单位' }]}
              >
                <Input placeholder="请输入学院/单位" />
              </Form.Item>
              <Form.Item
                name="class"
                label="班级"
                rules={[{ required: true, message: '请输入班级' }]}
              >
                <Select
                  showSearch
                  placeholder="请输入班级"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {classData.map((item: any) => (
                    <Option value={item.id} key={item.id}>
                      {item.className}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[
                  { required: true, message: '请输入手机号' },
                  {
                    pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
                    message: '手机号码格式错误',
                  },
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item style={{ display: 'none' }}>
                <Button type="primary" htmlType="submit" id="add-submit-1" />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="批量导入" key="2">
            <Form
              {...layout}
              name="add-upload"
              initialValues={{ remember: true }}
              onFinish={onFinishSingle}
              hideRequiredMark //去除前面红色*号
              autoComplete={'off'} //输入框输入记录
            >
              <Form.Item
                name="upload"
                label="上传"
                rules={[{ required: true, message: '请上传文件' }]}
              >
                <Upload showUploadList={false} fileList={[]} accept={'.xls,.xlsx'}>
                  <Button icon={<UploadOutlined />}>选择文件</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <a
                  style={{ verticalAlign: 'bottom', paddingLeft: '100px', fontSize: '14px' }}
                  onClick={downLoadFunc}
                >
                  下载模板
                </a>
              </Form.Item>

              <Form.Item style={{ display: 'none' }}>
                <Button type="primary" htmlType="submit" id="add-submit-2" />
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default connect(({ baseSetClass }: { baseSetClass: SetClassState }) => {
  return { classData: baseSetClass.classList };
})(AddModal);
