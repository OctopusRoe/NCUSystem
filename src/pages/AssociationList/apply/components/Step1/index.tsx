// 申请第1步组件
import React, { useState } from 'react';
import { Form, Button, Input, Select, Upload, Tooltip } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { GlobalModelState } from '@/models/global';

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
  selectValue: any;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data, selectValue } = props;
  const [form] = Form.useForm();
  const [uploadFileList] = useState([]);

  if (!data) {
    return null;
  }

  const { validateFields } = form;
  const onValidateForm = async () => {
    const values = await validateFields();
    console.log('val1', values);

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

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        autoComplete="off"
        initialValues={data}
      >
        <Form.Item
          label="社团中文全称"
          name="NameZh"
          rules={[{ required: true, message: '请输入社团全称' }]}
        >
          <Input placeholder="请输入社团全称" />
        </Form.Item>
        <Form.Item
          label="社团英文全称"
          name="NameEn"
          rules={[{ required: true, message: '请输入社团英文全称' }]}
        >
          <Input placeholder="请输入社团英文全称" />
        </Form.Item>
        <Form.Item
          label="社团类别"
          name="Category"
          rules={[{ required: true, message: '请选择社团类别' }]}
        >
          <Select placeholder="请选择社团类别" style={{ width: '50%' }}>
            {selectValue.type &&
              selectValue.type.map((item: any) => (
                <Option value={item.id} key={`communityCategory${item.id}`}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="社团级别"
          name="Level"
          rules={[{ required: true, message: '请选择社团级别' }]}
        >
          <Select style={{ width: '50%' }} placeholder="请选择社团级别">
            {selectValue.type &&
              selectValue.level.map((item: any) => (
                <Option value={item.id} key={`communityLevel${item.id}`}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="业务指导单位"
          name="OrganizationId"
          rules={[{ required: true, message: '请选择业务指导单位' }]}
        >
          <Select placeholder="请选择业务指导单位" style={{ width: '50%' }}>
            {selectValue.type &&
              selectValue.department.map((item: any) => (
                <Option value={item.id} key={`guideUnit${item.id}`}>
                  {item.name}
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
          name="Constitution"
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
          name="PersonNum"
          rules={[{ required: true, message: '请输入成员数量' }]}
        >
          <Input
            type="number"
            style={{ width: '100px' }}
            min={1}
            suffix={<div style={{ color: '#bfbfbf' }}>人</div>}
          />
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

export default connect(
  ({ formAndstepForm, global }: { formAndstepForm: StateType; global: GlobalModelState }) => ({
    data: formAndstepForm.step,
    selectValue: global.SelectValue,
  }),
)(Step1);
