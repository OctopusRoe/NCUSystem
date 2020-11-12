import React, { useState, useRef, ButtonHTMLAttributes } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import UploadView from './uploadView'

interface AddFormProps {
  addVisible: boolean;
  onCancel: () => void;
  onBlur: (e: string) => void
  formValue: {name: string, sex: string, college: string, class: string}
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
  },
};

const FormItem = Form.Item

const AddForm: React.FC<AddFormProps> = (props) => {
  
  const { addVisible, formValue, onBlur, onCancel } = props;

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    console.log(formValue)
  }

  return (
      <Modal
        destroyOnClose
        title="新增成员"
        visible={addVisible}
        onCancel={() => onCancel()}
        onOk={() => button.current?.click()}
      >
        <Form
          onFinish={onFinish}
          autoComplete={'off'}
          hideRequiredMark
        >
          <FormItem
            {...formItemLayout}
            name={'studentID'}
            label={'学号'}
            rules={[
              {
                required: true,
                message: '请输入学号!'
              }
            ]}
          >
            <Input placeholder={'请输入学号'} onBlur={(e) => onBlur(e.target.value)} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={'name'}
            label={'姓名'}
          >
            <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
              <div style={{padding: '4px 11px'}}>
                {formValue.name ? formValue.name : null}
              </div>
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={'sex'}
            label={'性别'}
          >
            <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
              <div style={{padding: '4px 11px'}}>
                {formValue.sex ? formValue.sex : null}
              </div>
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={'college'}
            label={'学院'}
          >
            <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
              <div style={{padding: '4px 11px'}}>
                {formValue.college ? formValue.college : null}
              </div>
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            name={'class'}
            label={'班级'}
          >
            <div style={{backgroundColor: '#f5f5f5', color: 'rgba(0,0,0,0.25)', width: '100%', marginRight: '8px', height: '32px', border: '1px solid #d9d9d9'}}>
              <div style={{padding: '4px 11px'}}>
                {formValue.class ? formValue.class : null}
              </div>
            </div>
          </FormItem>
          <FormItem style={{display: 'none'}}>
            <Button htmlType={'submit'} ref={button} />
          </FormItem>
        </Form>
      </Modal>
  );
};

export default AddForm;
