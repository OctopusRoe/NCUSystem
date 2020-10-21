// 带裁剪功能的图片上传预览组件

// 使用 antd-img-crop 包对 antd 的 Image 组件进行2次封装

import React, { useState } from 'react'

import ImgCrop from 'antd-img-crop';
import { Upload, Image, Space } from 'antd';
import { PlusOutlined,EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './styles.less'

export interface ShowImageProps {
  id: string
  src: string
  onDelete: () => void
}

export interface CorpImgViewProps {
  id: string
  onChange?: (file: Blob) => void
  onPreview?: () => void
}

// 得到 base64
const getBase64 = (img: any) => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = () => res(reader.result)
    reader.onerror = error => rej(error)
  })
}

// 预览组件
const ShowImage: React.FC<ShowImageProps> = (props) => {
  const { id } = props

  const preview = () => {
    document.getElementById(id)?.click()
  }

  const deleteImage = () => {
    props.onDelete()
  }

  return (
    <div className={styles['upload-view-box']}>
      <div className={styles['upload-view-box-box']}>
        <Space size={15} className={styles['upload-view-icon-box']}>
          <a title={"预览图片"} onClick={preview} >
            <EyeOutlined size={12} />
          </a>
          <a title={"删除图片"} >
            <DeleteOutlined size={12} onClick={deleteImage} />
          </a>
        </Space>
        <Image
          className={styles['upload-view-image-box']}
          src={props.src}
          id={id}
        />
      </div>
    </div>
  )
}

// 带裁剪功能的上传组件
const CorpImgView: React.FC<CorpImgViewProps> = (props) => {

  const upLoadButton = (
    <div>
      <PlusOutlined />
      <div>上传</div>
    </div>
  )

  const { onChange } = props
  const[ imgUrl, setImgUrl ] = useState('')
  const [ showImg, setShowImg ] = useState(false)

  const handleChange = async ({file, fileList}: any) => {
    const url: any = await getBase64(file.originFileObj)
    setImgUrl(url)
    setShowImg(true)
    if (onChange) {
      onChange(file)
    }
  }

  const deleteImage = () => {
    setShowImg(false)
  }

  return (
    <>
      <div style={{display: showImg ? 'none' : 'block'}}>
        <ImgCrop>
          <Upload
            listType={'picture-card'}
            accept={'image/jpg, image/jpeg, image/png'}
            showUploadList={false}
            onChange={handleChange}
          >
            {upLoadButton}
          </Upload>
        </ImgCrop>
      </div>
      <div style={{display: showImg ? 'block' : 'none'}}>
        <ShowImage src={imgUrl} id={props.id} onDelete={deleteImage} />
      </div>
    </>
  )
}

export default CorpImgView
