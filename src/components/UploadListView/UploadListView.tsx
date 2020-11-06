// 上传列表 组件

import React, { useState } from 'react'

import { Upload, Image } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import { identity } from 'lodash';

interface UploadListViewProps {
  aspect?: number
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

// 上传图片组件
const upLoadButton = (
  <div>
    <PlusOutlined />
    <div>上传</div>
  </div>
)

const UploadListView: React.FC<UploadListViewProps> = (props) => {

  const { onChange } = props
  const [ imgUrl, setImgUrl ] = useState('')
  const [ fileList, setFileList ] = useState<any>([])
  const [ imageId, setImageId ] = useState<string>('')

  const deleteImage = () => {
  }

  // upload 的 onChange 事件
  const handleChange = async ({ file, fileList }:any) => {
    setFileList(fileList)
  }

  // when click preview button will doing
  const handPreview = async (file: any) => {

    // get base64 from photo
    const url: any = await getBase64(file.originFileObj)

    // set url to imgUrl
    setImgUrl(url)

    // set file.id to imageId
    setImageId(file.uid)

    // set a timer to use Image component preview
    setTimeout(()=>{
      document.getElementById(file.uid)?.click()
    }, 0.5 * 1000)
  }

  return (
    <>
      <ImgCrop aspect={props.aspect}>
        <Upload
          fileList={fileList}
          listType={"picture-card"}
          accept={"image/jpg, image/jpeg, image/png"}
          onChange={handleChange}
          onPreview={handPreview}
        >
          {fileList.length >= 3 ? null : upLoadButton}
        </Upload>
      </ImgCrop>
      <Image style={{display: 'none'}} id={imageId} src={imgUrl} />
    </>
  )
}

export default UploadListView