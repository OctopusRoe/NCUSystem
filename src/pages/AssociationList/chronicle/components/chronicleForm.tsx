// 时间轴的抽屉表单 组件

import React, { useState } from 'react';

import { Form, Input, Button, DatePicker, Drawer, Space, Upload, Image } from 'antd';

import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';

interface ChronicleFormProps {
  visible: boolean;
  onClose: () => void;
}

const FormItem = Form.Item;
const { TextArea } = Input;

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

// 上传图片组件
const upLoadButton = (
  <div>
    <PlusOutlined />
    <div>上传</div>
  </div>
);

// 得到 base64
const getBase64 = (img: any) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });
};

const ChronicleForm: React.FC<ChronicleFormProps> = (props) => {
  const { visible, onClose } = props;

  const [imgUrl, setImgUrl] = useState('');
  const [fileList, setFileList] = useState<any>([]);
  const [ImageId, setImageId] = useState<string>('');

  // form value call back
  const onFinish = (e: any) => {
    console.log(e);
    console.log(fileList);
  };

  // upload 的 onChange 事件
  const handleChange = async ({ file, fileList }: any) => {
    setFileList(fileList);
  };

  // when click preview button will doing
  const handPreview = async (file: any) => {
    // get base64 from photo
    const url: any = await getBase64(file.originFileObj);

    // set url to imgUrl
    setImgUrl(url);

    // set file.id to imageId
    setImageId(file.uid);

    // set a timer to use Image component preview
    setTimeout(() => {
      document.getElementById(file.uid)?.click();
    }, 0.5 * 1000);
  };

  return (
    <Drawer
      title={'发布大事记'}
      visible={visible}
      onClose={onClose}
      width={800}
      bodyStyle={{ paddingBottom: '0px' }}
      footer={
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '25px',
          }}
        >
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button
              onClick={() => document.getElementById('create-active-form-button')?.click()}
              type={'primary'}
            >
              提交
            </Button>
          </Space>
        </div>
      }
    >
      <Image style={{ display: 'none' }} id={ImageId} src={imgUrl} />
      <Form autoComplete={'off'} hideRequiredMark onFinish={onFinish}>
        <FormItem
          {...formItemLayout}
          name={'title'}
          label={'标题'}
          rules={[
            {
              required: true,
              message: '请输入标题!',
            },
          ]}
        >
          <Input placeholder={'请输入标题'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'time'}
          label={'时间'}
          rules={[
            {
              required: true,
              message: '请选择时间!',
            },
          ]}
        >
          <DatePicker showTime style={{ width: '100%' }} format={'YYYY-MM-DD HH:mm:ss'} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          name={'content'}
          label={'内容'}
          rules={[
            {
              required: true,
              message: '请输入内容!',
            },
          ]}
        >
          <TextArea rows={10} maxLength={500} placeholder={'请输入内容'} />
        </FormItem>
        <FormItem {...formItemLayout} name={'photo'} label={'上传图片'}>
          <ImgCrop aspect={100 / 75}>
            <Upload
              fileList={fileList}
              listType={'picture-card'}
              accept={'image/jpg, image/jpeg, image/png'}
              onChange={handleChange}
              onPreview={handPreview}
            >
              {fileList.length >= 3 ? null : upLoadButton}
            </Upload>
          </ImgCrop>
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          <Button id={'create-active-form-button'} htmlType={'submit'} />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default ChronicleForm;
