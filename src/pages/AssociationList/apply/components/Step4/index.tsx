import React from 'react';
import { Form, Button, Divider, Input, Select, Upload } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import { PlusOutlined } from '@ant-design/icons';

import styles from './index.less'

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 19,
    },
};


interface Step2Props {
    data?: StateType['step'];
    dispatch?: Dispatch;
    submitting?: boolean;
}

const Step4: React.FC<Step2Props> = (props) => {
    const [form] = Form.useForm();
    const { data, dispatch, submitting } = props;
    if (!data) {
        return null;
    }
    const { validateFields, getFieldsValue } = form;
    const onPrev = () => {
        if (dispatch) {
            const values = getFieldsValue();
            dispatch({
                type: 'formAndstepForm/saveStepFormData',
                payload: {
                    ...data,
                    ...values,
                },
            });
            dispatch({
                type: 'formAndstepForm/saveCurrentStep',
                payload: 'third',
            });
        }
    };

    const onValidateForm = async () => {
        // const values = await validateFields();
        if (dispatch) {
            dispatch({
                type: 'formAndstepForm/saveStepFormData',
                // payload: values,
            });
            dispatch({
                type: 'formAndstepForm/saveCurrentStep',
                payload: 'fifth',
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
            >
                <Form.Item
                    label="指导老师姓名"
                    name="name"
                    rules={[{ required: true, message: '请输入指导老师姓名' }]}
                >
                    <Input placeholder="请输入指导老师姓名" />
                </Form.Item>              
                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[{ required: true, message: '请选择性别' }]}
                >
                    <Select placeholder="请选择性别">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="政治面貌"
                    name="politicsstatus"
                    rules={[{ required: true, message: '请输入政治面貌' }]}
                >
                    <Input placeholder="请输入政治面貌" />
                </Form.Item>
                <Form.Item
                    label="院系（部门）"
                    name="college"
                    rules={[{ required: true, message: '请输入院系' }]}
                >
                    <Input placeholder="请输入院系" />
                </Form.Item>
                <Form.Item
                    label="职称"
                    name="support"
                    rules={[{ required: true, message: '请输入职称' }]}
                >
                    <Input placeholder="请输入职称" />
                </Form.Item>
                <Form.Item
                    label="照片"
                    rules={[{ required: true, message: '请上传照片' }]}
                >
                    <Upload
                        name="photo"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>上传照片</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="联系方式"
                    name="phone"
                    rules={[{ required: true, message: '请输入联系方式' }]}
                >
                    <Input placeholder="请输入联系方式" />
                </Form.Item>
                <Form.Item
                    label="办公地点"
                    name="office"
                    rules={[{ required: true, message: '请输入办公地点' }]}
                >
                    <Input placeholder="请输入办公地点" />
                </Form.Item>
                <Form.Item
                    label="指导老师简介"
                    name="resume"
                    rules={[{ required: true, message: '请输入指导老师简介' }]}
                >
                    <Input.TextArea rows={3} />
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
                    <Button type="primary" onClick={onValidateForm} loading={submitting}>
                        提 交
                    </Button>
                    <Button onClick={onPrev} style={{ marginLeft: 8 }}>
                        上一步
                    </Button>
                </Form.Item>
            </Form>
            <Divider style={{ margin: '40px 0 24px' }} />
            <div className={styles.desc}>
                <h3>说明</h3>
                <h4>转账到支付宝账户</h4>
                <p>
                    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
       </p>
                <h4>转账到银行卡</h4>
                <p>
                    如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
       </p>
            </div>
        </>

    );
};
export default connect(
    ({
        formAndstepForm,
        loading,
    }: {
        formAndstepForm: StateType;
        loading: {
            effects: { [key: string]: boolean };
        };
    }) => ({
        submitting: loading.effects['formAndstepForm/submitStepForm'],
        data: formAndstepForm.step,
    }),
)(Step4);
