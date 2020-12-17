// 招新设置-设置modal 组件

import React, { useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, Space, Switch } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';

import CropImgview from '@/components/CropImgview';

import { connect, Dispatch } from 'umi'

import { RecruitmentSettingState } from '../data'

import moment from 'moment'

interface SettingModalProps {
  modalVisible: boolean;
  formValue: any
  onCancel: () => void;
  dispatch: Dispatch
}

const SettingModal: React.FC<SettingModalProps> = (props) => {

  const { modalVisible, formValue, dispatch, onCancel } = props;

  const [open, setOpen] = useState<boolean>(true)

  const button = useRef<HTMLFontElement>(null);

  const onFinish = (e: any) => {

    const data = {
      state: open ? 0 : -1,
      poster: e.img.originFileObj,
      slogan: e.slogan,
      endDate: e.time.format('YYYY-MM-DD hh:mm:ss'),
      qq: e.QQnumber
    }

    dispatch({
      type: 'recruitmentSetting/setFunc',
      payload: data
    })
    
    onCancel()
  };

  const onChange = (e: boolean) => {
    setOpen(e)
  }

  return (
    <Modal
      destroyOnClose
      title="设置"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
      okText="保存"
      cancelText="取消"
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        onFinish={onFinish}
        hideRequiredMark
        autoComplete={'off'}
        initialValues={{
          slogan: formValue.slogan,
          time: moment(formValue.endDate, 'YYYY-MM-DDThh:mm:ss'),
          QQnumber: formValue.qq
        }}
      >
        <FormItem
          name="img"
          label="招新海报"
          rules={[{ required: true, message: '请上传招新海报' }]}
        >
          <CropImgview id="posters" aspect={400 / 240} />
        </FormItem>
        <FormItem
          name="slogan"
          label="宣传语"
          rules={[{ required: true, message: '请输入宣传语' }]}
        >
          <TextArea showCount={true} maxLength={100} rows={3} />
        </FormItem>
        <FormItem
          name="time"
          label="截止时间"
          rules={[{ required: true, message: '请选择截止时间' }]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{format: 'HH'}}
            style={{ width: '100%' }}
          />
        </FormItem>
        <FormItem
          name="QQnumber"
          label="招新QQ群"
          rules={[{ required: true, message: '请输入招新QQ群' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="setting" label="设置">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={open} onChange={onChange} />
        </FormItem>
        <Form.Item style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit" id="add-submit" ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  ({recruitmentSetting}: {recruitmentSetting: RecruitmentSettingState}) => ({
    formValue: recruitmentSetting.setInfo
  })
)(SettingModal)
