// 申请第1步组件
import React, { useState } from 'react';
import { Form, Button, Input, Select, Upload, Tooltip } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step1Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const validateMessages = {
  // required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label}应为数字!',
  },
  number: {
    range: '${label} 必须在 ${min} 到 ${max}之间',
  },
};

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  const [uploadFileList] = useState([]);

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'formAndstepForm/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'formAndstepForm/saveCurrentStep',
        payload: 'second',
      });
    }
  };

  const typeValue = [
    '文化体育类',
    '学术科技类',
    '志愿公益类',
    '创新创业类',
    '思想政治类',
    '自律互助类',
    '其他类',
  ];

  const levelValue = ['一级社团', '二级社团', '三级社团'];

  const unitValue = ['指导部门1', '指导部门2', '指导部门3', '指导部门'];
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          label="社团中文全称"
          name="chineseName"
          rules={[{ required: true, message: '请输入社团全称' }]}
        >
          <Input placeholder="请输入社团全称" />
        </Form.Item>
        <Form.Item
          label="社团英文全称"
          name="englishName"
          rules={[{ required: true, message: '请输入社团英文全称' }]}
        >
          <Input placeholder="请输入社团英文全称" />
        </Form.Item>
        <Form.Item
          label="社团类别"
          name="communityCategory"
          rules={[{ required: true, message: '请选择社团类别' }]}
        >
          <Select placeholder="请选择社团类别" style={{ width: '50%' }}>
            {typeValue.map((item: any, index: any) => (
              <Option value={item} key={`communityCategory${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="社团级别"
          name="communityLevel"
          rules={[{ required: true, message: '请选择社团级别' }]}
        >
          <Select placeholder="请选择社团级别" style={{ width: '50%' }}>
            {levelValue.map((item: any, index: any) => (
              <Option value={item} key={`communityLevel${index}`}>
                {item}
              </Option>
            ))}
            <Option value="1">一级社团</Option>
            <Option value="2">二级社团</Option>
            <Option value="3">三级社团</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="业务指导单位"
          name="guideUnit"
          rules={[{ required: true, message: '请选择业务指导单位' }]}
        >
          <Select placeholder="请选择业务指导单位" style={{ width: '50%' }}>
            {unitValue.map((item: any, index: any) => (
              <Option value={item} key={`guideUnit${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span>
              社团章程
              <span style={{ color: '#00000073' }}>（草案）</span>
            </span>
          }
          name="communityAssociation"
          rules={[{ required: true, message: '请上传社团章程' }]}
        >
          <Upload showUploadList={false} fileList={uploadFileList}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label={
            <span>
              社团成员数
              <span style={{ color: '#00000073' }}>
                （最高）
                <Tooltip title="超过最高数后无法加入新成员">
                  <QuestionCircleOutlined style={{ marginRight: 4 }} />
                </Tooltip>
              </span>
            </span>
          }
          name="communityMembers"
          rules={[{ required: true, message: '请输入成员数量' }]}
        >
          <Input style={{ width: '100px' }} suffix={<div style={{ color: '#bfbfbf' }}>人</div>} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(({ formAndstepForm }: { formAndstepForm: StateType }) => ({
  data: formAndstepForm.step,
}))(Step1);
