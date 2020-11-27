// 下载的 modal

import React, { useRef } from 'react'

import { Form, Button, Upload, Modal } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

interface DownLoadModalProps {
  modalVisible: boolean
  onCancel: () => void
  downLoadFunc: () => void
  upLoadFunc: (e: any) => void
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 }
}

const DownLoadModal: React.FC<DownLoadModalProps> = (props) => {

  const { modalVisible, onCancel, downLoadFunc, upLoadFunc } = props

  const button = useRef<HTMLButtonElement>(null)

  const onFinish = (e: any) => {
    upLoadFunc(e)
  }

  return (
    <Modal
      destroyOnClose
      title={'数据导入'}
      visible={modalVisible}
      onCancel={onCancel}
      onOk={() => button.current?.click()}
      okText={'确定'}
      cancelText={'取消'}
    >
      <Form
        {...layout}
        name={'upLoad'}
        onFinish={onFinish}
        hideRequiredMark
      >
        <Form.Item
          name={'file'}
          label={'上传'}
          rules={[
            {
              required: true,
              message: '请上传文件'
            }
          ]}
        >
          <Upload
            showUploadList={false}
            fileList={[]}
            accept={'.xls, .xlsx'}
          >
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type={'link'}
            style={{ verticalAlign: 'bottom', paddingLeft: '100px', fontSize: '14px' }}
            onClick={() => downLoadFunc()}
          >
            下载模板
          </Button>
        </Form.Item>
        <Form.Item style={{ display: 'none' }}>
          <Button htmlType={'submit'} ref={button} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DownLoadModal
